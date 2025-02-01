import { useState } from "react";
import { Editor as CodeEditor } from "@monaco-editor/react";

const Editor = () => {
  const [code, setCode] = useState("");

  const handleChange = (codeValue: string | undefined) => {
    if (!codeValue) return;
    setCode(codeValue);
  };

  return (
    <CodeEditor
      height="90vh"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      value={code}
      onChange={handleChange}
    />
  );
};

export default Editor;
