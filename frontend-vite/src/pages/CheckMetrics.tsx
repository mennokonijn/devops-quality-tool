import React, {useEffect, useState} from "react";
import '../styles/CheckMetrics.scss';
import MetricTable from "../components/MetricTable.tsx";
import axios from "axios";
import MetricChart from "../components/MetricChart.tsx";
import {Link} from "react-router-dom";
import SurveyAnswers from "../components/surveyAnswers.tsx";

const stages = ['Plan', 'Code', 'Build', 'Test', 'DeployRelease', 'OperateMonitor'];

const CheckMetrics: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Planning');
    const [repos, setRepos] = useState([{name: '', id: '' }]);
    const [selectedRepo, setSelectedRepo] = useState({name: '', id: '' });
    const [measuredMetrics, setMeasuredMetrics] = useState<Record<string, { name: string; value: string }[]>>({});
    const [measuredMetricsHistory, setMeasuredMetricsHistory] = useState<Record<string, { name: string; value: string }[]>[]>([]);
    const [notFetched, setNotFetched] = useState(true);
    const [selectedMetricName, setSelectedMetricName] = useState<string | null>(null);


    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/repos');
                setRepos(response.data.map((repo: { name: string, id: string }) => repo));
                setSelectedRepo({name: response.data[0]?.name, id: response.data[0]?.id });
            } catch (error) {
                console.error('Error fetching repositories:', error);
            }
        };

        fetchRepos();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const surveyNSIResponse = await axios.get('http://localhost:4000/api/survey-nsi', {
                params: { repo: selectedRepo.id },
            });

            const nsiValue: number = surveyNSIResponse.data.nsi

            const stakeholderSurveyNSIResponse = await axios.get('http://localhost:4000/api/stakeholder-survey-nsi', {
                params: { repo: selectedRepo.id },
            });

            const stakeholderNsiValue: number = stakeholderSurveyNSIResponse.data.nsi

            const response = await axios.get('http://localhost:4000/api/extract-results', {
                params: { repo: selectedRepo.name },
            });

            const responseData: Record<string, { name: string; value: string }[]>[] = response.data

            if (nsiValue !== null) {
                const latestScan = responseData[responseData.length - 1];
                if (!latestScan.OperateMonitor) latestScan.OperateMonitor = [];
                latestScan.OperateMonitor.push({
                    name: 'User Satisfaction (NSI)',
                    value: `${nsiValue} / 100`
                });
            }

            if (stakeholderNsiValue !== null) {
                const latestScan = responseData[responseData.length - 1];
                if (!latestScan.Plan) latestScan.Plan = [];
                latestScan.Plan.push({
                    name: 'Stakeholder Satisfaction (NSI)',
                    value: `${stakeholderNsiValue} / 100`
                });
            }

            setMeasuredMetrics(responseData[responseData.length - 1]);
            setMeasuredMetricsHistory(responseData);
            console.log(responseData);
            setNotFetched(false);
            setActiveTab('OperateMonitor');
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    return (
        <div className={'check-metrics'}>
            <form className="form" onSubmit={handleSubmit}>
                <h2 className={'input-question'}>Your GitHub repository name</h2>
                <select
                    className={'select-field'}
                    value={selectedRepo.id}
                    onChange={e => {
                        const selected = repos.find(r => r.id === e.target.value);
                        if (selected) setSelectedRepo(selected);
                    }}
                >
                    {repos.map(repo => (
                        <option key={repo.id} value={repo.id}>
                            {repo.name}
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
                    <div>
                        <h2 className="metrics-title">User Survey link for {selectedRepo.name}</h2>
                        <p className="survey-link">
                            <Link to={`/user-survey/${selectedRepo.id}`}>
                                Go to survey for {selectedRepo.name}
                            </Link>
                        </p>
                        <h2 className="metrics-title">Stakeholder Survey link for {selectedRepo.name}</h2>
                        <p className="survey-link">
                            <Link to={`/stakeholder-survey/${selectedRepo.id}`}>
                                Go to survey for {selectedRepo.name}
                            </Link>
                        </p>
                    </div>
                    <div className="tabs">
                        {stages.map(stage => (
                            <button
                                key={stage}
                                className={'tabs-button ' + (activeTab === stage ? 'active' : '')}
                                onClick={() => {
                                    setActiveTab(stage) ; setSelectedMetricName('');}}
                            >
                                {stage}
                            </button>
                        ))}
                    </div>
                    <div className="tab-content">
                        <h2 className={'tab-content-title'}>{activeTab} Metrics</h2>
                        <div className={'tab-content-data'}>
                            <MetricTable metrics={measuredMetrics[activeTab] || []} onSelectMetric={setSelectedMetricName}/>
                            {measuredMetricsHistory.length > 0 &&
                                selectedMetricName &&
                                selectedMetricName !== '' &&
                                selectedMetricName !== 'User Satisfaction (NSI)' &&
                                selectedMetricName !== 'Stakeholder Satisfaction (NSI)' && (
                                <div className={'graph-container'}>
                                        <MetricChart
                                            history={measuredMetricsHistory}
                                            stage={activeTab}
                                            metricName={selectedMetricName}
                                        />
                                </div>
                            )}
                            {(selectedMetricName === 'User Satisfaction (NSI)' || selectedMetricName === 'Stakeholder Satisfaction (NSI)') && (
                                <div className={'graph-container'}>
                                    <SurveyAnswers repositoryId={selectedRepo.id} selectedMetricName={selectedMetricName}/>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CheckMetrics;
