import React from 'lib-app/react';
import Editor from "lib-app/monaco-editor";

class BusEvent {
  eventType = 3;

  /**
   * @param {string} fileURL 
   * @param {string} fileVal 
   */
  constructor(fileURL, fileVal) {
    this.fileURL = fileURL;
    this.fileVal = fileVal;
  }
}



export default function WebEditor() {
  const [initialVal, setInitialVal] = React.useState();
  const [fileURL, setFileURL] = React.useState('');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window["editor-api"] = {};
      window["editor-api"].receiveEvent = (e) => {
        if (e.eventType === 3) {
          console.log(e);
          setInitialVal(e.fileVal);
          setFileURL(e.fileURL);
          window["editor-api"].receiveEvent = (_) => {};
        }
      };
    }

    window.bus.subscribe("editor-api");
  }, []);

  const onChange = (val) => {
    console.log(val);
    window.bus.publish(new BusEvent(fileURL, val));
  };

  if (!initialVal) {
    return (
      <Editor height="100%" defaultLanguage="yaml" defaultValue="" onChange={onChange} />
    );
  }

  return (
    <Editor height="100%" defaultLanguage="yaml" defaultValue={initialVal} onChange={onChange} />
  );
}
