export const EEventsTypes = {
  WebEditor: 1,
  Credentials: 2,
  Bus: 3,
  Save: 4
}

export class WebEditorEvent {
  eventType = EEventsTypes.WebEditor;

  /**
   * @param {number} lineIndex 
   * @param {number} symbIndex 
   * @param {string} symbVal 
   */
  constructor(lineIndex, symbIndex, symbVal) {
    this.lineIndex = lineIndex;
    this.symbIndex = symbIndex;
    this.symbVal = symbVal;
  }
}

export class CredentialsEvent {
  eventType = EEventsTypes.Credentials;

  /**
   * @param {string} username 
   * @param {string} password 
   * @param {string} fileURLPrefix 
   */
  constructor(username, password, fileURLPrefix) {
    this.username = username;
    this.password = password;
    this.fileURLPrefix = fileURLPrefix;
  }
}

export class SaveEvent {
  eventType = EEventsTypes.Save;

  constructor() { }
}

export class BusEvent {
  eventType = EEventsTypes.Bus;

  /**
   * @param {string} fileURL 
   * @param {string} fileVal 
   */
  constructor(fileURL, fileVal) {
    this.fileURL = fileURL;
    this.fileVal = fileVal;
  }
}

export class EventBus {
  events = [];
  subscribersAPIKeys = [];
  timeout = null;
  fileURL = '';

  /**
   * @param {Record<string, { receiveEvent: (e: BusEvent | CredentialsEvent | WebEditorEvent | SaveEvent) => void}>} apiObj
   * @param {string} fileURL
   */
  constructor(apiObj) {
    this.apiObj = apiObj;

    if (!localStorage.events) {
      localStorage.events = JSON.stringify([]);
    } else {
      this.events = JSON.parse(localStorage.events);
    }
  }

  /**
   * @param {string} apiKey 
   */
  subscribe(apiKey) {
    this.subscribersAPIKeys.push(apiKey);
  }

  /**
   * @param {BusEvent | CredentialsEvent | WebEditorEvent | SaveEvent} apiKey 
   */
  publish(e) {
    this.events = [e];

    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      for (let i = 0; i < this.subscribersAPIKeys.length; ++i) {
        for (let j = 0; j < this.events.length; ++j) {
          if (this.events[i].eventType === EEventsTypes.Bus) {
            this.events[i].fileURL = this.fileURL;
          }

          this.apiObj[this.subscribersAPIKeys[i]].receiveEvent(this.events[i]);
        }
      }
    }, 4000); // debounce
  }
}