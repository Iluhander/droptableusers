import React from "lib-app/react";
import WebEditor from "web-editor/WebEditor";
import Visualizer from "visualizer/Visualizer";
import ProjectFS from "project-fs/ProjectFS";

console.log(ProjectFS);

import './Main.css';

const TeamName = '"; drop table users;';

export default function MainPage () { 
  return (
    <div className="mainLayout">
      <div className="nav">
        <h4>Web-Editor for reproducible pipelines</h4>
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
