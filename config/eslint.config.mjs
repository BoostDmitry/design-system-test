import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import globals from 'globals';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import custom from './eslint_rules/index.mjs';
import { fixupPluginRules } from '@eslint/compat';

export default [
  {
    ignores: [
      '**/node_modules',
      '**/build',
      '**/builds',
      '**/vite.config.ts',
      '**/vitest.config.ts',
      '**/babel*.config.js',
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.d.ts',

      'packages/chat-panel/build-and-prepare.ts',
      'packages/chat-panel/proxy',
      'packages/chat-panel/auth-server',
      'packages/chat-panel/plugins',
      'packages/chat-panel/rollup.config.js',
    ],
  },

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parserOptions: {
        projectService: true,
        ecmaVersion: 'latest',

        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  ...tsEslint.config({
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: [eslint.configs.recommended, ...tsEslint.configs.recommended],

    rules: {
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',

      '@typescript-eslint/no-unsafe-function-type': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-empty-object-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        },
      ],
    },
  }),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    rules: {
      'no-unused-vars': 'off', // handled by @typescript-eslint/no-unused-vars

      'no-case-declarations': 'warn',
      'no-prototype-builtins': 'warn',
      'no-irregular-whitespace': 'warn',
      'prefer-const': 'warn',
      'no-extra-boolean-cast': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],

      'no-empty': 'error',
      'prefer-destructuring': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: ['@boostai/boilerplate'],
          patterns: [
            '@boostai/*/*',
            '!@boostai/boilerplate/dev',
            '!@boostai/boilerplate/fonts',
          ],
        },
      ],
    },
  },

  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  {
    files: ['**/*.{jsx,tsx}'],

    rules: {
      'react/jsx-key': 'warn',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'warn',
      'react/no-unused-prop-types': 'error',
      'react/default-props-match-prop-types': 'error',
      'react/no-unused-state': 'error',
    },
  },

  {
    files: ['**/*.tsx'],

    rules: {
      'react/prop-types': 'off',
      'react/jsx-no-target-blank': 'off',
    },
  },

  // https://github.com/facebook/react/issues/28313
  {
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      import: fixupPluginRules(pluginImport),
    },

    rules: {
      'import/no-duplicates': 'error',
      'import/no-relative-packages': 'error',
    },
  },

  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{jsx,tsx}'],

    rules: {
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/label-has-associated-control': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/mouse-events-have-key-events': 'warn',
      'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/no-noninteractive-tabindex': 'warn',
      'jsx-a11y/heading-has-content': 'off',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      custom,
    },

    rules: {
      'custom/import-cn': 'error',
    },
  },
];
