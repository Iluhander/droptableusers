import React from "lib-app/react";
import WebEditor from "web-editor/WebEditor";
import Visualizer from "visualizer/Visualizer";
import ProjectFS from "project-fs/ProjectFS";

import { SaveEvent } from "../../Bus/EventBus";

import './Main.css';

const TeamName = '"; drop table users;';

export default function MainPage () { 
  React.useEffect(() => {
    ProjectFS();
  }, []);

  const onSave = () => {
    window.bus.publish(new SaveEvent(''));
  };

  return (
    <div className="mainLayout">
      <div className="nav">
        <h4>Web-Editor for reproducible pipelines</h4>
        <span style={{ color: 'lightgray', margin: '0 10px' }}>|</span>
        <button className="saveButton" onClick={onSave}>Save</button>
        <a className="teamName" href="https://github.com/dr0p-table-users/asd">By the {TeamName} team</a>
      </div>
      <div className="editorContainer">
        <WebEditor />
      </div>
      <div className="visualizerContainer">
        <Visualizer />
      </div>
    </div>
  );
}
