import React, { useEffect, useRef } from "react";
import Editor, { useMonaco, OnMount, OnValidate } from "@monaco-editor/react";

import { JsonSchema } from "@kickstartds/json-schema-viewer";

type SchemaEditorProps = {
  initialContent: unknown;
  schema: JsonSchema;
  handleValidChange: Function;
}

const editorPreamble = `
// Copy-and-paste your JSON in here to live-edit
// while reading the docs and also getting the
// benefit of validation and autocompletion!
`.trim();

export const SchemaEditor: React.FC<SchemaEditorProps> = (props) => {
  const editorRef = useRef(null);
  const monaco = useMonaco();

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor; 
  };

  const handleEditorValidChange: OnValidate = (markers) => {
    if (markers && markers.length === 0 && editorRef && editorRef.current) {
      props.handleValidChange(editorRef.current.getValue());
    }
  };

  useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      schemas: [{
        uri: "https://json-schema.app/example.json", // id of the first schema
        fileMatch: ['a://b/example.json'],
        schema: props.schema
      }]
    });
  }, [monaco, props.schema]);

  return (
    <Editor
      height="97vh"
      defaultLanguage="json"
      value={editorPreamble + '\n' + JSON.stringify(props.initialContent, null, 2)}
      path="a://b/example.json"
      theme="vs-dark"
      onValidate={handleEditorValidChange}
      saveViewState={false}
      onMount={handleEditorDidMount}
    />
  );
};
