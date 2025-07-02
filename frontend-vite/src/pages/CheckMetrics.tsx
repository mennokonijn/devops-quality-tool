import React, { useState } from "react";
import '../styles/CheckMetrics.scss';
import MetricTable from "../components/MetricTable.tsx";
import axios from "axios";

const stages = ['Plan', 'Code', 'Build', 'Test', 'Deploy/Release', 'Operate', 'Monitor'];

const metricData: Record<string, { name: string; value: string }[]> = {
    Plan: [
        { name: 'Requirements Volatility', value: 'JIRA API' },
        { name: 'Requirements Completeness', value: 'Stakeholder survey' },
    ],
    Code: [
        { name: 'Cyclomatic Complexity', value: 'SonarQube' },
        { name: 'Cognitive Complexity', value: 'SonarQube' },
        { name: 'Code Smells', value: 'SonarQube' },
        { name: 'Duplicated Lines Density', value: 'SonarQube' },
        { name: 'CVE identifiers and CVSS scores', value: 'Trivy' },
        { name: 'Programming Language Impact', value: 'GitHub Linguist, Marco Couto benchmark' },
    ],
    Build: [
        { name: 'Unused Libraries', value: 'Depcheck/Vulture/Maven Analyzer' },
    ],
    Test: [
        { name: 'Total Coverage', value: 'SonarQube' },
        { name: 'Test Success Density', value: 'SonarQube' },
    ],
    'Deploy/Release': [
        { name: 'Change Failure Rate (CFR)', value: 'GitHub Actions' },
        { name: 'Secret Detection', value: 'SonarQube' },
        { name: 'Mean Time to Restore (MTTR)', value: 'GitHub REST API' },
    ],
    Operate: [
        { name: 'Customer Satisfaction', value: 'Survey' },
    ],
    Monitor: [
        { name: 'Defect Density', value: 'JIRA (Bug-labeled issues)' },
    ],
};

const CheckMetrics: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Planning');
    const [repo, setRepo] = useState('mennokonijn/unit-test-examples');
    const [measuredMetrics, setMeasuredMetrics] = useState<Record<string, { name: string; value: string }[]>>(metricData);
    const [notFetched, setNotFetched] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:4000/api/extract-results', {
                params: { repo },
            });

            const responseData: Record<string, { name: string; value: string }[]>[] = response.data
            setMeasuredMetrics(responseData[responseData.length - 1]);
            setNotFetched(false);
            setActiveTab('Plan');
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    return (
        <div className={'check-metrics'}>
            <h1 className="title-text">Overview of Metrics</h1>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className={'input-question'}>Your GitHub repository url</h2>
                <input
                    type="text"
                    className={'input-field'}
                    placeholder="Enter GitHub Repository URL"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                />
                <button className={'get-metrics-button'} type={"submit"}>
                    Get Metrics
                </button>
            </form>
            {notFetched ? (
                <div className="loading-message">
                    <p>Click "Get Metrics" to fetch the latest metrics from your repository.</p>
                </div>
            ) : (
                <>
                    <div className="tabs">
                        {stages.map(stage => (
                            <button
                                key={stage}
                                className={'tabs-button ' + (activeTab === stage ? 'active' : '')}
                                onClick={() => setActiveTab(stage)}
                            >
                                {stage}
                            </button>
                        ))}
                    </div>
                    <div className="tab-content">
                        <h2 className={'tab-content-title'}>{activeTab} Metrics</h2>
                        <MetricTable metrics={measuredMetrics[activeTab] || []}/>
                    </div>
                </>
            )}
        </div>
)
}

export default CheckMetrics;
