export const EEventsTypes = {
  WebEditor: 1,
  Credentials: 2,
  Bus: 3,
  Save: 4
}

export class EEvent {
  /**
   * @param {string} issuerAPIKey 
   * @param {number} eventType
   */
  constructor(issuerAPIKey, eventType) {
    this.issuerAPIKey = issuerAPIKey;
    this.eventType = eventType;
  }
}

export class WebEditorEvent extends EEvent {
  /**
   * @param {string} issuerAPIKey
   * @param {number} lineIndex 
   * @param {number} symbIndex 
   * @param {string} symbVal 
   */
  constructor(issuerAPIKey, lineIndex, symbIndex, symbVal) {
    super(issuerAPIKey, EEventsTypes.WebEditor);

    this.lineIndex = lineIndex;
    this.symbIndex = symbIndex;
    this.symbVal = symbVal;
  }
}

export class CredentialsEvent extends EEvent {
  /**
   * @param {string} issuerAPIKey
   * @param {string} username 
   * @param {string} password 
   * @param {string} fileURLPrefix 
   */
  constructor(issuerAPIKey, username, password, fileURLPrefix) {
    super(issuerAPIKey, EEventsTypes.Credentials);

    this.username = username;
    this.password = password;
    this.fileURLPrefix = fileURLPrefix;
  }
}

export class SaveEvent extends EEvent {
  /**
   * @param {string} issuerAPIKey 
   */
  constructor(issuerAPIKey) {
    super(issuerAPIKey, EEventsTypes.Save);
  }
}

export class BusEvent extends EEvent {
  /**
   * @param {string} issuerAPIKey
   * @param {string} fileURL 
   * @param {string} fileVal 
   */
  constructor(issuerAPIKey, fileURL, fileVal) {
    super(issuerAPIKey, EEventsTypes.Bus);

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
    console.log(apiKey);
    if (this.subscribersAPIKeys.indexOf(apiKey) === -1) {
      this.subscribersAPIKeys.push(apiKey);
    }
  }

  /**
   * @param {BusEvent | CredentialsEvent | WebEditorEvent | SaveEvent} apiKey 
   */
  publish(e) {
    this.events = [e];
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }

    console.log('>> Got an event:');
    console.log(e);
    console.log('');

    this.timeout = setTimeout(() => {
      for (let i = 0; i < this.subscribersAPIKeys.length; ++i) {
        for (let j = 0; j < this.events.length; ++j) {
          if (this.events[j].eventType === EEventsTypes.Bus) {
            this.events[j].fileURL = this.fileURL;
          }

          if (this.events[j].issuerAPIKey !== this.subscribersAPIKeys[i]) {
            console.log(`<< Sending an event of type=${this.events[j].eventType} issued by ${this.events[j].issuerAPIKey} to:`);
            console.log(this.subscribersAPIKeys[i]);

            this.apiObj[this.subscribersAPIKeys[i]].receiveEvent(this.events[j]);
          }
        }
      }
    }, 2000); // debounce
  }
}