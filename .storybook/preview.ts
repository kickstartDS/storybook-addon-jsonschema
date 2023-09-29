import { Preview } from '@storybook/react';
import { unpackDecorator } from "@kickstartds/core/lib/storybook";

import "@kickstartds/core/lib/design-tokens/tokens.css";
import "@kickstartds/base/lib/global/base.js";
import "@kickstartds/base/lib/global/base.css";

const preview: Preview = {
  parameters: {
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