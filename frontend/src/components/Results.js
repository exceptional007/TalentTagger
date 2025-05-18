import React from 'react';

// 1. Define your taxonomy
const SKILL_TAXONOMY = {
  'Programming Languages': [
    'JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'Go', 'Ruby', 'PHP', 'Swift', 'Kotlin', 'Rust', 'Scala'
  ],
  'Tools & Frameworks': [
    'React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel', 'TensorFlow', 'PyTorch', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'Git', 'Jenkins', 'Webpack', 'Babel'
  ],
  'Soft Skills': [
    'Communication', 'Teamwork', 'Leadership', 'Problem Solving', 'Time Management', 'Adaptability', 'Creativity', 'Critical Thinking', 'Collaboration'
  ],
  'Certifications': [
    'AWS Certified Solutions Architect', 'Certified Scrum Master', 'PMP', 'Cisco CCNA', 'Microsoft Certified', 'Google Cloud Certified', 'CompTIA Security+'
  ]
};

// 2. Classify a skill
function classifySkill(skill) {
  for (const [category, skills] of Object.entries(SKILL_TAXONOMY)) {
    if (skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())) {
      return category;
    }
  }
  // Default/fallback
  return 'Other';
}

// 3. Group skills by category
function groupSkills(skills) {
  const grouped = {
    'Programming Languages': [],
    'Tools & Frameworks': [],
    'Soft Skills': [],
    'Certifications': [],
    'Other': []
  };
  skills.forEach(skill => {
    const category = classifySkill(skill);
    grouped[category].push(skill);
  });
  return grouped;
}

// 4. Main component
function Results({ skills }) {
  if (!skills || skills.length === 0) {
    return <div className="results-card"><p>No skills found.</p></div>;
  }

  const grouped = groupSkills(skills);

  return (
    <div className="results-card">
      <h2>Extracted Skills</h2>
      {Object.entries(grouped).map(([category, skills]) =>
        skills.length > 0 ? (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h3>{category}</h3>
            <div className="skills-tags">
              {skills.map(skill => (
                <span className="skill-tag" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default Results;