import { Button } from "./Button";
import schema from "./button.schema.json";

export default {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
    jsonschema: schema,
  },
  args: {
    label: "Button",
    primary: false,
    size: "medium",
  },
};

export const Primary = {
  args: {
    primary: true,
  },
};

export const Secondary = {};

export const Large = {
  args: {
    size: "large",
  },
};

export const Small = {
  args: {
    size: "small",
  },
};
