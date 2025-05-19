import React from 'react';

const SKILL_TAXONOMY = {
  // Core programming and scripting languages
  'Programming Languages': [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Ruby',
    'PHP', 'Swift', 'Kotlin', 'Rust', 'Scala', 'R', 'Dart'
  ],

  // Libraries, frameworks, backend/frontend runtimes
  'Tools & Frameworks': [
    'React', 'Angular', 'Vue.js', 'Svelte', 'Node.js', 'Express', 'Django',
    'Flask', 'Spring Boot', 'Laravel', 'Ruby on Rails', 'TensorFlow', 'PyTorch',
    'Keras', 'Scikit-Learn', 'GraphQL', 'REST', 'gRPC', 'Webpack', 'Babel'
  ],

  // Cloud, infrastructure, containerization, orchestration
  'Cloud & Infrastructure': [
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform',
    'Ansible', 'Chef', 'Puppet', 'OpenStack', 'Vagrant', 'Serverless Framework'
  ],

  // Continuous integration, delivery, version control
  'DevOps & CI/CD': [
    'Jenkins', 'Travis CI', 'CircleCI', 'GitHub Actions', 'GitLab CI',
    'Bitbucket Pipelines', 'Git', 'SVN', 'Mercurial'
  ],

  // Data storage, processing, analytics platforms
  'Data & Analytics': [
    'MySQL', 'PostgreSQL', 'SQLite', 'Oracle', 'MongoDB', 'Redis',
    'Cassandra', 'Elasticsearch', 'Hadoop', 'Spark', 'Kafka', 'Airflow',
    'Tableau', 'Power BI', 'QlikView', 'D3.js'
  ],

  // Machine learning, AI, deep learning, MLOps
  'Emerging Technologies & AI/ML': [
    'Machine Learning', 'Deep Learning', 'AI', 'Natural Language Processing',
    'Computer Vision', 'Reinforcement Learning', 'Hugging Face Transformers',
    'MLOps', 'ONNX', 'AWS SageMaker'
  ],

  // Security tools, practices, compliance
  'Security & Compliance': [
    'Penetration Testing', 'Ethical Hacking', 'Vulnerability Assessment',
    'SIEM', 'Firewalls', 'IDS/IPS', 'TLS/SSL', 'Nmap', 'Wireshark',
    'OAuth', 'DevSecOps'
  ],

  // UX, design, prototyping, accessibility
  'Design & UX/UI': [
    'Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator', 'InDesign',
    'Wireframing', 'Prototyping', 'User Research', 'Accessibility (WCAG)',
    'Interaction Design'
  ],

  // Methodologies, processes, architecture patterns
  'Methodologies & Practices': [
    'Agile', 'Scrum', 'Kanban', 'DevOps Culture', 'Site Reliability Engineering',
    'Microservices', 'Event-Driven Architecture', 'Test-Driven Development',
    'Behavior‐Driven Development'
  ],

  // Interpersonal, leadership, collaboration
  'Soft Skills': [
    'Communication', 'Teamwork', 'Leadership', 'Problem Solving',
    'Critical Thinking', 'Time Management', 'Adaptability', 'Creativity',
    'Stakeholder Management'
  ],

  // Professional certifications and credentials
  'Certifications': [
    'AWS Certified Solutions Architect', 'Microsoft Azure Fundamentals',
    'Google Cloud Professional Cloud Architect', 'Certified Scrum Master (CSM)',
    'Project Management Professional (PMP)', 'Cisco CCNA',
    'CompTIA Security+', 'Certified Ethical Hacker (CEH)'
  ]
};


function classifySkill(skill) {
  for (const [category, skills] of Object.entries(SKILL_TAXONOMY)) {
    if (skills.map(s => s.toLowerCase()).includes(skill.toLowerCase())) {
      return category;
    }
  }
  
  return 'Other';
}


function groupSkills(skills) {
  
  const grouped = {};
  Object.keys(SKILL_TAXONOMY).forEach(category => {
    grouped[category] = [];
  });
  grouped['Other'] = [];

  skills.forEach(skill => {
    const category = classifySkill(skill);
    if (!grouped[category]) {
      grouped['Other'].push(skill);
    } else {
      grouped[category].push(skill);
    }
  });
  return grouped;
}


function Results({ skills }) {
  if (!skills || skills.length === 0) {
    return <div className="results-card"><p>No skills found.</p></div>;
  }

  const grouped = groupSkills(skills);

  return (
    <div className="results-card">
      <h2>Extracted Skills:</h2>
      <br></br>
      <hr></hr>
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