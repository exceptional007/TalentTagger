import React from 'react';

function Results({ skills }) {
  if (!skills || skills.length === 0) {
    return <div className="results-card"><p>No skills found.</p></div>;
  }

  return (
    <div className="results-card">
      <h2>Extracted Skills</h2>
      <div className="skills-tags">
        {skills.map((skill, idx) => (
          <span className="skill-tag" key={idx}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default Results;