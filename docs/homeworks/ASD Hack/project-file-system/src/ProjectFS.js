// Private module-level variable for credentials
const credentials = {
  username: '',
  token: '',
};

// Getter function to access credentials
export function getCredentials() {
  return { ...credentials };
}

function handleCredentials(username, token) {
  credentials.username = username;
  credentials.token = token;
}

export function SetupProjectFS() {
  window.bus.subscribe('project-file-system');

  window['project-file-system'] = {
    receiveEvent: (e) => {
      if (e.eventType === 2) {
        handleCredentials(e.username, e.password);
      }
    }
  };

  console.log("project-file-system is initialized.");
}
