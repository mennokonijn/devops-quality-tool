import React from 'react';
import '../styles/Workflow.scss';

interface WorkflowInstructionsProps {
    repo: string;
}

const WorkflowInstructions: React.FC<WorkflowInstructionsProps> = ({ repo }) => {
    return (
        <div className="workflow-instructions">
            <h2>📄 How to Add the GitHub Actions Workflow</h2>

            <ol>
                <li>
                    <strong>Open your repository:</strong><br />
                    Navigate to: <code>https://github.com/{repo}</code>
                </li>

                <li>
                    <strong>Create a folder (if it doesn’t exist):</strong><br />
                    <code>.github/workflows</code>
                </li>

                <li>
                    <strong>Add a new file:</strong><br />
                    Create <code>quality.yml</code> inside <code>.github/workflows</code>
                </li>

                <li>
                    <strong>Paste the generated YAML</strong> into that file.<br />
                    You can use the “Copy” or “Download” button above.
                </li>

                <li>
                    <strong>Commit the changes:</strong><br />
                    <pre>
git add .github/workflows/quality.yml{'\n'}
                        git commit -m "Add DevOps quality workflow"{'\n'}
                        git push
                    </pre>
                </li>

                <li>
                    <strong>Watch the workflow run:</strong><br />
                    Go to the “Actions” tab in your GitHub repo to view the pipeline.
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
                    </ul>
                </li>
            </ol>

            <h3>🚀 First Time Using SonarCloud?</h3>
            <ol>
                <li>
                    Go to <a href="https://sonarcloud.io" target="_blank" rel="noopener noreferrer">sonarcloud.io</a> and sign in with your GitHub account.
                </li>
                <li>Click <strong>+</strong> → <strong>Analyze new project</strong>.</li>
                <li>Select your GitHub repository and follow the configuration steps.</li>
                <li>
                    Generate a token via: <code>Account → Generate token</code>. Copy this as your <code>SONAR_TOKEN</code>.
                </li>
                <li>
                    Optionally, create a <code>sonar-project.properties</code> file with:
                    <pre>
sonar.projectKey=your_project_key
sonar.organization=your_organization
sonar.host.url=https://sonarcloud.io
sonar.sources=.
                    </pre>
                </li>
                <li>
                    🔧 <strong>Disable Automatic Analysis</strong> (required for CI):<br />
                    Go to:<br />
                    <code>SonarCloud → Your Project → Project Settings → General Settings → Analysis Method</code><br />
                    and switch to <strong>"CI-based analysis only"</strong>.
                </li>
            </ol>

            <p className="success-msg">
                ✅ Your workflow will now run on every push and report back to your dashboard.
            </p>
        </div>
    );
};

export default WorkflowInstructions;
