// @ts-check
/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    react: { version: 'detect' },
  },
  plugins: ['react-refresh', 'simple-import-sort', 'import'],
  rules: {
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
    'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
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
};

module.exports = config;
