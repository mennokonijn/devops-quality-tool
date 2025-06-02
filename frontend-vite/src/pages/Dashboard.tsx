import React, { useState } from 'react';
import '../styles/Dashboard.scss';

const stages = ['Planning', 'Coding', 'Testing', 'Deploying', 'Maintaining'];

const stageMetrics: { [key: string]: string[] } = {
    Planning: ['Requirements Volatility', 'Requirements Completeness'],
    Coding: ['Cyclomatic Complexity', 'Cognitive Complexity', 'Code Smells', 'Duplicated Lines Density', 'Programming Language Impact'],
    Testing: ['Condition Coverage', 'Line Coverage', 'Total Coverage', 'Test Success Density'],
    Deploying: ['Change Failure Rate', 'Mean Time to Recover'],
    Maintaining: ['Defect Density', 'Customer Satisfaction', 'Unused Libraries', 'Runtime Performance']
};

const Dashboard: React.FC = () => {
    const [repo, setRepo] = useState('');
    const [activeTab, setActiveTab] = useState('Planning');

    return (
        <div className="dashboard-container">
            <div className="repo-input">
                <h1>DevOps Quality Tool</h1>
                <input
                    type="text"
                    placeholder="Enter GitHub Repository URL"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                />
            </div>

            <div className="tabs">
                {stages.map(stage => (
                    <button
                        key={stage}
                        className={activeTab === stage ? 'active' : ''}
                        onClick={() => setActiveTab(stage)}
                    >
                        {stage}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                <h2>{activeTab} Metrics</h2>
                <ul>
                    {stageMetrics[activeTab].map(metric => (
                        <li key={metric}>{metric}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
