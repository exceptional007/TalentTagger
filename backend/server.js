const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

const skillsList = [
  "javascript", "react", "node.js", "express", "mongodb", "python", "java", "c++", "c#", "ruby", 
  "php", "swift", "kotlin", "go", "rust", "html", "css", "sass", "less", "bootstrap", "tailwind", 
  "jquery", "angular", "vue.js", "svelte", "sql", "mysql", "postgresql", "sqlite", "oracle", 
  "nosql", "redis", "cassandra", "elasticsearch", "git", "github", "bitbucket", "gitlab", "svn", 
  "docker", "kubernetes", "jenkins", "travis ci", "circle ci", "ansible", "terraform", "aws", 
  "azure", "google cloud", "heroku", "digitalocean", "rest", "graphql", "soap", "agile", "scrum", 
  "kanban", "tdd", "bdd", "machine learning", "deep learning", "ai", "data science", "big data", 
  "hadoop", "spark", "tensorflow", "pytorch", "keras", "unity", "unreal engine", "game development", 
  "cybersecurity", "penetration testing", "ethical hacking", "blockchain", "ethereum", "smart contracts", 
  "iot", "embedded systems", "ui/ux design", "figma", "sketch", "adobe xd", "photoshop", "illustrator", 
  "indesign", "seo", "digital marketing", "content writing", "project management", "team leadership", 
  "communication skills", "problem solving"
];

// Escape special regex characters in skill names
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

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

