import React from 'react';
import '../styles/Workflow.scss';

interface WorkflowInstructionsProps {
    repo: string;
}

const WorkflowInstructions: React.FC<WorkflowInstructionsProps> = () => {
    return (
        <div className="workflow-instructions">
            <h2>📄 How to Add the GitHub Actions Workflow</h2>

            <ol>
                <li>
                    <strong>Create a folder (if it doesn’t exist):</strong><br/>
                    <code>.github/workflows</code>
                </li>

                <li>
                    <strong>Add a new file:</strong><br/>
                    Create <code>quality.yml</code> inside <code>.github/workflows</code>
                </li>

                <li>
                    <strong>Paste the generated YAML</strong> into that file.<br/>
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
            </ol>

            <p className="success-msg">
                ✅ Your workflow will now run on every push and report back to your dashboard.
            </p>
        </div>
    );
};

export default WorkflowInstructions;
