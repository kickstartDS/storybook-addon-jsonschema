import React, { useState } from "react";
import { useParameter } from "@storybook/manager-api";
import styled from "styled-components";
import type { editor, IRange } from "monaco-editor";

import { forSize, JsonSchema } from "@kickstartds/json-schema-viewer";

import { PARAM_KEY } from "../constants";
import { SchemaDoc } from "./SchemaDoc";
import { SchemaEditor } from "./SchemaEditor";

const SchemaContainer = styled.div`
  display: flex;
  height: 100%;
`;

const SchemaDocContainer = styled.div`
  flex: 2;
  overflow: auto;
`;

const SchemaEditorContainer = styled.div`
  flex: 2;

  display: none;
  position: relative;
  ${forSize("tablet-landscape-up", "display: block;")}
  ${forSize("desktop-up", "flex: 3;")}

  section {
    overflow: hidden;
    max-height: 100%;
  }
`;

const SchemaEditorContainerHeading = styled.h3`
  position: fixed;
  top: 0px;
  z-index: -100;
`;

export const SchemaView: React.FC = () => {
  const schema = useParameter<JsonSchema>(PARAM_KEY, {});
  const [validationResults, setValidationResults] = useState<editor.IMarker[]>(
    []
  );
  const [selectedValidation, setSelectedValidation] = useState<IRange>();

  return (
    <SchemaContainer>
      <SchemaDocContainer>
        <SchemaDoc
          schema={schema}
          validationResults={validationResults}
          onSelectValidationRange={setSelectedValidation}
        />
      </SchemaDocContainer>
      <SchemaEditorContainer>
        <SchemaEditor
          schema={schema}
          setValidationResults={setValidationResults}
          selectedValidationRange={selectedValidation}
        />
        <SchemaEditorContainerHeading>
          Editor and Validator
        </SchemaEditorContainerHeading>
      </SchemaEditorContainer>
    </SchemaContainer>
  );
};
