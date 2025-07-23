import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BackendStatus from './pages/BackendStatus';
import './styles/App.scss';
import CheckMetrics from "./pages/CheckMetrics.tsx";
import UserSatisfactionSurvey from "./pages/userSatisfactionSurvey.tsx";
import StakeholderSatisfactionSurvey from "./pages/stakeholderSatisfactionSurvey.tsx";

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav className="tab-nav">
                    <TabLink to="/" label="Generate Workflow" />
                    <TabLink to="/measurements" label="Stage Metrics" />
                </nav>

                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/status" element={<BackendStatus />} />
                    <Route path="/measurements" element={<CheckMetrics />} />
                    <Route path="/user-survey/:repositoryId" element={<UserSatisfactionSurvey />} />
                    <Route path="/stakeholder-survey/:repositoryId" element={<StakeholderSatisfactionSurvey />} />
                </Routes>
            </div>
        </Router>
    );
}

function TabLink({ to, label }: { to: string; label: string }) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link className={`tab-link ${isActive ? 'active' : ''}`} to={to}>
            {label}
        </Link>
    );
}

export default App;
