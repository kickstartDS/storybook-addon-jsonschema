import { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["../preset.js", "@storybook/addon-essentials"],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
};

export default config;
