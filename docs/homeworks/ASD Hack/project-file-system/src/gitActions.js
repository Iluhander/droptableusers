import { Octokit } from 'lib-app/octokit';
import { Buffer } from 'lib-app/buffer';
import { parseGitHubFileURL } from './parseGitHubURL';

/**
 * Fetches the content of a GitHub file using Octokit.
 * @param {string} token - GitHub Personal Access Token.
 * @param {string} fileURLPrefix - The GitHub file URL.
 */
export async function fetchFileContent(token, fileURLPrefix) {
    try {
        if (!token) {
            console.error('No GitHub token provided.');
            return;
        }

        if (!fileURLPrefix) {
            console.error('No GitHub file URL provided.');
            return;
        }

        const parsed = parseGitHubFileURL(fileURLPrefix);

        if (!parsed) {
            console.error('Invalid GitHub file URL.');
            return;
        }

        const { owner, repo, branch, path } = parsed;

        const octokit = new Octokit({
            auth: token,
        });

        const response = await octokit.rest.repos.getContent({
            owner,
            repo,
            path,
            ref: branch,
        });

        if (response.data.type !== 'file') {
            console.error('The specified path is not a file.');
            return;
        }

        const content = Buffer.from(response.data.content, 'base64').toString('utf-8');

        function publishBusEvent(fileURL, fileVal) {
            if (window.bus && typeof window.bus.publish === 'function') {
                window.bus.publish({
                    eventType: 3,
                    fileURL: fileURL,
                    fileVal: fileVal,
                });
                console.log('BusEvent published:', { fileURL, fileVal });
            } else {
                console.error('window.bus or publish method is not defined.');
            }
        }

        publishBusEvent(fileURLPrefix, content);

        // Optionally, publish another event with the file content
        // publishBusEvent(fileURLPrefix, content);
        return content;
    } catch (err) {
        console.error('Failed to fetch file content:', err.message);
        throw err;
    }
}

/**
 * Saves changes to a GitHub file.
 * @param {string} token - GitHub Personal Access Token.
 * @param {string} fileURLPrefix - GitHub file URL.
 * @param {string} fileVal - New content to save.
 * @returns {Promise<void>}
 */
export async function saveChanges(token, fileURLPrefix, fileVal) {
    try {
      const parsed = parseGitHubFileURL(fileURLPrefix);
      if (!parsed) {
        throw new Error('Invalid GitHub file URL.');
      }
  
      const { owner, repo, branch, path } = parsed;
  
      const octokit = new Octokit({ auth: token });
  
      // Get the current file SHA (required for updating)
      let sha = null;
      try {
        const getResponse = await octokit.rest.repos.getContent({
          owner,
          repo,
          path,
          ref: branch,
        });
        if (getResponse.data.type === 'file') {
          sha = getResponse.data.sha;
        }
      } catch (err) {
        if (err.status !== 404) {
          throw err; // Rethrow if error is not 404
        }
        // File does not exist; it will be created
      }
  
      // Create or update the file
      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: `Update ${path}`,
        content: Buffer.from(fileVal, 'utf-8').toString('base64'),
        sha, // undefined if creating a new file
        branch,
      });
  
      console.log(`File ${path} has been saved successfully.`);
    } catch (error) {
      console.error('Error saving file:', error.message);
      throw error;
    }
  }