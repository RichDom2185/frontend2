// @ts-check
import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'eslint.config.mjs', 'vite.config.ts'] },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        ecmaFeatures: {
          jsx: true,
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  { settings: { react: { version: 'detect' } } },
  react.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      // With the new JSX Transform in React 17,
      // we don't need to import React in every file.
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          ignoreRestSiblings: false,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'import-x/no-useless-path-segments': ['error', { noUselessIndex: true }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**/*.scss', '../**/*.css', './**/*.scss', './**/*.css'],
              message:
                'Do not use relative imports for CSS/SCSS files. Use absolute imports instead.',
            },
          ],
          paths: [
            {
              name: 'react-redux',
              importNames: ['useSelector', 'useDispatch'],
              message: "Use the typed hooks 'useAppDispatch' and 'useAppSelector' instead.",
            },
          ],
        },
      ],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            [
              '^\\u0000', // Side effects
            ],
            // Separate by empty line
            [
              '^\\.\\./.+$', // Parents
              '^\\./[^/]+$', // Siblings
              '^\\./.+$', // Children
              '^src/.+?(?!=\\.s?css)', // Internal
              '^', // Everything else
              '^react$', // react
              '^react/.+$', // react/*
              '^react-dom$', // react-dom
              '^react-dom/.+$', // react-dom/*
            ],
            // Separate by empty line
            [
              '^.*\\.module\\.s?css$', // CSS Modules
              '^.+\\.s?css$', // CSS, SCSS
            ],
          ],
        },
      ],
    },
  }
);
