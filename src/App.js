import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthSurvey from './components/HealthSurvey';
import LandingPage from './components/LandingPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/survey" element={<HealthSurvey />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
