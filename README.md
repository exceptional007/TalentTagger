# TalentTagger - GUVI HCL Hackathon

TalentTagger is a full-stack web application designed for the GUVI HCL Hackathon. It helps users upload resumes, analyzes skills, and matches them with relevant job opportunities.

## Project Structure

```
TalentTagger-GUVI-HCL-Hackathon/
├── backend/        # Node.js/Express backend API
│   ├── package.json
│   └── server.js
├── frontend/       # React frontend
│   ├── package.json
│   ├── public/
│   └── src/
└── README.md       # Project documentation
```

## Features
- Resume upload and parsing
- Skill extraction and matching
- Job recommendations
- Modern React UI

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- npm or yarn

### Backend Setup
1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the backend server:
   ```powershell
   npm start
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000) by default.

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the React development server:
   ```powershell
   npm start
   ```
   The frontend will run on [http://localhost:3000](http://localhost:3000) by default.

## Usage
- Open the frontend URL in your browser.
- Upload a resume to see skill extraction and job matches.

## Folder Details
- `backend/`: Express server, API endpoints, and business logic.
- `frontend/`: React app, UI components, and static assets.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is for educational and hackathon purposes.
