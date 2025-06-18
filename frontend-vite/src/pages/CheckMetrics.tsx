import React, {useState} from "react";
import '../styles/CheckMetrics.scss';

const stages = ['Plan', 'Code', 'Build', 'Test', 'Deploy/Release', 'Operate', 'Monitor'];


const CheckMetrics: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Planning');
    const [repo, setRepo] = useState('https://github.com/mennokonijn/unit-test-examples');

    return (
        <div className={'check-metrics'}>
            <h1 className="title-text">Overview of Metrics</h1>
            <h2 className={'input-question'}>Your GitHub repository url</h2>
            <input
                type="text"
                className={'input-field'}
                placeholder="Enter GitHub Repository URL"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
            />
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
            </div>
        </div>
    )
}

export default CheckMetrics;
