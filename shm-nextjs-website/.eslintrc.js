module.exports = {
  extends: ['next', 'prettier', 'standard', 'plugin:prettier/recommended'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'unused-imports/no-unused-imports': 'error',
    'react-hooks/exhaustive-deps': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'simple-import-sort/exports': 'error',
  },
  plugins: ['unused-imports', 'simple-import-sort', 'react'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
};
