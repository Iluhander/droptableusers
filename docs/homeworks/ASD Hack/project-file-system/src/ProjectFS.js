import { fetchFileContent, saveChanges } from './gitActions';

const credentials = {
  username: '',
  token: '',
  fileURLPrefix: '',
};

let fileContent = '';

// Getter function to access credentials
export function getCredentials() {
  return { ...credentials };
}

export function getFileContent() {
  return fileContent;
}

function handleCredentials(username, token, fileURLPrefix) {
  credentials.username = username;
  credentials.token = token;
  credentials.fileURLPrefix = fileURLPrefix;
  console.log('Credentials updated:', credentials);

  fetchFileContent(credentials.token, credentials.fileURLPrefix)
    .then(content => {
      fileContent = content;
      console.log('Fetched File Content:', fileContent);
    })
    .catch(err => {
      console.error('Error fetching file content:', err);
    });
}

function handleFileChanges(fileURLPrefix, fileContents) {
  // if (fileURLPrefix !== credentials.fileURLPrefix) {
    // return;
  // }

  console.log('File updated:', fileContents);
  fileContent = fileContents;
}

function handleSaveChanges() {
  if (!credentials.token || !credentials.fileURLPrefix) {
    console.error('Missing credentials. Cannot save changes.');
    return;
  }

  if (!fileContent) {
    console.error('No file content available to save.');
    return;
  }

  // Invoke the saveChanges function with stored credentials and file content
  saveChanges(credentials.token, credentials.fileURLPrefix, fileContent)
    .then(() => {
      console.log('File saved successfully.');
    })
    .catch(err => {
      console.error('Error saving file:', err);
    });
}

export default function SetupProjectFS() {
  window.bus.subscribe('project-file-system');

  window['project-file-system'] = {
    receiveEvent: (e) => {
      if (e.eventType === 2) {
        handleCredentials(e.username, e.password, e.fileURLPrefix);
      }
      if (e.eventType === 3) {
        handleFileChanges(e.fileURL, e.fileVal);
      }
      if (e.eventType === 4) {
        handleSaveChanges();
      }
    }
  };

  console.log("project-file-system is initialized.");
}
