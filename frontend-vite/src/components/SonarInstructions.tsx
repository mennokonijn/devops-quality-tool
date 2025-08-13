import React from 'react';
import '../styles/Workflow.scss';

interface WorkflowInstructionsProps {
    repo: string;
}

const SonarInstructions: React.FC<WorkflowInstructionsProps> = ({ repo }) => {
    return (
        <div className="workflow-instructions">
            <h3>First Time Using SonarCloud?</h3>
            <ol>
                <li>
                    Go
                    to <a href="https://sonarcloud.io" target="_blank" rel="noopener noreferrer">sonarcloud.io</a> and
                    sign in with your GitHub account.
                </li>
                <li>Click <strong>+</strong> → <strong>Analyze new project</strong>.</li>
                <li>Select your GitHub repository and follow the configuration steps.</li>
                <li>
                    Generate a token via: <code>Account → Generate token</code>. Copy this as
                    your <code>SONAR_TOKEN</code>.
                </li>
            </ol>
            <h2>How to Add sonarqube to your github repository in order to use the metrics</h2>
            <ol>
                <li>
                    <strong>Open your repository:</strong><br/>
                    Navigate to: <code>https://github.com/{repo}</code>
                </li>

                <li>
                    <strong>Add required GitHub secrets:</strong>
                    <ul>
                        <li>
                            Navigate to <code>Settings → Secrets and variables → Actions → New repository secret</code>
                        </li>
                        <li>
                            Add a secret named <code>SONAR_TOKEN</code> with your SonarCloud token.
                        </li>
                        <li>
                            Set the following secrets in your repo (You can find this in the sonarcloud project
                            settings):
                            <pre>
                        {`
SONAR_PROJECT_KEY=your_project_key
SONAR_HOST_URL=https://sonarcloud.io
OR
https://sonarqube.mycompany.com
                        `}
                    </pre>
                        </li>
                        <li>
                            <strong>Disable Automatic Analysis</strong> (required for CI):<br/>
                            Go to:<br/>
                            <code>SonarCloud → Your Project → Project Settings → General Settings → Analysis
                                Method</code><br/>
                            and switch to <strong>"CI-based analysis only"</strong>.
                        </li>
                        <li>
                            Optionally, create a <code>sonar-project.properties</code> file with:
                            <pre>
                        {`
sonar.projectKey=your_project_key
sonar.organization=your_organization
sonar.host.url=https://sonarcloud.io
sonar.sources=.
                        `}
                    </pre>
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    );
};

export default SonarInstructions;
