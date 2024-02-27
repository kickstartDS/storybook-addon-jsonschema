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
      async toArgs(obj) {
        return (await import("@kickstartds/core/lib/storybook")).pack(obj);
      },
      async fromArgs(args) {
        return (await import("@kickstartds/core/lib/storybook")).unpack(args);
      },
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
