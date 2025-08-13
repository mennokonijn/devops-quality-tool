export const TOOL_OPTIONS = [
    { toolName: 'ZAP', displayName: 'Penetration Testing', info: 'OWASP ZAP scans the live application for security vulnerabilities.' },
    { toolName: 'Outdated-Packages', displayName: 'Outdated Packages', info: 'Detects and lists outdated libraries in your project.' },
    { toolName: 'Depcheck', displayName: 'Unused Libraries', info: 'Analyzes project dependencies to detect libraries declared but not used in the codebase.' },
    { toolName: 'GitLeaks', displayName: 'Secret Detection', info: 'Scans codebase to identify hardcoded secrets such as API keys, credentials, or tokens.' },
    { toolName: 'Jest', displayName: 'Test Success Density', info: 'Runs unit tests and measures the percentage of tests that pass across all executions. (TypeScript/JavaScript onlu)' },
    { toolName: 'SonarQube', displayName: 'SonarQube Metrics', info: 'Performs static code analysis to report on code quality, complexity, duplication, and smells. Which metrics you want can be selected later' },
    { toolName: 'Trivy', displayName: 'CVE Identifiers and CVSS Scores', info: 'Identifies known vulnerabilities in dependencies and reports their CVSS severity scores.' },
    { toolName: 'Trivy-Open', displayName: 'Open Source License Scan', info: 'Detects and lists open-source licenses of project dependencies to flag incompatible or risky usage.' },
    { toolName: 'Jira-SprintPoints', displayName: 'Estimated vs Completed Story Points (JIRA)', info: 'Evaluates the accuracy of sprint planning by comparing estimated versus completed story points.' },
    { toolName: 'Jira-Security-Epics', displayName: 'Security Requirements Coverage (JIRA)', info: 'Assesses how well security requirements are represented and completed in sprints by scanning for Epics with the security label.' },
    { toolName: 'Jira-Security-Incidents', displayName: 'Security Incident Reports (JIRA)', info: 'Counts reported and documented security incidents tracked in Jira.' },
    { toolName: 'Jira-Defect-Density', displayName: 'Defect Density (JIRA)', info: 'Calculates the number of reported defects relative to completed work items.' },
    { toolName: 'Language-Impact', displayName: 'Programming Language Environment Impact', info: 'Estimates the environmental (e.g., energy) impact of the programming language used.' },
    { toolName: 'Deployment-Frequency', displayName: 'Deployment Frequency', info: 'Measures how often code is successfully deployed to production over a given time frame.' },
    { toolName: 'Deployment-Time', displayName: 'Deployment Time', info: 'Calculates the time it takes for a commit to reach production, indicating release velocity.' },
    { toolName: 'MTTR', displayName: 'Mean Time to Recovery', info: 'Measures the average time it takes to recover from a failure in production.' }
];


export const SONARQUBE_METRIC_OPTIONS = [
    { metric: 'code_smells', label: 'Code Smells', info: 'Maintainability issues in the code that may indicate technical debt or poor design decisions.' },
    { metric: 'complexity', label: 'Cyclomatic Complexity', info: 'Quantifies the number of distinct paths through code, reflecting control flow complexity.' },
    { metric: 'cognitive_complexity', label: 'Cognitive Complexity', info: 'Represents the mental effort required to understand code structure and logic.' },
    { metric: 'duplicated_lines_density', label: 'Duplicated Lines', info: 'Percentage of lines that are duplicated elsewhere in the codebase, reducing maintainability.' },
    { metric: 'coverage', label: 'Test Coverage', info: 'Indicates the percentage of code lines that are executed during automated testing.' }
];

export const METRIC_DESCRIPTIONS: Record<string, string> = {
    'Completion Rate': `Measures the percentage of completed work versus planned in a sprint. 
  • Low: 100% or more (excellent) 
  • Medium: 85%-99% 
  • High: Below 85% (underperforming)`,

    'Security Requirements Coverage': `Indicates whether security requirements are documented.
  • Low: Present 
  • High: Missing (critical gap)`,

    'Security Incidents': `Tracks the number of reported security incidents.
  • Low: None 
  • High: One or more (troubling)`,

    'Stakeholder Satisfaction (NSI)': `Net Satisfaction Index based on stakeholder feedback.
  • Low: 100+ 
  • Low-Medium: 75–99 
  • Medium: 50–74 
  • Medium-High: 25–49 
  • High: Below 25`,

    'User Satisfaction (NSI)': `Net Satisfaction Index from end users.
  • Low: 100+ 
  • Low-Medium: 75–99 
  • Medium: 50–74 
  • Medium-High: 25–49 
  • High: Below 25`,

    'Average Cyclomatic Complexity per function': `Measures logical complexity of code (branching, loops).
  • Low: ≤ 10 (simple) 
  • Medium: 11–20 
  • High: > 20 (complex, risky)`,

    'Average Cognitive Complexity per function': `Indicates how difficult code is to understand.
  • Low: ≤ 15 (readable) 
  • High: > 15 (confusing)`,

    'Code Smells per KLOC': `Count of non-functional issues per 1,000 lines of code.
  • Low: ≤ 5 
  • Medium: 6–10 
  • High: > 10 (Indicates maintainability problems)`,

    'Duplicated Lines Density': `Percentage of code that is duplicated.
  • Low: ≤ 3% 
  • High: > 3% (reduces maintainability)`,

    'Programming Language Energy Impact': `Estimated energy usage of code, based on language.
  • Low: ≤ 50 J/DRAM 
  • Medium: 51–200 
  • High: > 200 (inefficient)`,

    'Unused Libraries': `Reports libraries that are installed but not used.
  • Low: None 
  • High: 1 or more (increases attack surface)`,

    'Secrets detected by GitLeaks': `Hardcoded secrets found in codebase.
  • Low: None 
  • High: 1 or more (severe security risk)`,

    'Test Success Density': `Percentage of unit tests that pass.
  • Low: 100% 
  • High: < 100% (should never fail in CI)`,

    'Total Coverage': `Overall code coverage by automated tests.
  • Low: ≥ 80% 
  • High: < 80% (missing test coverage)`,

    'OWASP ZAP Penetration Tests Findings': `Findings from automated penetration testing.
  • Low: Only low/informational present 
  • Medium: At least one Medium severity present 
  • High: At least one high-severity finding`,

    'Average Deployment Time': `Time from commit to production deployment (in hours).
  • Low: < 1 hour 
  • Medium: 1–3 hours 
  • High: > 3 hours`,

    'Average Deployment Frequency': `Average days between deployments.
  • Low: ≥ 1/week 
  • Medium: ≥ 1/month 
  • High: Less than 1/month`,

    'Defect Density per KLOC': `Number of bugs per 1,000 lines of code.
  • Low: ≤ 1 
  • Medium: 2–10 
  • High: > 10 (poor quality)`,

    'Mean Time to Recover (MTTR)': `Time taken to resolve production incidents (in hours).
  • Low: < 1 hour 
  • Medium: 1–24 hours 
  • High: > 24 hours (slow recovery)`,

    'Outdated Packages': `Number of dependencies that are outdated.
  • Low: None 
  • High: >= 1 (security and compatibility risk)`,

    'CVE identifiers and CVSS scores': `Number of known vulnerabilities and their severity.
  • Low: CVSS < 4 
  • Medium: 4–6.9 
  • High: ≥ 7 (critical exposure)`,
};
