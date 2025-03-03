import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../packages/**/src/**/*.mdx",
    "../packages/**/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@storybook/addon-designs",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],

  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  core: {
    builder: {
      name: "@storybook/builder-vite",
      options: {
        viteConfigPath: "./config/vite.config.ts",
      },
    },
  },

  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};
export default config;
