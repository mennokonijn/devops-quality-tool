import React, { useEffect, useState } from 'react';

const BackendStatus: React.FC = () => {
    const [status, setStatus] = useState('Loading...');

    useEffect(() => {
        fetch('http://localhost:4000/api/health')
            .then((res) => res.text())
            .then((msg) => setStatus(msg))
            .catch(() => setStatus('❌ Backend not reachable'));
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2>Backend Status</h2>
            <p>{status}</p>
        </div>
    );
};

export default BackendStatus;
