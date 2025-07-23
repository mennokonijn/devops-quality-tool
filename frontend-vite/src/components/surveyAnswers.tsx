import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/surveyAnswers.scss';

const SurveyAnswers: React.FC<{ repositoryId: string, selectedMetricName: string }> = ({ repositoryId, selectedMetricName }) => {
    const [answers, setAnswers] = useState<{ question: string; average_rating: number; total_responses: number }[]>([]);

    useEffect(() => {
        const fetchAverages = async () => {
            try {
                if (selectedMetricName === 'User Satisfaction (NSI)') {
                    const res = await axios.get('http://localhost:4000/api/user-survey/averages/' + repositoryId);
                    setAnswers(res.data.averages);
                } else if (selectedMetricName === 'Stakeholder Satisfaction (NSI)') {
                    const res = await axios.get('http://localhost:4000/api/stakeholder-survey/averages/' + repositoryId);
                    setAnswers(res.data.averages);
                }

            } catch (err) {
                console.error("Failed to load survey answers", err);
            }
        };
        fetchAverages();
    }, [repositoryId]);

    const getLabel = (rating: number): string => {
        if (rating < 1) return 'Very Dissatisfied';
        if (rating < 2) return 'Dissatisfied';
        if (rating < 3) return 'Neutral';
        if (rating < 4) return 'Satisfied';
        return 'Very Satisfied';
    };

    const getColor = (rating: number): string => {
        if (rating < 1) return '#d9534f';
        if (rating < 2) return '#f0ad4e';
        if (rating < 3) return '#f7e463';
        if (rating < 4) return '#a6e3a1';
        return '#5cb85c';
    };


    return (
        <div className="survey-breakdown-container">
            <h3>User Survey Answer Breakdown</h3>
            <div className="survey-breakdown-table">
                {answers.map((a, i) => (
                    <div key={i} className="survey-row">
                        <div className="survey-question">{a.question}</div>
                        <div className="survey-rating-bar">
                            <div
                                className="rating-fill"
                                style={{
                                    width: `${(a.average_rating / 5) * 100}%`,
                                    backgroundColor: getColor(a.average_rating),
                                }}
                            />
                        </div>
                        <span className="rating-label">
                            {getLabel(a.average_rating)} ({a.average_rating} / 5)
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyAnswers;
