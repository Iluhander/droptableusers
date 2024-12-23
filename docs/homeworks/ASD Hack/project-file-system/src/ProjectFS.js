import { fetchFileContent } from './gitActions';

const credentials = {
  username: '',
  token: '',
  fileURLPrefix: '',
};

// Getter function to access credentials
export function getCredentials() {
  return { ...credentials };
}

function handleCredentials(username, token, fileURLPrefix) {
  credentials.username = username;
  credentials.token = token;
  credentials.fileURLPrefix = fileURLPrefix;
  console.log('Credentials updated:', credentials);

  fetchFileContent(credentials.token, credentials.fileURLPrefix);
}

export default function SetupProjectFS() {
  window.bus.subscribe('project-file-system');

  window['project-file-system'] = {
    receiveEvent: (e) => {
      if (e.eventType === 2) {
        handleCredentials(e.username, e.password, e.fileURLPrefix);
      }
    }
  };

  console.log("project-file-system is initialized.");
}
