const EEventsTypes = {
  WebEditor: 1,
  Credentials: 2,
  Bus: 3
}

class WebEditorEvent {
  eventType = EEventsTypes.WebEditor;

  constructor(lineIndex, symbIndex, symbVal) {
    this.lineIndex = lineIndex;
    this.symbIndex = symbIndex;
    this.symbVal = symbVal;
  }
}

class CredentialsEvent {
  eventType = EEventsTypes.Credentials;

  constructor(username, password, fileURLPreffix) {
    this.username = username;
    this.password = password;
    this.fileURLPreffix = fileURLPreffix;
  }
}

export class BusEvent {
  eventType = EEventsTypes.Bus;

  constructor(fileURL, fileVal) {
    this.fileURL = fileURL;
    this.fileVal = fileVal;
  }
}

export class EventBus {
  events = [];
  subscribersWindowKeys = [];
  timeout = null;

  constructor() {
    if (!localStorage.events) {
      localStorage.events = JSON.stringify([]);
    }
  }

  subscribe(windowAPIObjectKey) {
    this.subscribersWindowKeys.push(windowAPIObjectKey);
  }

  publish(e) {
    if (e instanceof BusEvent) {
      this.events = [e];

      if (this.timeout !== null) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {
        for (let subscriberKey of this.subscribersWindowKeys) {
          for (let e of this.events) {
            window[subscriberKey].receiveEvent(e)
          }
        }
      }, 4000); // debounce
    }
  }
}