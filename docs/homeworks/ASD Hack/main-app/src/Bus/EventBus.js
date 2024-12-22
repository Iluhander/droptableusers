class WebEditorEvent {
  constructor(lineIndex, symbIndex, symbVal) {
    this.lineIndex = lineIndex;
    this.symbIndex = symbIndex;
    this.symbVal = symbVal;
  }
}

class CredentialsEvent {
  constructor(username, password, fileURLPreffix) {
    this.username = username;
    this.password = password;
    this.fileURLPreffix = fileURLPreffix;
  }
}

export class BusEvent {
  constructor(fileURL, fileVal) {
    this.fileURL = fileURL;
    this.fileVal = fileVal;
  }
}

export class EventBus {
  events = [];
  subscribers = [];
  timeout = null;

  constructor() {
    if (!localStorage.events) {
      localStorage.events = JSON.stringify([]);
    }
  }

  subscribe(postMessageCallback) {
    this.subscribers.push({ receive: postMessageCallback });
  }

  publish(e) {
    if (e instanceof BusEvent) {
      this.events = [e];

      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        for (let subscriber of this.subscribers) {
          subscriber.receive(e);
        }   
      }, 4000);
    }
  }
}