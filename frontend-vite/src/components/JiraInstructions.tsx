import React from 'react';
import '../styles/Workflow.scss';

interface JiraInstructionsProps {
    repo: string;
}

const JiraInstructions: React.FC<JiraInstructionsProps> = ({ repo }) => {
    return (
        <div className="workflow-instructions">
            <h1>You must use JIRA in order to use the metrics</h1>
            <h2>How to Connect Jira to Your GitHub Repository</h2>
            <ol>
                <li>
                    <strong>Generate a Jira API Token:</strong><br />
                    Visit:{" "}
                    <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" rel="noopener noreferrer">
                        Jira API Token Page
                    </a>
                    <ul>
                        <li>Click <strong>Create API token</strong></li>
                        <li>Give it a name (e.g., <code>GitHub Actions</code>)</li>
                        <li>Click <strong>Create</strong>, then <strong>Copy</strong> the token</li>
                    </ul>
                </li>

                <li>
                    <strong>Add Required GitHub Secrets:</strong>
                    <ul>
                        <li>
                            Navigate to <code>Settings → Secrets and variables → Actions → New repository secret</code> in your GitHub repo:
                            <br />
                            <code>https://github.com/{repo}/settings/secrets/actions</code>
                        </li>
                        <li>
                            Add a secret named <code>JIRA_TOKEN</code> and paste your Jira API token
                        </li>
                        <li>
                            add:
                            <ul>
                                <li>Your Jira login email</li>
                                <li>Your Jira cloud workspace URL (e.g., <code>https://yourworkspace.atlassian.net</code>)</li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li>
                    <strong>Find your Board ID (for Scrum/Kanban boards):</strong><br />
                    Open your board in Jira → Check the URL: <br />
                    <code>https://yourworkspace.atlassian.net/jira/software/c/projects/XYZ/boards/<strong>123</strong></code> → The last number is your Board ID.
                </li>

                <li>
                    <strong>Use Jira Labels:</strong>
                    <ul>
                        <li>
                            For <strong>Security Incidents</strong>, ensure issues are labeled consistently with your selected label (e.g., <code>security-incident</code>)
                        </li>
                        <li>
                            For <strong>Sprint Points</strong>, ensure a completion section exists in your Jira issue template with the keyword (e.g., <code>Gereed</code>)
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default JiraInstructions;
