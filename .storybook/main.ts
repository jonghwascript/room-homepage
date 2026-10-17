import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: [
      '../src/**/*.mdx',
      '../src/**/*.stories.@(js|mjs|cjs)'
    ],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: [
    { from: '../src/images', to: '/images' },
    { from: '../src/js/vendor', to: '/vendor' },
  ],
};

export default config;
