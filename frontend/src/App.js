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
    <span><b>Talent Tagger</b></span>
  </div>
  <div className="navbar-links">
    <a href="#extractor">Resume Skill Extractor</a>
    <a href="#features"> Features</a>
    <a href="#howto"> How to Use </a>
    <a href="#footer"> About </a>
  </div>
  <div className="navbar-spacer" />
</nav>

      {/* --- Hero Section --- */}
      <section className="hero">
        <h1>Resume Extractor</h1>
        <p>From Upload to Insight – Instantly</p>

      </section>

  

      {/* --- Main Content --- */}
      <main className="main-content" id="extractor">
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
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>
      {/* --- Info Cards Section --- */}
      <section className="info-cards" id="features">
        <h2>What’s in it for you?</h2>
        <div className="info-cards-row">
          <div className="info-card">
            <span role="img" aria-label="AI">🤖</span>
            <h3>Extract You Skill</h3>
            <p>Extracts skills and keywords from any resume instantly</p>
          </div>
          <div className="info-card">
            <span role="img" aria-label="Glass">🧊</span>
            <h3>Smart Skill Categorization</h3>
            <p>Group extracted skills under categories like: Programming Languages, Tools & Frameworks</p>
          </div>
          <div className="info-card">
            <span role="img" aria-label="Academy">🎓</span>
            <h3>Skill Match Score</h3>
            <p>Compare user’s skills to a selected job role or Job Discription</p>
          </div>
          <div className="info-card">
            <span role="img" aria-label="Lightning">⚡</span>
            <h3>Drag and Drop</h3>
            <p>Simply upload or drag and drop your resume (PDF or TXT)</p>
          </div>
        </div>
      </section>
      <br></br>
      <br></br>
      <hr></hr>
      <br></br>

      {/* --- How to Use Section --- */}
<section className="how-to-use" id="howto">
  <h2>How to Use Talent Tagger</h2>
  <div className="how-to-use-row">
    <div className="how-to-use-card">
      <span role="img" aria-label="Upload">📤</span>
      <h3>1. Upload Resume</h3>
      <p>Click the upload area or drag & drop your PDF/TXT resume file.</p>
    </div>
    <div className="how-to-use-card">
      <span role="img" aria-label="Extract">🧠</span>
      <h3>2. Extract Skills</h3>
      <p>Let us instantly extract and display your skills and keywords.</p>
    </div>
    <div className="how-to-use-card">
      <span role="img" aria-label="Compare">⚖️</span>
      <h3>3. Compare & Benchmark</h3>
      <p>Compare your skills with job roles or paste a job description for a match score.</p>
    </div>
    <div className="how-to-use-card">
      <span role="img" aria-label="Improve">🚀</span>
      <h3>4. Improve & Apply</h3>
      <p>See missing skills, get suggestions, and prepare for your dream job!</p>
    </div>
  </div>
</section>

      <footer className="footer" id="footer">
  <br />
  <div className="footer-title">Dr. A. P. J. Abdul Kalam Technical University, Lucknow</div>
  <div className="footer-title">GUVI-HCL Hackathon</div>
  <br />
  <br></br>
  <br></br>
  <div className="footer-title">Team: Tech Titans Go</div>
  <br></br>
  <div className="footer-credits">
    Developed by:&nbsp;
    <a href="https://www.linkedin.com/in/shubhamprajapati18/" target="_blank" rel="noopener noreferrer">
      Shubham Prajapati
    </a>,&nbsp;
    <a href="https://www.linkedin.com/in/akshhat-srivastava-11a13530b/" target="_blank" rel="noopener noreferrer">
      Akshat Srivastava
    </a>,&nbsp;
    <a href="https://www.linkedin.com/in/krishna-chaturvedi-1ab79822a/" target="_blank" rel="noopener noreferrer">
      Krishna Chaturvedi
    </a>
  </div>
  <br />
  <br></br>
  <br></br>
  <div className="footer-copy">
    Resume Skill Extractor - GUVI-HCL Hackathon by APJ Abdul Kalam Technological University
  </div>
  <br />
  <br />
</footer>
    </div>
  );
}

export default App;