import React, { useState } from 'react';
import '../styles/survey.scss';
import axios from 'axios';
import {useParams} from "react-router-dom";

const QUESTIONS = [
    "How clearly were the system requirements communicated?",
    "How complete were the requirements in addressing business needs?",
    "How effectively were changes to requirements managed throughout the project?",
    "How traceable are features to their original requirements?",
    "How satisfied are you with the alignment between the delivered product and the initial goals?",
    "How satisfied are you with the communication and transparency throughout the project?",
    "How satisfied are you with the team's responsiveness to stakeholder input?",
    "How satisfied are you with the overall delivery timeline and process?"
];


const UserSatisfactionSurvey: React.FC = () => {
    const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(3));
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
            await axios.post('http://localhost:4000/api/stakeholder-survey', payload);
            setSubmitted(true);
        } catch (err) {
            console.error("Submission failed", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="survey-form">
            <h2>Stakeholder Satisfaction Survey</h2>
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
