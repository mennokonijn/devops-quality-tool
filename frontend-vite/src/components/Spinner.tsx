import React from 'react';
import '../styles/Spinner.scss';

const Spinner: React.FC = () => (
    <div className="spinner-container">
        <div className="spinner" />
        <p>Analyzing repository...</p>
    </div>
);

export default Spinner;
