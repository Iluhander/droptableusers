import { FC, useEffect, useRef } from "react";
import render from "editor/werender";
console.log(render);

const App: FC = () => {
  const editorContainerRef = useRef(null);
  useEffect(() => {
  }, [])
  
  return (
    <div>
      <h1>Web-editor</h1>
      <div ref={editorContainerRef} />
    </div>
  );
};

export default App;