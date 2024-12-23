import React from 'lib-app/react';
import Editor from "lib-app/monaco-editor";

export const EEventsTypes = {
  Bus: 3,
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

const apiKey = "editor-api";

export default function WebEditor() {
  const [curVal, setCurVal] = React.useState('');
  const [fileURL, setFileURL] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window[apiKey] = {};
      window[apiKey].receiveEvent = (e) => {
        if (e.eventType === 3) {
          console.log(e);
          setCurVal(e.fileVal);
          setFileURL(e.fileURL);
        }
      };
    }

    window.bus.subscribe(apiKey);
  }, []);

  const onChange = (val) => {
    setCurVal(val);
    window.bus.publish(new BusEvent(apiKey, fileURL, val));
  };

  return (
    <Editor height="100%" defaultLanguage="yaml" value={curVal} onChange={onChange} />
  );
}
