import React, {useState} from 'react';
import '../styles/Dashboard.scss';
import axios from "axios";
import WorkflowInstructions from "../components/WorkflowInstructions.tsx";
import {Info} from 'lucide-react';
import SonarInstructions from "../components/SonarInstructions.tsx";
import JiraInstructions from "../components/JiraInstructions.tsx";
import {SONARQUBE_METRIC_OPTIONS, TOOL_OPTIONS} from "../utils/tools-metrics.ts";

const Dashboard: React.FC = () => {
    const [repo, setRepo] = useState('https://github.com/mennokonijn/unit-test-examples');
    const [branch, setBranch] = useState('master');
    const [port, setPort] = useState('8080');
    const [deploymentName, setDeploymentName] = useState('Simulate Deployment History');
    const [securityIncidentLabel, setSecurityIncidentLabel] = useState('security-incident');
    const [jiraEmail, setJiraEmail] = useState('mennokonijn@gmail.com');
    const [jiraBoardId, setJiraBoardId] = useState('1');
    const [jiraUrl, setJiraUrl] = useState('https://mennokonijn.atlassian.net');
    const [completionLabel, setCompletionLabel] = useState('Gereed');
    const [selectedSonarMetrics, setSelectedSonarMetrics] = useState<string[]>(['functions', 'ncloc']);
    const [nodeVersion, setNodeVersion] = useState('18');
    const [startCommand, setStartCommand] = useState('npm run start');
    const [directory, setDirectory] = useState('');
    const [tools, setTools] = useState<string[]>([]);
    const [yaml, setYaml] = useState('');
    const [showWorkflowInstructions, setShowWorkflowInstructions] = useState(false);
    const [showSonarInstructions, setShowSonarInstructions] = useState(false);
    const [showJiraInstructions, setShowJiraInstructions] = useState(false);
    const [sonarError, setSonarError] = useState(false);

    const handleToolToggle = (tool: string) => {
        setTools(prev => {
            const updated = prev.includes(tool)
                ? prev.filter(t => t !== tool)
                : [...prev, tool];

            return TOOL_OPTIONS
                .map(option => option.toolName)
                .filter(name => updated.includes(name));
        });
    };

    const handleSonarMetricToggle = (metric: string) => {
        setSelectedSonarMetrics(prev =>
            prev.includes(metric)
                ? prev.filter(m => m !== metric)
                : [...prev, metric]
        );
    };

    const isJiraToolSelected = tools.some(t => t.startsWith('Jira'));
    const isSonarQubeSelected = tools.includes('SonarQube');
    const isDeploymentToolSelected = ['Deployment-Frequency', 'Deployment-Time', 'MTTR'].some(tool => tools.includes(tool));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSonarQubeSelected && selectedSonarMetrics.length === 0) {
            setSonarError(true);
            return;
        }

        setSonarError(false);

        const res = await axios.post('http://localhost:4000/api/generate-yaml', {
            tools,
            repo,
            branch,
            directory,
            deploymentName,
            nodeVersion,
            port,
            startCommand,
            securityIncidentLabel,
            completionLabel,
            jiraEmail,
            jiraBoardId,
            jiraUrl,
            sonarQubeMetrics: selectedSonarMetrics.join(','),
        });
        setYaml(res.data.yaml);
    };

    if (showWorkflowInstructions) {
        return (
            <div className="dashboard-container">
                <div className="top-bar">
                    <button className="back-button" onClick={() => setShowWorkflowInstructions(false)}>← Back</button>
                </div>
                <WorkflowInstructions repo={repo} />
            </div>
        );
    }

    if (showSonarInstructions) {
        return (
            <div className="dashboard-container">
                <div className="top-bar">
                    <button className="back-button" onClick={() => setShowSonarInstructions(false)}>← Back</button>
                </div>
                <SonarInstructions repo={repo} />
            </div>
        );
    }

    if (showJiraInstructions) {
        return (
            <div className="dashboard-container">
                <div className="top-bar">
                    <button className="back-button" onClick={() => setShowJiraInstructions(false)}>← Back</button>
                </div>
                <JiraInstructions repo={repo} />
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <form className="repo-input" onSubmit={handleSubmit}>
                <div className="title-bar">
                    <button className="back-button" onClick={() => setShowWorkflowInstructions(false)} style={{display: showWorkflowInstructions ? 'inline' : 'none'}}>
                        ← Back
                    </button>
                    <h1 className="title-text">DevOps Quality Tool</h1>
                </div>

                <div className="section-block">
                    <h2 className="input-question">Tool Selection</h2>
                        <h2 className={'input-question'}>Select tools to include in your pipeline</h2>
                        <div className="tool-checkboxes">
                            {TOOL_OPTIONS.map(({toolName, displayName, info}) => (
                                <div key={toolName} className="tool-selection-wrapper">
                                    <div
                                        className={`tool-option ${tools.includes(toolName) ? 'selected' : ''}`}
                                        onClick={() => handleToolToggle(toolName)}
                                    >
                                        {displayName}
                                        {tools.includes(toolName) && <span className="checkmark">✔</span>}
                                    </div>
                                    <div className="info-tooltip">
                                        <Info size={18}/>
                                        <span className="tooltip-text">{info}</span>
                                    </div>

                                </div>
                            ))}
                        </div>
                </div>

                <div className="section-block">
                    <div className="instructions-container">
                        <h2 className="input-question">Project Settings</h2>
                        <button
                            className="instructions-button"
                            type="button"
                            onClick={() => setShowWorkflowInstructions(true)}
                        >
                            <Info size={16} style={{ marginRight: '6px' }} />
                            Workflow Instructions
                        </button>
                    </div>
                    <h3 className={'input-question'}>GitHub repository URL</h3>
                    <input required className="input-field" value={repo} onChange={e => setRepo(e.target.value)} placeholder="Enter GitHub URL"/>

                    <h3 className={'input-question'}>Branch name that needs to be tested</h3>
                    <input required className="input-field" value={branch} onChange={e => setBranch(e.target.value)} placeholder="default: main"/>

                    <h3 className={'input-question'}>Location of packages (leave empty if root)</h3>
                    <input className="input-field" value={directory} onChange={e => setDirectory(e.target.value)} placeholder="Directory path"/>

                    <h3 className={'input-question'}>Local port</h3>
                    <input required className="input-field" value={port} onChange={e => setPort(e.target.value)} placeholder="default: 8080"/>

                    <h3 className={'input-question'}>Start command</h3>
                    <input required className="input-field" value={startCommand} onChange={e => setStartCommand(e.target.value)} placeholder="npm run start"/>

                    <h3 className={'input-question'}>Node.js version</h3>
                    <input required className="input-field" value={nodeVersion} onChange={e => setNodeVersion(e.target.value)} placeholder="e.g. 18"/>
                </div>

                {isDeploymentToolSelected && (
                    <div className="section-block">
                        <h2 className="input-question">Deployment Settings</h2>
                        <h2 className={'input-question'}>GitHub Actions deployment workflow name</h2>
                        <input required={['Deployment-Frequency', 'Deployment-Time', 'MTTR'].some(tool => tools.includes(tool))} className="input-field" value={deploymentName} onChange={e => setDeploymentName(e.target.value)} placeholder="default: Simulate Deployment History"/>
                    </div>
                )}

                {isJiraToolSelected && (
                    <div className="section-block">
                        <div className="instructions-container">
                            <h2 className="input-question">Jira Settings</h2>
                            <button
                                className="instructions-button"
                                type="button"
                                onClick={() => setShowJiraInstructions(true)}
                            >
                                <Info size={16} style={{marginRight: '6px'}}/>
                                Jira Instructions
                            </button>
                        </div>
                        <h2 className={'input-question'}>Jira Email</h2>
                        <input required className="input-field" type="email" value={jiraEmail} onChange={e => setJiraEmail(e.target.value)}/>

                        <h2 className={'input-question'}>Jira Board ID</h2>
                        <input required className="input-field" value={jiraBoardId} onChange={e => setJiraBoardId(e.target.value)}/>

                        <h2 className={'input-question'}>Jira Workspace URL</h2>
                        <input required className="input-field" type="url" value={jiraUrl} onChange={e => setJiraUrl(e.target.value)}/>

                        <h2 className={'input-question'}>Security Incident Label (used in Jira)</h2>
                        <input required={['Jira-Security-Incidents'].some(tool => tools.includes(tool))} className="input-field" value={securityIncidentLabel} onChange={e => setSecurityIncidentLabel(e.target.value)}/>

                        <h2 className={'input-question'}>Completion Section Text used in Jira issues</h2>
                        <input required={['Jira-SprintPoints'].some(tool => tools.includes(tool))} className="input-field" value={completionLabel} onChange={e => setCompletionLabel(e.target.value)}/>
                    </div>
                )}

                {isSonarQubeSelected && (
                    <div className="section-block">
                        <div className="instructions-container">
                            <h2 className="input-question">SonarQube Metrics</h2>
                            <button
                                className="instructions-button"
                                type="button"
                                onClick={() => setShowSonarInstructions(true)}
                            >
                                <Info size={16} style={{marginRight: '6px'}}/>
                                    SonarQube Instructions
                                </button>
                            </div>

                            <h2 className={'input-question'}>Select SonarQube Metrics</h2>
                            <div className="tool-checkboxes">
                                {SONARQUBE_METRIC_OPTIONS.map(({metric, label, info}) => (
                                    <div key={metric} className="tool-selection-wrapper">
                                        <div
                                            className={`tool-option ${selectedSonarMetrics.includes(metric) ? 'selected' : ''}`}
                                            onClick={() => handleSonarMetricToggle(metric)}
                                        >
                                            {label}
                                            {selectedSonarMetrics.includes(metric) &&
                                                <span className="checkmark">✔</span>}
                                        </div>
                                        <div className="info-tooltip">
                                            <Info size={18}/>
                                            <span className="tooltip-text">{info}</span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                            {sonarError && (
                                <p className="error-message">Please select at least one SonarQube metric.</p>
                            )}
                        </div>
                    )}

                <button className="repo-input-analyze" type="submit">Generate workflow</button>
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
