import React, { useRef, useState } from 'react';

function Upload({ onUpload }) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <form
      className={`upload-card drag-drop-zone${dragActive ? ' active' : ''}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onSubmit={e => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt"
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <div
        className="drag-drop-content"
        onClick={() => inputRef.current.click()}
      >
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
          <path stroke="#f59e42" strokeWidth="1.5" d="M12 16V4m0 0l-4 4m4-4l4 4"/>
          <rect x="3" y="12" width="18" height="8" rx="2" stroke="#64748b" strokeWidth="1.5" fill="none"/>
        </svg>
        <p>
          <b>Drag &amp; drop</b> your resume here<br />
          <span>or <span className="upload-link">browse</span> to upload (.pdf, .txt)</span>
        </p>
      </div>
    </form>
  );
}

export default Upload;