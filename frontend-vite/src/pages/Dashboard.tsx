import React, {useEffect, useState} from 'react';
import '../styles/Dashboard.scss';
import MetricTable from "../components/Metric-table.tsx";

const stages = ['Planning', 'Coding', 'Testing', 'Deploying', 'Maintaining'];

const Dashboard: React.FC = () => {
    const [repo, setRepo] = useState('');
    const [submittedRepo, setSubmittedRepo] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('Planning');
    const [allMetrics, setAllMetrics] = useState<{ [key: string]: { name: string; value: string | number }[] }>({});

    useEffect(() => {
        if (!submittedRepo) return;

        fetch(`http://localhost:4000/api/metrics?repo=${encodeURIComponent(submittedRepo)}`)
            .then((res) => res.json())
            .then((data) => setAllMetrics(data.metrics || {}))
            .catch(() => setAllMetrics({}));
    }, [submittedRepo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmittedRepo(repo);
    };

    return (
        <div className="dashboard-container">
            <form className="repo-input" onSubmit={handleSubmit}>
                <div className="repo-input">
                    <h1>DevOps Quality Tool</h1>
                    <input
                        type="text"
                        className={'repo-input-field'}
                        placeholder="Enter GitHub Repository URL"
                        value={repo}
                        onChange={(e) => setRepo(e.target.value)}
                    />
                    <button className={'repo-input-analyze'} type="submit">Analyze</button>
                </div>
            </form>

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
                <MetricTable metrics={allMetrics[activeTab] || []}/>
            </div>
        </div>
);
};

export default Dashboard;
