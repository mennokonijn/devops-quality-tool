import React, { useState } from 'react';
import '../styles/survey.scss';
import axios from 'axios';
import {useParams} from "react-router-dom";

const QUESTIONS = [
    "How satisfied are you with the system's capability to meet your needs?",
    "How satisfied are you with the ease of use of the system?",
    "How satisfied are you with the system's performance (e.g., speed and responsiveness)?",
    "How satisfied are you with the system's reliability (e.g., uptime, crash-free usage)?",
    "How satisfied are you with the ease of installation and setup process?",
    "How satisfied are you with the system's maintainability (ease of updating or modifying it)?",
    "How satisfied are you with the quality and clarity of the documentation provided?",
    "How satisfied are you with the quality of service and support you received?",
    "Overall, how satisfied are you with the system or product?"
];


const UserSatisfactionSurvey: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>(
        () => QUESTIONS.map(() => Math.floor(Math.random() * 6)) // random value 0-5
    );

    const [submitted, setSubmitted] = useState(false);

    const { repositoryId } = useParams<{ repositoryId: string }>();

    const numericRepositoryId = parseInt(repositoryId || '', 10);
    if (isNaN(numericRepositoryId)) {
        return <p>Invalid repository ID</p>;
    }

    const handleChange = (index: number, rating: number) => {
        const updated = [...answers];
        updated[index] = rating;
        setAnswers(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            repository_id: repositoryId,
            answers: QUESTIONS.map((question, i) => ({
                question,
                rating: answers[i],
            }))
        };

        try {
            await axios.post('http://localhost:4000/api/user-survey', payload);
            setSubmitted(true);
        } catch (err) {
            console.error("Submission failed", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="survey-form">
            <h2>User Satisfaction Survey</h2>
            {submitted ? (
                <h2>Form succesfully submitted</h2>
            ) : (
                <>
                    {QUESTIONS.map((q, idx) => (
                        <div key={idx} className="survey-question">
                            <label>{q}</label>
                            <select
                                value={answers[idx]}
                                onChange={(e) => handleChange(idx, parseInt(e.target.value))}
                            >
                                <option value={0}>0 - Not Applicable</option>
                                <option value={1}>1 - Very Dissatisfied</option>
                                <option value={2}>2 - Dissatisfied</option>
                                <option value={3}>3 - Neutral</option>
                                <option value={4}>4 - Satisfied</option>
                                <option value={5}>5 - Very Satisfied</option>
                            </select>
                        </div>
                    ))}
                    <button type="submit" className="submit-button">Submit Survey</button>
                </>
            )}
        </form>
    );
};

export default UserSatisfactionSurvey;
