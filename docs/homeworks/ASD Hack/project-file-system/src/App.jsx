import React, { useState } from 'lib-app/react';
import { Octokit } from 'lib-app/octokit';
import { Buffer } from 'lib-app/buffer';
import './App.css';

export default function App() {
  const [experimentFile, setExperimentFile] = useState('');
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [repo, setRepo] = useState('');
  const [path, setPath] = useState('');
  const [error, setError] = useState('');
  const [sha, setSha] = useState('');

  const handleFileContentChange = (event) => {
    setExperimentFile(event.target.value);
  };

  const fetchFileContent = async () => {
    try {
      setError('');
      const octokit = new Octokit({
        auth: token
      });

      const [owner, repoName] = repo.split('/');

      const response = await octokit.rest.repos.getContent({
        owner,
        repo: repoName,
        path,
      });

      setSha(response.data.sha);
      const content = Buffer.from(response.data.content, 'base64').toString();
      setExperimentFile(content);
    } catch (err) {
      setError(err.message || 'Failed to fetch file content');
    }
  };

  const saveChanges = async () => {
    try {
      setError('');
      const octokit = new Octokit({
        auth: token
      });

      const [owner, repoName] = repo.split('/');

      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo: repoName,
        path,
        message: `Update ${path}`,
        content: Buffer.from(experimentFile).toString('base64'),
        sha,
      });

      await fetchFileContent();
    } catch (err) {
      setError(err.message || 'Failed to save changes');
    }
  };

  return (
    <div className="project-fs-container">
      <h3>GitHub File Viewer</h3>
      
      <div className="auth-section">
        <div className="input-group">
          <label htmlFor="username">GitHub Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
        </div>

        <div className="input-group">
          <label htmlFor="token">GitHub Token:</label>
          <input
            id="token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter GitHub personal access token"
          />
        </div>

        <div className="input-group">
          <label htmlFor="repo">Repository:</label>
          <input
            id="repo"
            type="text"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="owner/repository"
          />
        </div>

        <div className="input-group">
          <label htmlFor="path">File Path:</label>
          <input
            id="path"
            type="text"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="path/to/file.txt"
          />
        </div>

        <div className="button-group">
          <button onClick={fetchFileContent} className="fetch-button">
            Fetch File Content
          </button>
          <button 
            onClick={saveChanges} 
            className="save-button"
            disabled={!sha}
          >
            Save Changes
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <textarea
        className="experiment-file-editor"
        value={experimentFile}
        onChange={handleFileContentChange}
        placeholder="File content will appear here..."
      />
    </div>
  );
}
