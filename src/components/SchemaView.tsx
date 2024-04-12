import React, { useState } from "react";
import { useParameter } from "@storybook/manager-api";
import { styled } from "@storybook/theming";
import type { editor, IRange } from "monaco-editor";

import { forSize } from "@kickstartds/json-schema-viewer";

import { PARAM_KEY, JsonSchemaParameter } from "../constants";
import { SchemaDoc } from "./SchemaDoc";
import { SchemaEditor } from "./SchemaEditor";

const SchemaContainer = styled.div`
  display: flex;
  height: 100%;
`;

const SchemaDocContainer = styled.div`
  flex: 1;
  overflow: auto;
  background: #fff;
  color: #172b4d;
  ${forSize("tablet-landscape-up", "max-width: max(500px, 30%);")}
`;

const SchemaEditorContainer = styled.div`
  flex: 1;

  display: none;
  position: relative;
  overflow: hidden;
  ${forSize("tablet-landscape-up", "display: block;")}

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
  const { schema = {}, packArgs } = useParameter<JsonSchemaParameter>(
    PARAM_KEY,
    { schema: {} }
  );
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
          packArgs={packArgs}
        />
        <SchemaEditorContainerHeading>
          Editor and Validator
        </SchemaEditorContainerHeading>
      </SchemaEditorContainer>
    </SchemaContainer>
  );
};
