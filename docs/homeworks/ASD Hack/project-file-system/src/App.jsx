import React, { useState, useEffect } from 'lib-app/react';
import { Octokit } from 'lib-app/octokit';
import { Buffer } from 'lib-app/buffer';
import { getCredentials, SetupProjectFS } from './ProjectFS';
import { parseGitHubFileURL } from './parseGitHubURL';
import './App.css';

export default function App() {
    // SetupProjectFS()

    const [experimentFile, setExperimentFile] = useState('');
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [fileURLPrefix, setFileURLPrefix] = useState('');
    const [error, setError] = useState('');
    const [sha, setSha] = useState('');

    // Update credentials when they change
    useEffect(() => {
        const checkCredentials = () => {
            const { username: newUsername, token: newToken, fileURLPrefix: newFileURLPrefix } = getCredentials();
            if (newUsername !== username) setUsername(newUsername);
            if (newToken !== token) setToken(newToken);
            if (newFileURLPrefix !== fileURLPrefix) setFileURLPrefix(newFileURLPrefix);
        };

        checkCredentials();
        const interval = setInterval(checkCredentials, 1000);
        return () => clearInterval(interval);
    }, [username, token, fileURLPrefix]);

    const handleFileContentChange = (event) => {
        setExperimentFile(event.target.value);
    };

    const fetchFileContent = async () => {
        try {
            setError('');
            const octokit = new Octokit({
                auth: token
            });

            const parsed = parseGitHubFileURL(fileURLPrefix);

            if (!parsed) {
                setError('Invalid GitHub file URL.');
                return;
            }

            const { owner, repoName, branch, path } = parsed;

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

            const parsed = parseGitHubFileURL(fileURLPrefix);
            if (!parsed) {
                setError('Invalid GitHub file URL.');
                return;
            }

            const { owner, repoName, branch, path } = parsed;

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
                        readOnly
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
                        readOnly
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="fileURLPrefix">Git File URL:</label>
                    <input
                        id="fileURLPrefix"
                        type="text"
                        value={fileURLPrefix}
                        onChange={(e) => setFileURLPrefix(e.target.value)}
                        placeholder="https://github.com/dr0p-table-users/experiment-test/blob/main/experiment.yaml"
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
