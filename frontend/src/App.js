import axios from 'axios';
import React, { useState } from 'react';
import Upload from './components/upload';
import Results from './components/Results';
import SkillMatch from './components/SkillMatch';
import './App.css';

function App() {
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file) => {
    setIsUploading(true);
    setError(null);
    setSkills(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSkills(response.data.skills);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo1.png" alt="Logo" />
          <span>TalentTagger</span>
        </div>
        <div className="navbar-spacer" />
      </nav>
      <main className="main-content">
        <h1>Resume Skill Extractor</h1>
        {skills === null && !isUploading && (
          <Upload onUpload={handleUpload} />
        )}
        {isUploading && <p className="processing">Processing...</p>}
        {error && <p className="error">{error}</p>}
        {skills && (
          <>
            <Results skills={skills} />
            <SkillMatch resumeSkills={skills} />
          </>
        )}
      </main>
      {/* --- Footer Section --- */}
      <footer className="footer">
        {/* Footer Section */}
        <div className="footer-title">Dr. A. P. J. Abdul Kalam Technical University, Lucknow</div>
        <div className="footer-title">GUVI-HCL Hackathon Project</div>
        <div className="footer-credits">
          Presented by: Shubham Prajapati, Akshat Srivastava, Krishna Chaturvedi
        </div>
        <div className="footer-copy"> GUVI-HCL Hackathon by APJ Abdul Kalam Technological University
        </div>
      </footer>
    </div>
  );
}

export default App;