const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: "https://effulgent-bombolone-8da271.netlify.app/",
  credentials: true
}));

app.get('/', (req, res) => res.send('Backend working'));

const upload = multer({ storage: multer.memoryStorage() });

const skillsList = [
  // Core Languages & Paradigms
  "javascript", "typescript", "python", "java", "c", "c++", "c#", "go", "rust", "ruby", "php",
  "swift", "kotlin", "scala", "perl", "matlab", "r", "dart", "elixir",

  // Front-end Frameworks & UI
  "html", "css", "sass", "less", "bootstrap", "tailwind", "material ui",
  "react", "vue.js", "angular", "svelte", "ember.js", "jquery",
  "react native", "flutter", "ionic", "electron",

  // Back-end & APIs
  "node.js", "express", "spring boot", "django", "flask", "ruby on rails", "laravel",
  "graphql", "rest", "soap", "grpc", "prisma", "typeorm",

  // Databases & Data Stores
  "sql", "mysql", "postgresql", "sqlite", "oracle", "mariadb",
  "nosql", "mongodb", "redis", "cassandra", "couchdb", "elasticsearch",
  "firebase", "dynamodb", "neo4j", "cockroachdb",

  // DevOps & Infrastructure
  "git", "github", "gitlab", "bitbucket", "svn",
  "docker", "kubernetes", "docker swarm", "terraform", "ansible", "chef", "puppet",
  "jenkins", "travis ci", "circle ci", "github actions", "azure devops",
  "aws", "azure", "google cloud", "digitalocean", "heroku", "openstack",
  "vmware", "vagrant",

  // Monitoring & Observability
  "prometheus", "grafana", "elk stack", "splunk", "new relic", "datadog",
  "nagios", "zabbix", "apm", "logstash", "kibana",

  // Testing & Quality
  "junit", "pytest", "mocha", "jest", "cypress", "selenium", "playwright",
  "jmeter", "postman", "soapui",
  "tdd", "bdd", "unit testing", "integration testing", "performance testing",

  // Methodologies & Processes
  "agile", "scrum", "kanban", "waterfall", "lean", "devsecops", "sre",
  "microservices", "monolithic architecture", "soa", "event-driven architecture",

  // Cloud-Native & Serverless
  "lambda", "azure functions", "google cloud functions",
  "serverless framework", "cloudflare workers", "faas",

  // Data, Analytics & BI
  "excel", "power bi", "tableau", "qlikView",
  "data science", "data engineering", "etl", "big data",
  "hadoop", "spark", "kafka", "airflow", "dbt",
  "statistics", "probability", "data visualization", "d3.js",

  // AI / ML / DL
  "machine learning", "deep learning", "ai", "tensorflow", "pytorch", "keras",
  "scikit-learn", "xgboost", "lightgbm", "hugging face", "nlp", "computer vision",
  "reinforcement learning", "mlops", "model drift", "onnx",

  // Security & Networking
  "cybersecurity", "ethical hacking", "penetration testing", "vulnerability assessment",
  "nmap", "wireshark", "burp suite", "metasploit",
  "network security", "firewalls", "vpn", "tls", "ssl", "ids/ips",

  // Blockchain & Web3
  "blockchain", "ethereum", "smart contracts", "solidity", "web3.js", "truffle",
  "hardhat", "ipfs", "defi", "nft",

  // IoT & Embedded
  "iot", "embedded systems", "arduino", "raspberry pi", "mqtt", "zigbee",
  "edge computing", "rtos", "bare-metal programming",

  // AR/VR & Game Dev
  "unity", "unreal engine", "c# (unity)", "c++ (unreal)", "three.js",
  "xr", "vr", "ar", "oculus sdk", "openxr",

  // Design & UX/UI
  "figma", "sketch", "adobe xd", "photoshop", "illustrator", "indesign",
  "wireframing", "prototyping", "user research", "accessibility", "usability testing",

  // Mobile & Desktop
  "android studio", "xcode", "jetpack compose", "swiftui", "uikit",
  "desktop (electron)", "desktop (qt)",

  // Soft Skills & Management
  "communication skills", "team leadership", "project management",
  "stakeholder management", "problem solving", "critical thinking",
  "time management", "conflict resolution", "empathy",

  // Emerging & Miscellaneous
  "quantum computing", "5g", "6g", "digital twins", "robotics", "automation",
  "gis", "spatial analysis", "computer graphics", "media streaming"
];


function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

app.post('/upload', upload.single('resume'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileName = req.file.originalname.toLowerCase();
  let text;

  try {
    if (fileName.endsWith('.pdf')) {
      const data = await pdfParse(req.file.buffer);
      text = data.text;
    } else if (fileName.endsWith('.txt')) {
      text = req.file.buffer.toString('utf8');
    } else {
      return res.status(400).json({ message: 'Unsupported file type' });
    }

    const lowerText = text.toLowerCase();
    const extractedSkills = skillsList.filter(skill => {
      const regex = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i');
      return regex.test(lowerText);
    });

    res.json({ skills: extractedSkills });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing file' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});

