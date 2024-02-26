import type { Args } from "@storybook/types";
import type { JsonSchema } from "@kickstartds/json-schema-viewer";

export const ADDON_ID = "storybook/jsonschema";
export const PANEL_ID = `${ADDON_ID}/panel`;
export const PARAM_KEY = "jsonschema";
export type JsonSchemaParameter =
  | {
      schema: JsonSchema;
      fromArgs?: (args: Args) => Record<string, any>;
      toArgs?: (obj: Record<string, any>) => Args;
    }
  | undefined;
