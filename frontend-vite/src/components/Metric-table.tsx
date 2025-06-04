import React from 'react';
import '../styles/metric-table.scss';

type MetricTableProps = {
    metrics: { name: string; value: string | number }[];
};

const MetricTable: React.FC<MetricTableProps> = ({ metrics }) => {
    if (metrics.length === 0) return <p>No metrics available.</p>;

    return (
        <table className="metric-table">
            <thead className={'table-head'}>
                <tr className={'table-row'}>
                    <th className={'table-header'}>Metric</th>
                    <th className={'table-header'}>Value</th>
                </tr>
            </thead>
            <tbody className={'table-body'}>
            {metrics.map((metric) => (
                <tr className={'table-row'} key={metric.name}>
                    <td className={'table-cell'}>{metric.name}</td>
                    <td className={'table-cell'}>{metric.value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default MetricTable;
