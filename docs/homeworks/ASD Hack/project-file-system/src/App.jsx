import React, { useState } from 'lib-app/react';
import './App.css';

export default function App() {
  const [experimentFile, setExperimentFile] = useState('');

  const handleFileContentChange = (event) => {
    setExperimentFile(event.target.value);
  };

  return (
    <div className="project-fs-container">
      <h3>Experiment File Editor</h3>
      <textarea
        className="experiment-file-editor"
        value={experimentFile}
        onChange={handleFileContentChange}
        placeholder="Enter your experiment file contents here..."
      />
    </div>
  );
}
