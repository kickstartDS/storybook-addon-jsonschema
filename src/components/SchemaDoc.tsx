import React from "react";
import { useLocation } from "react-router-dom";
import type { editor, IRange } from "monaco-editor";

import {
  SchemaExplorer,
  SchemaExplorerProps,
  Lookup,
  InternalLookup,
  PathElement,
  getSchemaFromReference,
  JsonSchema,
} from "@kickstartds/json-schema-viewer";

const getTitle = (schema: JsonSchema | undefined): string => {
  if (schema === undefined) {
    return "<not found>";
  }

  if (typeof schema === "boolean") {
    return "<anything>";
  }

  return schema.title || "object";
};

const removeLeadingSlash = (v: string): string => {
  if (v.startsWith("/")) {
    return v.slice(1);
  }
  return v;
};

type SchemaDocProps = {
  schema: JsonSchema;
  validationResults: editor.IMarker[];
  onSelectValidationRange: (range: IRange) => void;
};

export const SchemaDoc: React.FC<SchemaDocProps> = ({
  schema,
  validationResults,
  onSelectValidationRange,
}) => {
  const lookup = new InternalLookup(schema);

  const getPathFromRoute = (lookup: Lookup): Array<PathElement> => {
    const basePathSegments = ["base"];
    const { pathname } = useLocation();
    const pathSegments = removeLeadingSlash(pathname).split("/");
    let iterator = 0;
    while (
      pathSegments[iterator] !== undefined &&
      basePathSegments[iterator] !== undefined &&
      basePathSegments[iterator] === pathSegments[iterator]
    ) {
      iterator++;
    }

    if (iterator === pathSegments.length) {
      const reference = "#";
      const title = getTitle(getSchemaFromReference(reference, lookup));
      return [
        {
          title,
          reference,
        },
      ];
    }

    return pathSegments
      .slice(iterator)
      .map(decodeURIComponent)
      .map((userProvidedReference) => {
        const reference = userProvidedReference.startsWith("#")
          ? userProvidedReference
          : "#/invalid-reference";
        const title = getTitle(getSchemaFromReference(reference, lookup));
        return {
          title,
          reference,
        };
      });
  };

  const path = getPathFromRoute(lookup);
  if (path.length === 0) {
    return <div>Error: Could not work out what to load from the schema.</div>;
  }

  const currentPathElement = path[path.length - 1];
  const currentSchema = getSchemaFromReference(
    currentPathElement.reference,
    lookup,
  );

  if (currentSchema === undefined) {
    return (
      <div>
        ERROR: Could not look up the schema that was requested in the URL.
      </div>
    );
  }

  if (typeof currentSchema === "boolean") {
    return (
      <div>TODO: Implement anything or nothing schema once clicked on.</div>
    );
  }

  const explorerArgs: SchemaExplorerProps = {
    basePathSegments: ["base"],
    path,
    lookup,
    schema: currentSchema,
    stage: "both",
    onSelectValidationRange,
    validationResults,
  };

  return <SchemaExplorer {...explorerArgs} />;
};
