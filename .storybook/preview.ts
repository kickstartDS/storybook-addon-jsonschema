import { actions } from "@storybook/addon-actions";
import { Preview } from '@storybook/react';
import { unpackDecorator } from "@kickstartds/core/lib/storybook/helpers";

import "@kickstartds/core/lib/design-tokens/tokens.css";
import "@kickstartds/base/lib/global/base.js";
import "@kickstartds/base/lib/global/base.css";

const myActions = actions("radio");
window._ks.radio.on("*", myActions.radio);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [unpackDecorator],
}

export default preview;