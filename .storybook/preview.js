import { actions } from "@storybook/addon-actions";
import { unpackDecorator } from "@kickstartds/core/lib/storybook/helpers";

import "@kickstartds/core/lib/design-tokens/tokens.css";
import "@kickstartds/base/lib/global/base.js";
import "@kickstartds/base/lib/global/base.css";

const myActions = actions("radio");
window.rm.radio.on("*", myActions.radio);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [unpackDecorator];