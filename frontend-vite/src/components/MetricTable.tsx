import React, { useState } from 'react';
import '../styles/MetricTable.scss';

type Metric = { name: string; value: string | number };

type MetricTableProps = {
    metrics: Metric[];
};

const MetricTable: React.FC<MetricTableProps> = ({ metrics }) => {
    const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

    if (metrics.length === 0) return <p>No metrics available.</p>;

    const isExpandable = (value: any) =>
        typeof value === 'string' && value.includes('\n');

    return (
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

                const summary = isLong ? metric.value.toString().split('\n')[0] : metric.value;

                return (
                    <React.Fragment key={metric.name}>
                        <tr
                            className={'table-row'}
                            onClick={() => isLong && setExpandedMetric(isExpanded ? null : metric.name)}
                            style={{ cursor: isLong ? 'pointer' : 'default' }}
                        >
                            <td className={'table-cell'}>{metric.name}</td>
                            <td className={'table-cell'}>
                                {summary}
                                {isLong && !isExpanded && ' ...'}
                            </td>
                        </tr>
                        {isExpanded && isLong && (
                            <tr className={'table-row'}>
                                <td colSpan={2} className={'table-cell expanded-cell'}>
                                    <pre>{metric.value}</pre>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                );
            })}
            </tbody>
        </table>
    );
};

export default MetricTable;
