import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BackendStatus from "./pages/BackendStatus.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/status" element={<BackendStatus />} />
            </Routes>
        </Router>
    );
}

export default App;
