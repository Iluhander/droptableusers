import React from "lib-app/react";
import WebEditor from "web-editor/WebEditor";
import Visualizer from "visualizer/Visualizer";

import { EventBus, BusEvent } from './src/Bus/EventBus';

import './App.css';

const TeamName = '"; drop table users;';

const bus = new EventBus();

export default function App () { 
  React.useEffect(() => {
    bus.subscribe((e) => {
      if (e instanceof BusEvent) {
        window.visualizer.setCode(e.fileVal);
      }
    })
  }, []);
  
  return (
    <div className="mainLayout">
      <div className="nav">
        <h4>Web-Editor for reproducible pipelines</h4>
        <a className="teamName" href="https://github.com/dr0p-table-users/asd">By the {TeamName} team</a>
      </div>
      <div className="editorContainer">
        <WebEditor onChange={(newVal) => bus.publish(new BusEvent("", newVal))} />
      </div>
      <div className="visualizerContainer">
        <Visualizer />
      </div>
    </div>
  );
}
