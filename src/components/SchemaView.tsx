import React from "react";
import { useParameter } from "@storybook/api";
import styled from "styled-components";

import { forSize, JsonSchema } from "@kickstartds/json-schema-viewer";

import { PARAM_KEY } from "../constants";
import { SchemaDoc } from "./SchemaDoc";
import { SchemaEditor } from "./SchemaEditor";

const SchemaContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
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

  return (
    <SchemaContainer>
      <SchemaDocContainer>
        <SchemaDoc schema={schema} />
      </SchemaDocContainer>
      <SchemaEditorContainer>
        <SchemaEditor schema={schema} />
        <SchemaEditorContainerHeading>
          Editor and Validator
        </SchemaEditorContainerHeading>
      </SchemaEditorContainer>
    </SchemaContainer>
  );
};
