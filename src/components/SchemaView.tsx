import React from "react";
import { useParameter } from "@storybook/api";
import styled from "styled-components";

import { forSize, JsonSchema } from "@kickstartds/json-schema-viewer";

import { PARAM_KEY } from "../constants";
import { SchemaDoc } from "./SchemaDoc";
import { SchemaEditor } from "./SchemaEditor";

const SchemaContainer = styled.div`
  display: flex;
`;

const SchemaEditorContainer = styled.div`
  min-width: 580px;
  max-width: 580px;

  display: none;
  position: relative;
  ${forSize("tablet-landscape-up", "display: block;")}

  section {
    position: fixed !important;
    padding: 0;
    margin: 0;
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
      <SchemaDoc schema={schema} />
      <SchemaEditorContainer>
        <SchemaEditor schema={schema} />
        <SchemaEditorContainerHeading>
          Editor and Validator
        </SchemaEditorContainerHeading>
      </SchemaEditorContainer>
    </SchemaContainer>
  );
};
