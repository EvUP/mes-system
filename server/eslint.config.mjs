import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      'prettier/prettier': 'error', 
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/extensions': ['error', 'ignorePackages', { ts: 'never', js: 'never' }],
    },
  },
];
