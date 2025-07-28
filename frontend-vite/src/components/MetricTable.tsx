import React, { useState } from 'react';
import '../styles/MetricTable.scss';
import {classifyMetricSeverity} from "../utils/metricSeverity.ts";
import {METRIC_DESCRIPTIONS} from "../utils/tools-metrics.ts";

export type ZapAlert = {
    description: string;
    alert: string;
    riskcode: string;
    solution: string;
    reference: string;
};

export type Metric = {
    name: string;
    value: string | number | ZapAlert[];
};

export const riskCodeToSeverity = (code: string) => {
    switch (code) {
        case '0': return 'informational';
        case '1': return 'low';
        case '2': return 'medium';
        case '3': return 'high';
        default: return 'unknown';
    }
};




type MetricTableProps = {
    metrics: Metric[];
    onSelectMetric?: (metricName: string) => void;
};

const MetricTable: React.FC<MetricTableProps> = ({ metrics, onSelectMetric }) => {
    const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

    if (metrics.length === 0) return <p>No metrics available.</p>;

    const isExpandable = (value: any) =>
        (typeof value === 'string' && value.includes('\n')) ||
        (Array.isArray(value) && value.length > 0);

    return (
        <div className={'table-container'}>
            <table className="metric-table">
                <thead className={'table-head'}>
                <tr className={'table-row'}>
                    <th className={'table-header'}>Metric</th>
                    <th className={'table-header'}>Value</th>
                </tr>
                </thead>
                <tbody className={'table-body'}>
                {metrics.map((metric) => {
                    const isExpanded = expandedMetric === metric.name;
                    const isLong = isExpandable(metric.value);

                    let summary: string | number;

                    if (typeof metric.value === 'string') {
                        summary = metric.value.split('\n')[0];
                    } else if (typeof metric.value === 'number') {
                        summary = metric.value;
                    } else if (Array.isArray(metric.value)) {
                        summary = `${metric.value.length} ZAP alert(s)`;
                    } else {
                        summary = '-';
                    }

                    return (
                        <React.Fragment key={metric.name}>
                            <tr
                                className={`table-row metric-${classifyMetricSeverity(metric.name, metric.value) || ''}`}
                                onClick={() => {
                                    if (isLong) {
                                        setExpandedMetric(isExpanded ? null : metric.name);
                                    }
                                    onSelectMetric?.(metric.name);
                                }}
                                style={{cursor: 'pointer'}}
                            >
                                <td className={'table-cell'}>{metric.name}</td>
                                <td className={'table-cell'}>
                                    {summary}
                                    {isLong && !isExpanded && ' ...'}
                                </td>
                            </tr>
                            {isExpanded && isLong && (
                                <tr className={'table-row'}>
                                    <td colSpan={2} className={'expanded-cell'}>
                                        {Array.isArray(metric.value) && metric.value[0]?.alert ? (
                                            <div className="zap-alert-list">
                                                {metric.value.map((item, idx) => (
                                                    <div key={idx} className={`zap-alert severity-${riskCodeToSeverity(item.riskcode)}`}>
                                                        <div><strong>▶ [{item.description}]</strong>
                                                            <strong>{item.alert}</strong></div>
                                                        <div><strong>Fix:</strong> {item.solution}</div>
                                                        <div><strong>Ref:</strong>
                                                            <a href={item.reference} target="_blank" rel="noopener noreferrer">{item.reference}</a>
                                                        </div>
                                                        <hr/>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <pre>{metric.value as string | number}</pre>
                                        )}
                                    </td>
                                </tr>
                            )}

                        </React.Fragment>
                    );
                })}
                </tbody>
            </table>
            <div className="metric-info-panel">
                <h3>Metric Descriptions</h3>
                <ul>
                    {metrics.map((metric) => {
                        const description = METRIC_DESCRIPTIONS[metric.name];
                        if (!description) {
                            return (
                                <li key={metric.name}>
                                    <strong>{metric.name}:</strong> No description available.
                                </li>
                            );
                        }

                        const [mainText, ...severityParts] = description.split('•');

                        return (
                            <li key={metric.name} style={{marginBottom: '1rem'}}>
                                <strong>{metric.name}:</strong> {mainText.trim()}
                                {severityParts.length > 0 && (
                                    <ul style={{marginTop: '0.25rem', paddingLeft: '1rem'}}>
                                        {severityParts.map((s, idx) => (
                                            <li key={idx}>{s.trim()}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

        </div>
    );
};

export default MetricTable;
