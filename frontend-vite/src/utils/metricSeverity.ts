import type {ZapAlert} from "../components/MetricTable.tsx";
import {parseNumericValue} from "./nummeric.ts";

export const classifyMetricSeverity = (
    metricName: string,
    value: number | string | ZapAlert[]
): 'low' | 'low-medium' | 'medium' | 'medium-high' | 'high' | undefined => {

    let numericValue: number | null = 0;

    if (Array.isArray(value)) {
        numericValue = value.length;
    } else {
        numericValue = parseNumericValue(value);
    }

    if (numericValue) {
        switch (metricName) {
            // https://help.jiraalign.com/hc/en-us/articles/115004398087-Sprint-metrics
            case 'Completion Rate':
                if (numericValue >= 100) return 'low';
                if (numericValue >= 85) return 'medium';
                return 'high';


            // Say that even mentioning it is good enough for a project
            case 'Security Requirements Coverage':
                if (numericValue > 0) return 'low';
                return 'high';

            // Say that even mentioning it is good enough for a project
            case 'Security Incidents':
                if (numericValue > 0) return 'high';
                return 'low';

            // https://www.researchgate.net/figure/Net-satisfaction-index_tbl2_45363421
            case 'Stakeholder Satisfaction (NSI)':
            case 'User Satisfaction (NSI)':
                if (numericValue >= 100) return 'low';
                if (numericValue >= 75) return 'low-medium';
                if (numericValue >= 50) return 'medium';
                if (numericValue >= 25) return 'medium-high';
                return 'high';

            // https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=1702388 and http://www.mccabe.com/ppt/SoftwareQualityMetricsToIdentifyRisk.ppt
            case 'Average Cyclomatic Complexity per function':
                if (numericValue <= 10) return 'low';
                if (numericValue <= 20) return 'medium';
                return 'high';

            // https://stackoverflow.com/questions/45083653/sonarqube-qualify-cognitive-complexity/45084107#45084107
            case 'Average Cognitive Complexity per function':
                if (numericValue <= 15) return 'low';
                return 'high';

            // Correct according to G Ann Campbell https://community.sonarsource.com/t/what-is-the-acceptable-rate-of-code-smells/131227?utm_source=chatgpt.com
            case 'Code Smells per KLOC':
                if (numericValue <= 5) return 'low';
                if (numericValue <= 10) return 'medium';
                return 'high';

            // https://docs.sonarsource.com/sonarqube-cloud/standards/about-new-code/?_gl=1*1hjj5eh*_gcl_au*MTM4MjMxNDA0Ny4xNzUzNDI2OTkx*_ga*MTMzMjA0Nzc2LjE3NDUzOTMwNDg.*_ga_9JZ0GZ5TC6*czE3NTM0MjY5ODgkbzEzJGcxJHQxNzUzNDI3NDQ0JGo1OSRsMCRoMA..
            case 'Duplicated Lines Density':
                if (numericValue <= 3) return 'low';
                return 'high';

            // Based on the correlation table and energy usage of programming languages
            case 'Programming Language Energy Impact':
                if (numericValue <= 50) return 'low';
                if (numericValue <= 200) return 'medium';
                return 'high';

            case 'Unused Libraries':
                if (numericValue === 0) return 'low';
                return 'high';

            case 'Secrets detected by GitLeaks':
                if (numericValue === 0) return 'low';
                return 'high';

            // Based on industry standards and SonarQube recommendations, so no test should ever fail
            case 'Test Success Density':
                if (numericValue >= 100) return 'low';
                return 'high';

            // https://docs.sonarsource.com/sonarqube-cloud/standards/about-new-code/?_gl=1*1hjj5eh*_gcl_au*MTM4MjMxNDA0Ny4xNzUzNDI2OTkx*_ga*MTMzMjA0Nzc2LjE3NDUzOTMwNDg.*_ga_9JZ0GZ5TC6*czE3NTM0MjY5ODgkbzEzJGcxJHQxNzUzNDI3NDQ0JGo1OSRsMCRoMA.
            case 'Total Coverage':
                if (numericValue >= 80) return 'low';
                return 'high';

            case 'OWASP ZAP Penetration Tests Findings':
                if (Array.isArray(value)) {
                    const severities = value.map((alert: ZapAlert) => alert.description?.toLowerCase() || '');

                    if (severities.some(s => s.includes('high'))) return 'high';
                    if (severities.some(s => s.includes('medium'))) return 'medium';
                    if (severities.some(s => s.includes('low'))) return 'low';
                }
                return 'low';

            // No benchmarks available, so we assume that the lower the better
            case 'Average Deployment Time':
                if (numericValue < 1) return 'low';
                if (numericValue < 3) return 'medium';
                return 'high';

            // https://instatus.com/blog/deployment-frequency
            case 'Average Deployment Frequency':
                if (numericValue >= 1/7) return 'low';
                if (numericValue >= 1/31) return 'medium';
                return 'high';

            // https://graphite.dev/guides/defect-density-benchmarks-industry-standards
            case 'Defect Density per KLOC':
                if (numericValue <= 1) return 'low';
                if (numericValue <= 10) return 'medium';
                return 'high';

            // https://www.atlassian.com/devops/frameworks/devops-metrics
            case 'Mean Time to Recover (MTTR)':
                if (numericValue < 1) return 'low';
                if (numericValue < 24) return 'medium';
                return 'high';

            case  'Outdated Packages':
                if (numericValue === 0) return 'low';
                return 'high';

            // https://trivy.dev/v0.50/docs/scanner/vulnerability/
            case 'CVE identifiers and CVSS scores':
                if (numericValue < 4) return 'low';
                if (numericValue < 7) return 'medium';
                return 'high';

            default:
                return undefined;
        }
    }
};
