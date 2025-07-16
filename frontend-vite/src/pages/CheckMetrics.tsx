import React, {useEffect, useState} from "react";
import '../styles/CheckMetrics.scss';
import MetricTable from "../components/MetricTable.tsx";
import axios from "axios";
import MetricChart from "../components/MetricChart.tsx";

const stages = ['Plan', 'Code', 'Build', 'Test', 'Deploy/Release', 'Operate/Monitor'];

const CheckMetrics: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Planning');
    const [repos, setRepos] = useState(['']);
    const [selectedRepo, setSelectedRepo] = useState('');
    const [measuredMetrics, setMeasuredMetrics] = useState<Record<string, { name: string; value: string }[]>>({});
    const [measuredMetricsHistory, setMeasuredMetricsHistory] = useState<Record<string, { name: string; value: string }[]>[]>([]);
    const [notFetched, setNotFetched] = useState(true);
    const [selectedMetricName, setSelectedMetricName] = useState<string | null>(null);


    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/repos');
                setRepos(response.data.map((repo: { name: string }) => repo.name));
                setSelectedRepo(response.data[0]?.name || '');
            } catch (error) {
                console.error('Error fetching repositories:', error);
            }
        };

        fetchRepos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:4000/api/extract-results', {
                params: { repo: selectedRepo },
            });

            const responseData: Record<string, { name: string; value: string }[]>[] = response.data

            setMeasuredMetrics(responseData[responseData.length - 1]);
            setMeasuredMetricsHistory(responseData);
            setNotFetched(false);
            setActiveTab('Plan');
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    return (
        <div className={'check-metrics'}>
            <h1 className="title-text">Overview of Metrics</h1>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className={'input-question'}>Your GitHub repository name</h2>
                <select className={'select-field'} value={selectedRepo} onChange={e => setSelectedRepo(e.target.value)}>
                    {repos.map(repo => (
                        <option key={repo} value={repo}>
                            {repo}
                        </option>
                    ))}
                </select>
                <button className={'get-metrics-button'} type={"submit"}>
                    Get Metrics
                </button>
            </form>
            {notFetched ? (
                <div className="loading-message">
                    <p>Click "Get Metrics" to fetch the latest metrics from your repository.</p>
                </div>
            ) : (
                <>
                    <div className="tabs">
                        {stages.map(stage => (
                            <button
                                key={stage}
                                className={'tabs-button ' + (activeTab === stage ? 'active' : '')}
                                onClick={() => {setActiveTab(stage) ; setSelectedMetricName(null);}}
                            >
                                {stage}
                            </button>
                        ))}
                    </div>
                    <div className="tab-content">
                        <h2 className={'tab-content-title'}>{activeTab} Metrics</h2>
                        <div className={'tab-content-data'}>
                            <MetricTable metrics={measuredMetrics[activeTab] || []} onSelectMetric={setSelectedMetricName}/>
                            <div className={'graph-container'}>
                                <MetricChart
                                    history={measuredMetricsHistory}
                                    stage={activeTab}
                                    metricName={selectedMetricName}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CheckMetrics;
