import {
  pack,
  unpackDecorator,
  getArgsShared,
} from "@kickstartds/core/lib/storybook";
import { Header } from "./Header";
import schema from "./header.schema.json";

const { args, argTypes } = getArgsShared(schema);

export default {
  title: "Header",
  component: Header,
  args,
  argTypes,
  parameters: {
    layout: "fullscreen",
    jsonschema: {
      schema,
      packArgs: true,
    },
  },
  decorators: [unpackDecorator],
};

export const LoggedIn = {
  args: pack({
    user: {
      name: "Jane Doe",
    },
  }),
};

export const LoggedOut = {};
