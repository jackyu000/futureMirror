import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartSurvey = () => {
    navigate('/survey');
  };

  return (
    <div className="landing-page">
      <div className="logo-container">
        <h1 className="future-text">FUTURE</h1>
        <h1 className="mirror-text">MIRROR</h1>
      </div>
      
      <p className="description">
        Help us shape the future by participating in our research survey. Your insights matter!
      </p>

      <button className="start-button" onClick={handleStartSurvey}>
        Start Survey
      </button>

      <div className="info-box">
        <h2>What to expect:</h2>
        <ol>
          <li>
            <h3>Take a Quick 5-Minute Questionnaire:</h3>
            <p>Share insights about your current lifestyle habits—quick, easy, and hassle-free!</p>
          </li>
          <li>
            <h3>Upload Your Photo:</h3>
            <p>Let the app create a personalized, realistic visualization of your future self.</p>
          </li>
          <li>
            <h3>See Your Future Self:</h3>
            <p>Discover how your current lifestyle might shape your appearance over time.</p>
          </li>
          <li>
            <h3>Explore the Possibilities:</h3>
            <p>Compare how positive lifestyle changes could transform your future self—it's like looking at the best version of you!</p>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default LandingPage;
