import React, { useState } from 'react';
import '../styles/Dashboard.scss';
import axios from "axios";
import WorkflowInstructions from "../components/WorkflowInstructions.tsx";
import { Info } from 'lucide-react';

const TOOLS = ['GitLeaks', 'Jest', 'SonarQube', 'Trivy', 'Jira-SprintPoints'];

const Dashboard: React.FC = () => {
    const [repo, setRepo] = useState('https://github.com/mennokonijn/unit-test-examples');
    const [branch, setBranch] = useState('master');
    const [directory, setDirectory] = useState('');
    const [tools,_setTools] = useState<string[]>(TOOLS);
    const [yaml, setYaml] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/generate-yaml', {
            tools,
            repo,
            branch,
            directory
        });
        setYaml(res.data.yaml);
    };

    if (showInstructions) {
        return (
            <div className="dashboard-container">
                <div className="top-bar">
                    <button className="back-button" onClick={() => setShowInstructions(false)}>← Back</button>
                </div>
                <WorkflowInstructions repo={repo} />
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <form className="repo-input" onSubmit={handleSubmit}>
                <div className="repo-input">
                    <div className="title-bar">
                        <button className="back-button" onClick={() => setShowInstructions(false)} style={{display: showInstructions ? 'inline' : 'none'}}>
                            ← Back
                        </button>
                        <h1 className="title-text">DevOps Quality Tool</h1>
                        <div className="info-icon" onClick={() => setShowInstructions(true)} title="Workflow Instructions">
                            <Info size={20}/>
                        </div>
                    </div>

                    <h2 className={'input-question'}>Your GitHub repository url</h2>
                    <input
                        type="text"
                        className={'input-field'}
                        placeholder="Enter GitHub Repository URL"
                        value={repo}
                        onChange={(e) => setRepo(e.target.value)}
                    />
                    <h2 className={'input-question'}>Your main branch name</h2>
                    <input
                        type="text"
                        className={'input-field'}
                        placeholder="Enter branch name (default: main)"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                    />
                    <h2 className={'input-question'}>Location of your packages (Leave empty when this is the root directory)</h2>
                    <input
                        type="text"
                        className={'input-field'}
                        placeholder="Enter directory name"
                        value={directory}
                        onChange={(e) => setDirectory(e.target.value)}
                    />
                    <h2 className={'input-question'}>Language</h2>
                    <button className={'repo-input-analyze'} type="submit">
                        Generate
                    </button>
                </div>
            </form>

            {yaml && (
                <>
                    <h2>Generated GitHub Actions YAML</h2>
                    <a
                        href={`data:text/plain;charset=utf-8,${encodeURIComponent(yaml)}`}
                        download="quality.yml"
                    >
                        Download YAML
                    </a>
                </>
            )}
        </div>
    );
};

export default Dashboard;
