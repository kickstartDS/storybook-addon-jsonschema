import React, { useEffect, useRef, useMemo } from "react";
import type { IRange, editor } from "monaco-editor";
import Editor, { useMonaco, OnMount, OnValidate } from "@monaco-editor/react";
import { JsonSchema } from "@kickstartds/json-schema-viewer";
import { pack, unpack } from "@kickstartds/core/lib/storybook";
import { useArgs } from "@storybook/manager-api";
import decomment from "decomment";

type SchemaEditorProps = {
  schema: JsonSchema;
  setValidationResults: (marker: editor.IMarker[]) => void;
  selectedValidationRange?: IRange;
};

const editorPreamble = `
// Copy-and-paste your JSON in here to live-edit
// while reading the docs and also getting the
// benefit of validation and autocompletion!
`.trim();

export const SchemaEditor: React.FC<SchemaEditorProps> = ({
  schema,
  setValidationResults,
  selectedValidationRange,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();
  const [storybookArgs = {}, updateArgs] = useArgs();

  const initialContent = useMemo(() => unpack(storybookArgs), [schema]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleChange = (value: string) => {
    try {
      updateArgs(pack(JSON.parse(decomment(value))));
    } catch (e) {}
  };

  const handleEditorValidChange: OnValidate = (markers) => {
    setValidationResults(markers);
    if (markers.length === 0 && editorRef.current) {
      handleChange(editorRef.current.getValue());
    }
  };

  useEffect(() => {
    monaco?.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      schemas: [
        {
          uri: "https://json-schema.app/example.json", // id of the first schema
          fileMatch: ["a://b/example.json"],
          schema: schema,
        },
      ],
    });
  }, [monaco, schema]);

  useEffect(() => {
    if (editorRef.current && selectedValidationRange) {
      editorRef.current.setSelection(selectedValidationRange);
      editorRef.current.revealRangeAtTop(selectedValidationRange);
    }
  }, [selectedValidationRange]);

  return (
    <Editor
      defaultLanguage="json"
      value={editorPreamble + "\n" + JSON.stringify(initialContent, null, 2)}
      path="a://b/example.json"
      theme="vs-dark"
      onValidate={handleEditorValidChange}
      saveViewState={false}
      onMount={handleEditorDidMount}
      onChange={handleChange}
    />
  );
};
