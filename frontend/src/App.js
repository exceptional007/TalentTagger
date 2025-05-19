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
      {/* --- Navbar --- */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="/logo1.png" alt="Logo" />
          <span>TalentTagger</span>
        </div>
        <div className="navbar-spacer" />
      </nav>

      {/* --- Hero Section --- */}
      <section className="hero">
        <h1>Resume Extractor</h1>
        <p>From Upload to Insight – Instantly</p>

      </section>

  

      {/* --- Main Content --- */}
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

      {/* --- Info Cards Section --- */}
      <section className="info-cards">
        <h2>What’s in it for you?</h2>
        <div className="info-cards-row">
          <div className="info-card">
            <span role="img" aria-label="AI">🤖</span>
            <h3>AI-Powered Parsing</h3>
            <p>Extracts skills and keywords from any resume instantly.</p>
          </div>
          <div className="info-card">
            <span role="img" aria-label="Glass">🧊</span>
            <h3>Modern Glass UI</h3>
            <p>Enjoy a futuristic, elegant, and responsive interface.</p>
          </div>
          <div className="info-card">
            <span role="img" aria-label="Academy">🎓</span>
            <h3>Academy Ready</h3>
            <p>Perfect for students, recruiters, and hackathons.</p>
          </div>
          <div className="info-card">
            <span role="img" aria-label="Lightning">⚡</span>
            <h3>Fast & Secure</h3>
            <p>Your data is processed instantly and securely.</p>
          </div>
        </div>
      </section>

      {/* --- Footer Section --- */}
      <footer className="footer">
        <div className="footer-title">Dr. A. P. J. Abdul Kalam Technical University, Lucknow</div>
        <div className="footer-title">GUVI-HCL Hackathon</div>
        <div className="footer-credits">
          Developed by: Shubham Prajapati, Akshat Srivastava, Krishna Chaturvedi
        </div>
        <div className="footer-copy">
          Resume Skill Extractor - GUVI-HCL Hackathon by APJ Abdul Kalam Technological University
        </div>
      </footer>
    </div>
  );
}

export default App;