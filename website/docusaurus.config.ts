import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'ngx-page-object-model',
  tagline: 'Angular Component Tests made easy',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://francescoborzi.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/ngx-page-object-model/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FrancescoBorzi', // Usually your GitHub org/user name.
  projectName: 'ngx-page-object-model', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/FrancescoBorzi/ngx-page-object-model/tree/main/website/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'ngx-page-object-model',
      logo: {
        alt: 'ngx-page-object-model',
        src: 'img/angular_icon_gradient.gif',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/FrancescoBorzi/ngx-page-object-model',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `The <a href="https://github.com/FrancescoBorzi/ngx-page-object-model">ngx-page-object-model</a> library is open-source software released by <a href="https://nl.linkedin.com/in/francesco-borzi">Francesco Borzì</a> under the <a href="https://github.com/FrancescoBorzi/ngx-page-object-model/blob/main/LICENSE">MIT license</a>. Documentation website generated with <a href="https://docusaurus.io/">Docusaurus</a>.`,
    },
    colorMode: {
      defaultMode: 'dark',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
