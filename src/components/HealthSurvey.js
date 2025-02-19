import React, { useState } from 'react';
import ChatBot from './ChatBot';
import './HealthSurvey.css';

const HealthSurvey = () => {
  const [formData, setFormData] = useState({
    bloodPressure: '',
    hemoglobinA1c: '',
    cholesterolLevels: '',
    bmi: '',
    dietaryHabits: '',
    alcoholConsumption: '',
    smoking: '',
    aerobicActivities: '',
    sleepHabits: '',
    stressLevels: '',
    socialRelationships: '',
    meaningInLife: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [surveyResults, setSurveyResults] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = (field) => {
    setFormData({
      ...formData,
      [field]: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Map of attribute descriptions
    const attributeDescriptions = {
      bloodPressure: "Blood Pressure",
      hemoglobinA1c: "Hemoglobin A1c Score",
      cholesterolLevels: "Cholesterol Levels",
      bmi: "Body Mass Index (BMI)",
      dietaryHabits: "Dietary Habits",
      alcoholConsumption: "Alcohol Consumption",
      smoking: "Smoking Status",
      aerobicActivities: "Aerobic Activities",
      sleepHabits: "Sleep Habits",
      stressLevels: "Stress Levels",
      socialRelationships: "Social Relationships",
      meaningInLife: "Meaning in Life"
    };

    // Map of value descriptions
    const valueDescriptions = {
      // Blood Pressure
      greater140_90: "Greater than 140/90",
      between120_139: "Between 120/80 and 139/89",
      less120_80: "Less than 120/80",
      
      // Hemoglobin A1c
      'greater6.4': "Greater than 6.4",
      'between5.7_6.4': "Between 5.7 and 6.4",
      'less5.7': "Less than 5.7",
      
      // Cholesterol
      above190: "190 mg/dL or above",
      noTreatment: "No treatment required, OR less than 190 mg/dL, OR, for people with cardiovascular disease, LDL in accordance with CDC recommendations",
      
      // BMI
      obese: "Obese (greater than 30 kg/m²)",
      underweight_overweight: "Underweight (below 18.5 kg/m²) or Overweight (25 - 29.9 kg/m²)",
      healthy: "Healthy (18.5 - 25 kg/m²)",
      
      // Dietary Habits
      lessThan2: "Fewer than 2 of the recommendations",
      exactly2: "2 of the recommendations",
      '3orMore': "3 or more of the recommendations",
      
      // Alcohol
      '4orMore': "4 or more drinks per week",
      '2to3': "2 - 3 drinks per week",
      '0to1': "0 - 1 drinks per week",
      
      // Smoking
      currentSmoker: "Yes, I am a current smoker",
      neverOrQuit: "I never smoked or quit more than a year ago",
      
      // Aerobic Activities
      lessThan150: "Less than 150 minutes of moderate or 75 minutes of high intensity physical activity per week",
      atLeast150: "At least 150 minutes of moderate physical activity or 75 minutes of high intensity physical activity per week",
      
      // Sleep
      untreated: "Untreated sleep disorder and/or less than 7 hours of sleep per night",
      treated: "Treated sleep disturbances and at least 7 hours of sleep per night",
      
      // Stress
      high: "High level of stress that often makes it difficult to function",
      moderate: "Moderate level of stress that occasionally makes it difficult to function",
      manageable: "Manageable level of stress that rarely makes it difficult to function",
      
      // Social
      few: "Few or no close connections other than spouse or children",
      multiple: "At least two close connections besides spouse or children",
      
      // Meaning
      struggle: "Often struggle to find value or purpose in life",
      meaningful: "Generally feel that life has meaning and/or purpose"
    };

    // Create results object
    const results = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value) {  // Only include answered questions
        acc.push({
          attribute: attributeDescriptions[key],
          result: valueDescriptions[value]
        });
      }
      return acc;
    }, []);

    // Print results to console
    console.log('Survey Results:');
    console.log(JSON.stringify(results, null, 2));

    // Save results and show chat interface
    setSurveyResults(results);
    setSubmitted(true);
  };

  if (submitted && surveyResults) {
    return <ChatBot persona={surveyResults} />;
  }

  return (
    <div className="health-survey">
      <h1>Health Survey</h1>
      <form onSubmit={handleSubmit}>
        {/* Blood Pressure */}
        <div className="survey-section">
          <h3>Your resting blood pressure, with or without treatment:</h3>
          <div className="helper-text">
            If you're not sure, <a href="#" className="check-gateway">check Patient Gateway</a>.
          </div>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="bloodPressure"
                value="greater140_90"
                checked={formData.bloodPressure === 'greater140_90'}
                onChange={handleChange}
              />
              Greater than 140/90
            </label>
            <label>
              <input
                type="radio"
                name="bloodPressure"
                value="between120_139"
                checked={formData.bloodPressure === 'between120_139'}
                onChange={handleChange}
              />
              Between 120/80 and 139/89
            </label>
            <label>
              <input
                type="radio"
                name="bloodPressure"
                value="less120_80"
                checked={formData.bloodPressure === 'less120_80'}
                onChange={handleChange}
              />
              Less than 120/80
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('bloodPressure')}>reset</button>
        </div>

        {/* Hemoglobin A1c */}
        <div className="survey-section">
          <h3>Your Hemoglobin A1c score:</h3>
          <div className="helper-text">
            If you're not sure, <a href="#" className="check-gateway">check Patient Gateway</a>.
          </div>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hemoglobinA1c"
                value="greater6.4"
                checked={formData.hemoglobinA1c === 'greater6.4'}
                onChange={handleChange}
              />
              Greater than 6.4
            </label>
            <label>
              <input
                type="radio"
                name="hemoglobinA1c"
                value="between5.7_6.4"
                checked={formData.hemoglobinA1c === 'between5.7_6.4'}
                onChange={handleChange}
              />
              Between 5.7 and 6.4
            </label>
            <label>
              <input
                type="radio"
                name="hemoglobinA1c"
                value="less5.7"
                checked={formData.hemoglobinA1c === 'less5.7'}
                onChange={handleChange}
              />
              Less than 5.7
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('hemoglobinA1c')}>reset</button>
        </div>

        {/* Cholesterol Levels */}
        <div className="survey-section">
          <h3>Your cholesterol levels:</h3>
          <div className="helper-text">
            If you're not sure, <a href="#" className="check-gateway">check Patient Gateway</a>.
          </div>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="cholesterolLevels"
                value="above190"
                checked={formData.cholesterolLevels === 'above190'}
                onChange={handleChange}
              />
              190 mg/dL or above
            </label>
            <label>
              <input
                type="radio"
                name="cholesterolLevels"
                value="noTreatment"
                checked={formData.cholesterolLevels === 'noTreatment'}
                onChange={handleChange}
              />
              No treatment required, OR less than 190 mg/dL, OR, for people with cardiovascular disease, LDL in accordance with CDC recommendations
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('cholesterolLevels')}>reset</button>
        </div>

        {/* BMI */}
        <div className="survey-section">
          <h3>Your Body Mass Index (BMI)?</h3>
          <div className="helper-text">
            If you're not sure, you can <a href="#" className="calculator-link">use this calculator</a>.
          </div>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="bmi"
                value="obese"
                checked={formData.bmi === 'obese'}
                onChange={handleChange}
              />
              Obese (greater than 30 kg/m²)
            </label>
            <label>
              <input
                type="radio"
                name="bmi"
                value="underweight_overweight"
                checked={formData.bmi === 'underweight_overweight'}
                onChange={handleChange}
              />
              Underweight (below 18.5 kg/m²) or Overweight (25 - 29.9 kg/m²)
            </label>
            <label>
              <input
                type="radio"
                name="bmi"
                value="healthy"
                checked={formData.bmi === 'healthy'}
                onChange={handleChange}
              />
              Healthy: (18.5 - 25 kg/m²)
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('bmi')}>reset</button>
        </div>

        {/* Dietary Habits */}
        <div className="survey-section">
          <h3>Recommended dietary habits include:</h3>
          <div className="recommendations-list">
            <ul>
              <li>4-5 servings of fruit and vegetables per day;</li>
              <li>2 servings of lean protein per day</li>
              <li>3 or more servings of whole grains per day</li>
              <li>Less than 1,500 mg of sodium per day</li>
              <li>Less than 36 oz of sugar sweet beverages (soda, juice, etc.) per week</li>
            </ul>
          </div>
          <h4>Your weekly diet typically includes:</h4>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="dietaryHabits"
                value="lessThan2"
                checked={formData.dietaryHabits === 'lessThan2'}
                onChange={handleChange}
              />
              Fewer than 2 of the recommendations above
            </label>
            <label>
              <input
                type="radio"
                name="dietaryHabits"
                value="exactly2"
                checked={formData.dietaryHabits === 'exactly2'}
                onChange={handleChange}
              />
              2 of the recommendations above
            </label>
            <label>
              <input
                type="radio"
                name="dietaryHabits"
                value="3orMore"
                checked={formData.dietaryHabits === '3orMore'}
                onChange={handleChange}
              />
              3 or more of the recommendations above
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('dietaryHabits')}>reset</button>
        </div>

        {/* Alcohol Consumption */}
        <div className="survey-section">
          <h3>Your alcohol consumption:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="alcoholConsumption"
                value="4orMore"
                checked={formData.alcoholConsumption === '4orMore'}
                onChange={handleChange}
              />
              4 or more drinks per week
            </label>
            <label>
              <input
                type="radio"
                name="alcoholConsumption"
                value="2to3"
                checked={formData.alcoholConsumption === '2to3'}
                onChange={handleChange}
              />
              2 - 3 drinks per week
            </label>
            <label>
              <input
                type="radio"
                name="alcoholConsumption"
                value="0to1"
                checked={formData.alcoholConsumption === '0to1'}
                onChange={handleChange}
              />
              0 - 1 drinks per week
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('alcoholConsumption')}>reset</button>
        </div>

        {/* Smoking */}
        <div className="survey-section">
          <h3>Do you smoke?</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="smoking"
                value="currentSmoker"
                checked={formData.smoking === 'currentSmoker'}
                onChange={handleChange}
              />
              Yes, I am a current smoker
            </label>
            <label>
              <input
                type="radio"
                name="smoking"
                value="neverOrQuit"
                checked={formData.smoking === 'neverOrQuit'}
                onChange={handleChange}
              />
              I never smoked or quit more than a year ago
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('smoking')}>reset</button>
        </div>

        {/* Aerobic Activities */}
        <div className="survey-section">
          <h3>Aerobic activities:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="aerobicActivities"
                value="lessThan150"
                checked={formData.aerobicActivities === 'lessThan150'}
                onChange={handleChange}
              />
              Less than 150 minutes of moderate or 75 minutes of high intensity physical activity per week
            </label>
            <label>
              <input
                type="radio"
                name="aerobicActivities"
                value="atLeast150"
                checked={formData.aerobicActivities === 'atLeast150'}
                onChange={handleChange}
              />
              At least 150 minutes of moderate physical activity (ex. walking) or 75 minutes of high intensity physical activity per week
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('aerobicActivities')}>reset</button>
        </div>

        {/* Sleep Habits */}
        <div className="survey-section">
          <h3>Your sleep habits:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="sleepHabits"
                value="untreated"
                checked={formData.sleepHabits === 'untreated'}
                onChange={handleChange}
              />
              Untreated sleep disorder and/or less than 7 hours of sleep per night
            </label>
            <label>
              <input
                type="radio"
                name="sleepHabits"
                value="treated"
                checked={formData.sleepHabits === 'treated'}
                onChange={handleChange}
              />
              Treated sleep disturbances and at least 7 hours of sleep per night
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('sleepHabits')}>reset</button>
        </div>

        {/* Stress Levels */}
        <div className="survey-section">
          <h3>Your stress levels:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="stressLevels"
                value="high"
                checked={formData.stressLevels === 'high'}
                onChange={handleChange}
              />
              High level of stress that often makes it difficult to function
            </label>
            <label>
              <input
                type="radio"
                name="stressLevels"
                value="moderate"
                checked={formData.stressLevels === 'moderate'}
                onChange={handleChange}
              />
              Moderate level of stress that occasionally makes it difficult to function
            </label>
            <label>
              <input
                type="radio"
                name="stressLevels"
                value="manageable"
                checked={formData.stressLevels === 'manageable'}
                onChange={handleChange}
              />
              Manageable level of stress that rarely makes it difficult to function
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('stressLevels')}>reset</button>
        </div>

        {/* Social Relationships */}
        <div className="survey-section">
          <h3>Your social relationships:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="socialRelationships"
                value="few"
                checked={formData.socialRelationships === 'few'}
                onChange={handleChange}
              />
              I have few or no close connections other than my spouse or children
            </label>
            <label>
              <input
                type="radio"
                name="socialRelationships"
                value="multiple"
                checked={formData.socialRelationships === 'multiple'}
                onChange={handleChange}
              />
              I have at least two people, other than my spouse or children, that I feel close with and could talk about private matters or call upon for help
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('socialRelationships')}>reset</button>
        </div>

        {/* Meaning in Life */}
        <div className="survey-section">
          <h3>Meaning in life:</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="meaningInLife"
                value="struggle"
                checked={formData.meaningInLife === 'struggle'}
                onChange={handleChange}
              />
              I often struggle to find value or purpose in my life
            </label>
            <label>
              <input
                type="radio"
                name="meaningInLife"
                value="meaningful"
                checked={formData.meaningInLife === 'meaningful'}
                onChange={handleChange}
              />
              I generally feel that my life has meaning and/or purpose
            </label>
          </div>
          <button type="button" className="reset-btn" onClick={() => handleReset('meaningInLife')}>reset</button>
        </div>

        <button type="submit" className="submit-btn">Submit Survey</button>
      </form>
    </div>
  );
};

export default HealthSurvey;
