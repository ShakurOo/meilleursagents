module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['./src/**/*.spec.ts?(x)', './src/tests/*.ts?(x)'],
      extends: [
        'plugin:jest/recommended',
        'plugin:jest/style',
        'plugin:jest-dom/recommended',
        'plugin:testing-library/react',
      ],
      plugins: ['jest', 'jest-dom', 'testing-library'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'jest-dom/prefer-checked': 'error',
        'jest-dom/prefer-enabled-disabled': 'error',
        'jest-dom/prefer-required': 'error',
        'jest-dom/prefer-to-have-attribute': 'error',
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/no-dom-import': 'off',
      },
      env: {
        'jest/globals': true, // enable Jest global variables.
      },
    },
    {
      files: ['./cypress/**/*.cy.ts'],
      extends: ['plugin:cypress/recommended'],
      plugins: ['cypress'],
      rules: {
        'cypress/no-force': 'warn',
        'cypress/assertion-before-screenshot': 'warn',
        'cypress/require-data-selectors': 'warn',
        'cypress/no-pause': 'error',
      },
      env: {
        'cypress/globals': true, // enable Cypress global variables.
      },
    },
  ],
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  plugins: ['simple-import-sort', 'prettier'],
  rules: {
    'no-unused-vars': 'off',
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
};
