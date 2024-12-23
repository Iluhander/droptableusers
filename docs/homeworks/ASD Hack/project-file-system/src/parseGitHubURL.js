export function parseGitHubFileURL(url) {
    try {
      const parsedURL = new URL(url);
      
      if (parsedURL.hostname !== 'github.com') {
        throw new Error('URL is not a GitHub repository URL.');
      }
  
      const pathSegments = parsedURL.pathname.split('/').filter(seg => seg);
  
      if (pathSegments.length < 5 || pathSegments[2] !== 'blob') {
        throw new Error('Invalid GitHub file URL structure.');
      }
  
      const owner = pathSegments[0];
      const repo = pathSegments[1];
      const branch = pathSegments[3];
      const path = pathSegments.slice(4).join('/');
  
      return { owner, repo, branch, path };
    } catch (error) {
      console.error('Error parsing GitHub URL:', error.message);
      return null;
    }
  }
  