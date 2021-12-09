import React, { useCallback } from "react";
import { useLocation } from 'react-router-dom';
import { useArgs, useParameter } from "@storybook/api";
import styled from "styled-components";
import decomment from "decomment";
import { debounce } from "throttle-debounce";

import {
  SchemaExplorer,
  SchemaExplorerProps,
  Lookup,
  InternalLookup,
  PathElement,
  getSchemaFromReference,
  forSize,
  JsonSchema,
} from "@kickstartds/json-schema-viewer";
import { pack, unpack } from "@kickstartds/core/lib/storybook/helpers";

import { PARAM_KEY } from '../constants';
import { SchemaEditor } from './SchemaEditor';

const SchemaContainer = styled.div`
  display: flex;
`;

const SchemaEditorContainer = styled.div`
  min-width: 580px;
  max-width: 580px;

  display: none;
  position: relative;
  ${forSize('tablet-landscape-up', `
    display: block;
  `)}

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

const getTitle = (schema: JsonSchema | undefined): string => {
  if (schema === undefined) {
    return '<not found>';
  }

  if (typeof schema === 'boolean') {
    return '<anything>';
  }

  return schema.title || 'object';
};

const removeLeadingSlash = (v: string): string => {
  if (v.startsWith('/')) {
    return v.slice(1);
  }
  return v;
};

export const SchemaView: React.FC = () => {
  const schema = useParameter<JsonSchema>(PARAM_KEY, {});
  const lookup = new InternalLookup(schema);

  const getPathFromRoute = (lookup: Lookup): Array<PathElement> => {
    const basePathSegments = ['base'];
    const { pathname } = useLocation();
    const pathSegments = removeLeadingSlash(pathname).split('/');
    let iterator = 0;
    while (pathSegments[iterator] !== undefined && basePathSegments[iterator] !== undefined && basePathSegments[iterator] === pathSegments[iterator]) {
      iterator++;
    }

    if (iterator === pathSegments.length) {
      const reference = '#';
      const title = getTitle(getSchemaFromReference(reference, lookup));
      return [{
        title,
        reference
      }];
    }

    return pathSegments.slice(iterator).map(decodeURIComponent).map(userProvidedReference => {
      const reference = userProvidedReference.startsWith('#') ? userProvidedReference : '#/invalid-reference';
      const title = getTitle(getSchemaFromReference(reference, lookup));
      return {
        title,
        reference
      };
    });
  };

  const path = getPathFromRoute(lookup);
  if (path.length === 0) {
    return <div>Error: Could not work out what to load from the schema.</div>
  }

  const currentPathElement = path[path.length - 1];
  const currentSchema = getSchemaFromReference(currentPathElement.reference, lookup);

  if (currentSchema === undefined) {
    return <div>ERROR: Could not look up the schema that was requested in the URL.</div>;
  }

  if (typeof currentSchema === 'boolean') {
    return <div>TODO: Implement anything or nothing schema once clicked on.</div>
  }

  const explorerArgs: SchemaExplorerProps = {
    basePathSegments: ['base'],
    path,
    lookup,
    schema: currentSchema,
    stage: 'both'
  }
  const [storybookArgs, updateArgs, resetArgs] = useArgs();

  const handleValidChange = useCallback(
    debounce(200, (argsString: string) => {
      try {
        updateArgs(pack(JSON.parse(decomment(argsString))));
      } catch (e) {}
    }),
    [updateArgs]
  );

  return (
    <SchemaContainer>
      <SchemaExplorer {...explorerArgs} />
      <SchemaEditorContainer>
        <SchemaEditor
          initialContent={unpack(storybookArgs as Record<'string', any>)}
          schema={schema}
          handleValidChange={handleValidChange}
        />
        <SchemaEditorContainerHeading>Editor and Validator</SchemaEditorContainerHeading>
      </SchemaEditorContainer>
    </SchemaContainer>
  );
};
