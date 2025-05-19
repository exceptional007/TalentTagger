import React, { useState } from 'react';

const STACK_ROLES = ["Frontend Developer", "Backend Developer", "Fullstack Developer"];

const ROLE_SKILLS = {
  "Frontend Developer": {
    stacks: {
      "React": {
        core: ["HTML", "CSS", "JavaScript", "React"],
        optional: ["Redux", "TypeScript", "Figma", "Git"],
        advanced: ["Webpack", "GraphQL", "Jest"]
      },
      "Vue": {
        core: ["HTML", "CSS", "JavaScript", "Vue.js"],
        optional: ["Vuex", "TypeScript", "Figma", "Git"],
        advanced: ["Webpack", "Jest"]
      }
    }
  },
  "Backend Developer": {
  stacks: {
    "Node.js + Express": {
      core: ["Node.js", "Express", "JavaScript", "REST APIs"],
      optional: ["TypeScript", "MongoDB", "JWT", "Git"],
      advanced: ["GraphQL", "Docker", "CI/CD", "AWS"]
    },
    "Java + Spring Boot": {
      core: ["Java", "Spring Boot", "REST APIs", "SQL"],
      optional: ["Hibernate", "JPA", "Git", "JUnit"],
      advanced: ["Docker", "CI/CD", "Kafka", "AWS"]
    },
    "Python + Django": {
      core: ["Python", "Django", "SQL", "REST APIs"],
      optional: ["Django REST Framework", "Celery", "Git"],
      advanced: ["Docker", "CI/CD", "AWS", "GraphQL"]
    },
    "Python + Flask": {
      core: ["Python", "Flask", "REST APIs", "SQL"],
      optional: ["JWT", "Flask-RESTful", "Git"],
      advanced: ["Docker", "CI/CD", "AWS"]
    },
    "Ruby on Rails": {
      core: ["Ruby", "Rails", "ActiveRecord", "REST APIs"],
      optional: ["RSpec", "Git", "PostgreSQL"],
      advanced: ["Docker", "CI/CD", "AWS"]
    },
    "Go (Golang)": {
      core: ["Go", "Gin/Gorilla", "REST APIs", "SQL/NoSQL"],
      optional: ["gRPC", "JWT", "Git"],
      advanced: ["Docker", "CI/CD", "Kubernetes", "AWS"]
    },
    "PHP + Laravel": {
      core: ["PHP", "Laravel", "MySQL", "REST APIs"],
      optional: ["Blade", "Eloquent ORM", "Git"],
      advanced: ["Docker", "CI/CD", "AWS"]
    }
   }
  },
  "Fullstack Developer": {
    stacks: {
      "MERN": {
        core: ["MongoDB", "Express", "React", "Node.js"],
        optional: ["Redux", "TypeScript", "Jest", "Git"],
        advanced: ["Docker", "GraphQL", "AWS", "CI/CD"]
      },
      "MEAN": {
        core: ["MongoDB", "Express", "Angular", "Node.js"],
        optional: ["TypeScript", "Jest", "Git"],
        advanced: ["Docker", "GraphQL", "AWS", "CI/CD"]
      },
      "Django + React": {
        core: ["Django", "React", "Python", "JavaScript"],
        optional: ["Redux", "TypeScript", "Git"],
        advanced: ["Docker", "AWS", "CI/CD"]
      }
    }
  },
  "Mobile Developer (iOS)": [
    "Swift", "Objective-C", "Xcode", "UIKit", "Core Data",
    "SwiftUI", "RESTful APIs", "Git", "CocoaPods", "Unit Testing"
  ],
  "Mobile Developer (Android)": [
    "Kotlin", "Java", "Android Studio", "Jetpack Compose",
    "XML Layouts", "Room", "Retrofit", "Git", "Gradle", "Unit Testing"
  ],
  "DevOps Engineer": [
    "Linux", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Terraform",
    "Ansible", "AWS", "Azure", "GCP", "Monitoring (Prometheus/ELK)",
    "Git", "Scripting (Bash/Python)"
  ],
  "Site Reliability Engineer": [
    "Reliability Engineering", "Kubernetes", "Terraform",
    "Monitoring & Alerting", "Prometheus", "Grafana",
    "Incident Response", "Chaos Engineering", "Git", "Python"
  ],
  "Cloud Architect": [
    "AWS", "Azure", "GCP", "Cloud Security", "Networking",
    "IaC (Terraform/CloudFormation)", "Microservices",
    "Containers", "Serverless", "Git", "Cost Optimization"
  ],
  "Data Analyst": [
    "Excel", "SQL", "Python", "R", "Tableau", "Power BI",
    "Data Cleaning", "Statistics", "Data Visualization",
    "Business Acumen", "Git"
  ],
  "Data Scientist": [
    "Python", "R", "SQL", "Machine Learning",
    "TensorFlow", "PyTorch", "Statistics", "Data Visualization",
    "Big Data (Hadoop/Spark)", "Feature Engineering", "Git"
  ],
  "Machine Learning Engineer": [
    "Python", "TensorFlow", "PyTorch", "Scikit-Learn",
    "Model Deployment", "Docker", "Kubernetes", "CI/CD",
    "AWS SageMaker", "Feature Engineering", "Git"
  ],
  "AI Engineer": [
    "Deep Learning", "Natural Language Processing",
    "Computer Vision", "TensorFlow", "PyTorch",
    "Large Language Models", "API Integration",
    "Docker", "Kubernetes", "Git"
  ],
  "Blockchain Developer": [
    "Solidity", "Ethereum", "Smart Contracts",
    "Web3.js", "Truffle", "Ganache", "IPFS",
    "Cryptography", "Node.js", "Git"
  ],
  "Game Developer": [
    "Unity", "Unreal Engine", "C#", "C++",
    "3D Math/Physics", "Shader Programming",
    "Version Control", "Agile", "Git"
  ],
  "Embedded Systems Engineer": [
    "C", "C++", "Embedded Linux", "RTOS",
    "Microcontrollers (ARM)", "Hardware Interfaces",
    "Debugging Tools", "Git"
  ],
  "IoT Engineer": [
    "Embedded C", "Python", "MQTT", "AWS IoT",
    "Azure IoT Hub", "Edge Computing", "Sensors",
    "Networking", "Git"
  ],
  "Security Engineer": [
    "Network Security", "Penetration Testing",
    "Vulnerability Assessment", "SIEM",
    "Firewalls", "IDS/IPS", "Cryptography",
    "AWS Security", "DevSecOps", "Git"
  ],
  "Cybersecurity Analyst": [
    "Threat Hunting", "SIEM", "IDS/IPS",
    "Incident Response", "Forensics", "NIST",
    "Risk Assessment", "Python", "Git"
  ],
  "QA Engineer": [
    "Test Automation (Selenium, Cypress)",
    "Test Planning", "API Testing", "Performance Testing",
    "JIRA", "Git", "Agile"
  ],
  "UX/UI Designer": [
    "Figma", "Sketch", "Adobe XD", "User Research",
    "Wireframing", "Prototyping", "Interaction Design",
    "Visual Design", "CSS/HTML Basics", "Accessibility"
  ],
  "Product Manager": [
    "Roadmapping", "User Stories", "Stakeholder Management",
    "Agile/Scrum", "Analytics", "Wireframing",
    "Market Research", "JIRA", "Communication"
  ],
  "Project Manager": [
    "Project Planning", "Risk Management",
    "Budgeting", "MS Project", "Agile & Waterfall",
    "Stakeholder Management", "Communication",
    "JIRA", "Scrum Master"
  ],
  "Business Analyst": [
    "Requirements Gathering", "UML",
    "Process Modeling", "SQL", "Excel",
    "Stakeholder Management", "Communication",
    "JIRA"
  ],
  "Scrum Master": [
    "Scrum Framework", "Facilitation",
    "Coaching", "JIRA", "Conflict Resolution",
    "Agile Metrics", "Communication"
  ],
  "IT Support Specialist": [
    "Troubleshooting", "Help Desk Software",
    "Windows/Mac/Linux", "Networking",
    "Active Directory", "Customer Service"
  ],
  "Database Administrator": [
    "SQL", "NoSQL", "Performance Tuning",
    "Backup & Recovery", "Replication",
    "Security", "AWS RDS", "Git"
  ],
  "Network Engineer": [
    "Routing & Switching", "Cisco IOS",
    "Firewalls", "VPN", "Wi-Fi",
    "Network Design", "Monitoring Tools"
  ]
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSkillsFromJD(jdText) {
  const allSkills = [];
  Object.values(ROLE_SKILLS).forEach(role => {
    if (role.stacks) {
      Object.values(role.stacks).forEach(stack => {
        allSkills.push(...stack.core, ...stack.optional, ...stack.advanced);
      });
    } else if (Array.isArray(role)) {
      allSkills.push(...role);
    }
  });
  const uniqueSkills = Array.from(new Set(allSkills));
  return uniqueSkills.filter(skill =>
    new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i').test(jdText)
  );
}

function SkillMatch({ resumeSkills = [] }) {
  const [mode, setMode] = useState('role'); 
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStack, setSelectedStack] = useState('');
  const [jdText, setJdText] = useState('');
  const [matchedSkills, setMatchedSkills] = useState({ core: [], optional: [], advanced: [], flat: [] });
  const [missingSkills, setMissingSkills] = useState({ core: [], optional: [], advanced: [], flat: [] });
  const [score, setScore] = useState(null);
  const [showAllStacks, setShowAllStacks] = useState(false);

  const roleObj = selectedRole ? ROLE_SKILLS[selectedRole] : null;
  const isStackRole = STACK_ROLES.includes(selectedRole) && roleObj && typeof roleObj === 'object' && roleObj.stacks;
  const stacks = isStackRole ? Object.keys(roleObj.stacks) : [];

  const handleRoleSelect = (e) => {
    setSelectedRole(e.target.value);
    setSelectedStack('');
    setJdText('');
    setScore(null);
    setMatchedSkills({ core: [], optional: [], advanced: [], flat: [] });
    setMissingSkills({ core: [], optional: [], advanced: [], flat: [] });
  };

  const handleStackSelect = (e) => {
    setSelectedStack(e.target.value);
    setScore(null);
    setMatchedSkills({ core: [], optional: [], advanced: [], flat: [] });
    setMissingSkills({ core: [], optional: [], advanced: [], flat: [] });
  };

  const handleJDChange = (e) => {
    setJdText(e.target.value);
    setSelectedRole('');
    setSelectedStack('');
    setScore(null);
    setMatchedSkills({ core: [], optional: [], advanced: [], flat: [] });
    setMissingSkills({ core: [], optional: [], advanced: [], flat: [] });
  };

  const handleCompare = () => {
    const normalizedResumeSkills = resumeSkills.map(s => s.toLowerCase());

  
    if (mode === 'role' && isStackRole) {
      let required = { core: [], optional: [], advanced: [] };
      if (showAllStacks) {
        // All stacks combined
        const allStacks = Object.values(roleObj.stacks);
        required = {
          core: Array.from(new Set(allStacks.flatMap(s => s.core))),
          optional: Array.from(new Set(allStacks.flatMap(s => s.optional))),
          advanced: Array.from(new Set(allStacks.flatMap(s => s.advanced)))
        };
      } else if (selectedStack) {
        const stack = roleObj.stacks[selectedStack];
        required = {
          core: stack.core,
          optional: stack.optional,
          advanced: stack.advanced
        };
      } else {
        setMatchedSkills({ core: [], optional: [], advanced: [], flat: [] });
        setMissingSkills({ core: [], optional: [], advanced: [], flat: [] });
        setScore(null);
        return;
      }

      const matchCategory = (arr) =>
        arr.filter(skill => normalizedResumeSkills.includes(skill.toLowerCase()));
      const missingCategory = (arr) =>
        arr.filter(skill => !normalizedResumeSkills.includes(skill.toLowerCase()));

      setMatchedSkills({
        core: matchCategory(required.core),
        optional: matchCategory(required.optional),
        advanced: matchCategory(required.advanced)
      });
      setMissingSkills({
        core: missingCategory(required.core),
        optional: missingCategory(required.optional),
        advanced: missingCategory(required.advanced)
      });

      setScore(required.core.length
        ? Math.round((matchCategory(required.core).length / required.core.length) * 100)
        : 0
      );
    }

    else if (mode === 'jd' && jdText) {
      const required = extractSkillsFromJD(jdText);
      const matched = required.filter(skill => normalizedResumeSkills.includes(skill.toLowerCase()));
      const missing = required.filter(skill => !normalizedResumeSkills.includes(skill.toLowerCase()));
      setMatchedSkills({ flat: matched });
      setMissingSkills({ flat: missing });
      setScore(required.length ? Math.round((matched.length / required.length) * 100) : 0);
    }
    
    else if (mode === 'role' && selectedRole && Array.isArray(roleObj)) {
      const required = roleObj;
      const matched = required.filter(skill => normalizedResumeSkills.includes(skill.toLowerCase()));
      const missing = required.filter(skill => !normalizedResumeSkills.includes(skill.toLowerCase()));
      setMatchedSkills({ flat: matched });
      setMissingSkills({ flat: missing });
      setScore(required.length ? Math.round((matched.length / required.length) * 100) : 0);
    }
  };

  return (
    <div className="skill-match-card">
      <h2>Skill Match Score (Resume Benchmarking)</h2>
      <div className="skill-match-mode">
        <button
          className={mode === 'role' ? 'active' : ''}
          onClick={() => { setMode('role'); setScore(null); setMatchedSkills({ core: [], optional: [], advanced: [], flat: [] }); setMissingSkills({ core: [], optional: [], advanced: [], flat: [] }); }}
        >Select Role</button>
        <div className="or-divider">or</div>
        <button
          className={mode === 'jd' ? 'active' : ''}
          onClick={() => { setMode('jd'); setScore(null); setMatchedSkills({ core: [], optional: [], advanced: [], flat: [] }); setMissingSkills({ core: [], optional: [], advanced: [], flat: [] }); }}
        >Paste Job Description</button>
      </div>

      {mode === 'role' && (
        <>
          <div className="role-select">
            <select value={selectedRole} onChange={handleRoleSelect}>
              <option value="">Choose a role...</option>
              {Object.keys(ROLE_SKILLS).map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          {isStackRole && !showAllStacks && (
            <div className="stack-select">
              <select value={selectedStack} onChange={handleStackSelect}>
                <option value="">Choose a stack...</option>
                {stacks.map(stack => (
                  <option key={stack} value={stack}>{stack}</option>
                ))}
              </select>
            </div>
          )}
          {isStackRole && (
            <div style={{ margin: '10px 0' }}>
              <label>
                <input
                  type="checkbox"
                  checked={showAllStacks}
                  onChange={e => { setShowAllStacks(e.target.checked); setSelectedStack(''); setScore(null); }}
                  disabled={!selectedRole}
                />
                Show missing skills across all stacks?
              </label>
            </div>
          )}
        </>
      )}
      {mode === 'jd' && (
        <div className="jd-paste">
          <textarea
            placeholder="Paste job description here..."
            value={jdText}
            onChange={handleJDChange}
            rows={5}
          />
        </div>
      )}
      <button
        className="compare-btn"
        onClick={handleCompare}
        disabled={
          (mode === 'role' && !selectedRole) ||
          (mode === 'role' && isStackRole && !showAllStacks && !selectedStack) ||
          (mode === 'jd' && !jdText.trim())
        }
      >
        Compare Skills
      </button>
      {score !== null && (
        <div className="skill-match-result">
          <div className="score-bar">
            <span className="score-label">🎯<b> Core Stack Match: </b></span>
            <span className="score-value">{score}%</span>
          </div>
          <hr></hr>
          {/* Stack-aware display */}
          {isStackRole ? (
            <>
              <div className="matched">
                <span>✅ <b>Core Stack:  </b></span>
                <span>{matchedSkills.core.length ? matchedSkills.core.join(', ') : 'None'}</span>
              </div>
              <div className="matched">
                <span>🟡 <b>Optional Tools:  </b></span>
                <span>{matchedSkills.optional.length ? matchedSkills.optional.join(', ') : 'None'}</span>
              </div>
              <div className="matched">
                <span>🔴 <b>Advanced/Bonus: </b></span>
                <span>{matchedSkills.advanced.length ? matchedSkills.advanced.join(', ') : 'None'}</span>
              </div>
              <hr></hr>
              <div className="missing">
                <span>❌ <b>Missing Core: </b></span>
                <span>{missingSkills.core.length ? missingSkills.core.join(', ') : 'None'}</span>
              </div>
              <div className="missing">
                <span>🟡 <b>Missing Optional: </b></span>
                <span>{missingSkills.optional.length ? missingSkills.optional.join(', ') : 'None'}</span>
              </div>
              <div className="missing">
                <span>🔴 <b>Missing Advanced: </b></span>
                <span>{missingSkills.advanced.length ? missingSkills.advanced.join(', ') : 'None'}</span>
              </div>
            </>
          ) : (
            <>
              <div className="matched">
                <span>✅ Matched:</span>
                <span>{matchedSkills.flat.length ? matchedSkills.flat.join(', ') : 'None'}</span>
              </div>
              <div className="missing">
                <span>❌ Missing:</span>
                <span>{missingSkills.flat.length ? missingSkills.flat.join(', ') : 'None'}</span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillMatch;