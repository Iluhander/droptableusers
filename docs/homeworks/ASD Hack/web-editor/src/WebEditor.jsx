import React from 'lib-app/react';
import Editor from "lib-app/monaco-editor";

export default function WebEditor({ onChange }) {
  return (
    <Editor height="90vh" defaultLanguage="yaml" defaultValue="" onChange={onChange} />
  );
}
