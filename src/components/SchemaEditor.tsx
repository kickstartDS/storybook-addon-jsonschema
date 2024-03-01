import React, { useEffect, useRef, useState } from "react";
import type { IRange, editor } from "monaco-editor";
import type { Args } from "@storybook/types";
import Editor, { useMonaco, OnMount, OnValidate } from "@monaco-editor/react";
import { JsonSchema } from "@kickstartds/json-schema-viewer";
import { useArgs } from "@storybook/manager-api";
import decomment from "decomment";

const identity: <T>(v: T) => T = (v) => v;

type SchemaEditorProps = {
  schema: JsonSchema;
  setValidationResults: (marker: editor.IMarker[]) => void;
  selectedValidationRange?: IRange;
  fromArgs?: (args: Args) => Record<string, any> | Promise<Record<string, any>>;
  toArgs?: (obj: Record<string, any>) => Args | Promise<Args>;
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
  fromArgs = identity,
  toArgs = identity,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const monaco = useMonaco();
  const [storybookArgs = {}, updateArgs] = useArgs();
  const [initialContent, setInitialContent] = useState<Record<string, any>>({});

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleChange = async (value: string) => {
    try {
      updateArgs(await toArgs(JSON.parse(decomment(value))));
    } catch (e) {}
  };

  const handleEditorValidChange: OnValidate = (markers) => {
    setValidationResults(markers);
    if (markers.length === 0 && editorRef.current) {
      handleChange(editorRef.current.getValue());
    }
  };

  useEffect(() => {
    const update = async (args: Args) =>
      setInitialContent(await fromArgs(args));
    update(storybookArgs).catch(console.error);
  }, [schema]);

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
