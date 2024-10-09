import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './pages/welcome/WelcomePage';
import EvaluationPage from './pages/evaluation/EvaluationPage';
import FormPage from './pages/forms/FormPage';
import QnAPage from './pages/qna/QnAPage';
import CustomNavbar from './components/Navbar';
import AnalysisDashboard from './pages/reports/AnalysisDashboard';
import ComparisonFormPage from './pages/candidate-comparison/ComparisonFormPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="*" element={
                    <div>
                        <CustomNavbar />
                        <Routes>
                            <Route path="/evaluation" element={<EvaluationPage />} />
                            <Route path="/form" element={<FormPage />} />
                            <Route path="/qna" element={<QnAPage />} />
                            <Route path="/analysis" element={<AnalysisDashboard />} />
                            <Route path="/compare" element={<ComparisonFormPage />} />
                        </Routes>
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
