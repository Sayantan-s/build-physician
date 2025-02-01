import { createFileRoute } from "@tanstack/react-router";
// import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import axios from "axios";
import Editor from "editor";

export const Route = createFileRoute("/_auth/roadmaps/$roadmap/edit")({
  component: Roadmap,
});

export interface APIResponse {
  language: string;
  version: string;
  run: Run;
}

export interface Run {
  stdout: string;
  stderr: string;
  code: number;
  signal: any;
  output: string;
}

function Roadmap() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleChange = (codeValue: string | undefined) => {
    if (!codeValue) return;
    setCode(codeValue);
  };

  const handleSubmitCode = async () => {
    const data = await axios.post<APIResponse>(
      `https://emkc.org/api/v2/piston/execute`,
      {
        language: "javascript",
        runtime: "node",
        files: [
          {
            content: code,
          },
        ],
        version: "18.15.0",
      }
    );
    setOutput(data.data.run.output);
  };

  return (
    <div>
      <Editor />
      {output ? <div>{output}</div> : null}
    </div>
  );
}
