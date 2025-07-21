import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import {parseNumericValue} from "../utils/nummeric.ts";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

interface Metric {
    name: string;
    value: string;
}

interface MetricChartProps {
    history: Record<string, Metric[]>[];
    stage: string;
    metricName: string | null;
}

const MetricChart: React.FC<MetricChartProps> = ({ history, stage, metricName }) => {
    const labels = history.map((_, index) => `Run ${index + 1}`);

    const data = {
        labels,
        datasets: [
            {
                label: metricName ?? '',
                data: history.map(run => {
                    const metric = run[stage]?.find(m => m.name === metricName);

                    if (!metric) return null;

                    if (Array.isArray(metric.value)) {
                        return metric.value.length;
                    }

                    if (typeof metric.value === 'string' || typeof metric.value === 'number') {
                        return parseNumericValue(metric.value);
                    }

                    return null;
                }),

                borderWidth: 2,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
                spanGaps: true
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `${stage} Metric History`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default MetricChart;
