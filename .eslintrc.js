module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'react-hooks',
    'import',
    '@typescript-eslint',
    'react-native',
    'eslint-plugin-tsdoc',
  ],
  extends: [
    'prettier',
    'plugin:jest/recommended',
    'plugin:json/recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
  ],
  rules: {
    'no-param-reassign': 0,
    'linebreak-style': ['off'],
    'implicit-arrow-linebreak': 0,
    'no-undef': ['error'],
    'function-paren-newline': 0,
    semi: 0,
    'spaced-comment': 0,
    'comma-dangle': 2,
    'no-extra-boolean-cast': 1,
    'no-extra-parens': 0,
    'quote-props': 0,
    'object-curly-spacing': ['error', 'always'],
    'no-nested-ternary': 'error',
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'no-unused-expressions': 0,
    'max-len': 0,
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['**/../src/*', '**/../tests/*', '**/../TestData/*'],
            message: 'Usage of relative parent imports is not allowed.',
          },
        ],
      },
    ],
    quotes: ['error', 'single', {avoidEscape: true}],
    'jsx-quotes': ['error', 'prefer-double'],
    'arrow-parens': 0,
    'eol-last': 0,
    'consistent-return': 0,
    'react/prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/sort-comp': 0,
    'react/prefer-stateless-function': 0,

    // using react 17 with plugin-transform-react-jsx
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'import/newline-after-import': ['error', {count: 1}],
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          'type',
        ],
        'newlines-between': 'always-and-inside-groups',
        pathGroups: [
          {
            pattern: 'react+(|-native)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '(@)react+(|-)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'src/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin', 'react'],
      },
    ],
    'sort-imports': ['error', {ignoreDeclarationSort: true}],

    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-explicit-any': ['error'],

    'jest/no-mocks-import': 0,

    'react-native/no-unused-styles': 0,
    'react-native/split-platform-components': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,

    'tsdoc/syntax': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
        'no-shadow': 'off',
        // '@typescript-eslint/no-shadow': ['warn'],
      },
    },
  ],
};
