import React, { useState } from 'react';

function Upload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf,.txt" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={!file}>Upload and Extract Skills</button>
    </div>
  );
}

export default Upload;