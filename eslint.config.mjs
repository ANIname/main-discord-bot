import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
// import jsdoc from 'eslint-plugin-jsdoc';
import sonarjs from 'eslint-plugin-sonarjs';
import promise from 'eslint-plugin-promise';
import unicorn from 'eslint-plugin-unicorn';
import eslintComments from 'eslint-plugin-eslint-comments';
import optimizeRegex from 'eslint-plugin-optimize-regex';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import alignImport from 'eslint-plugin-align-import';
import alignAssignments from 'eslint-plugin-align-assignments';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      // jsdoc,
      sonarjs,
      promise,
      unicorn,
      'eslint-comments': eslintComments,
      'optimize-regex': optimizeRegex,
      'simple-import-sort': simpleImportSort,
      'align-import': alignImport,
      'align-assignments': alignAssignments,
      import: importPlugin,
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
      
      // Import rules
      'align-import/align-import': 'error',
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-anonymous-default-export': 'error',
      'import/order': ['error', { 'newlines-between': 'always-and-inside-groups' }],
      
      // Unicorn rules
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/no-array-for-each': 'off',
      
      // Alignment rules
      'align-assignments/align-assignments': [2],
    },
  },

  {
    ignores: ['node_modules', 'dist', '**/*.js', '**/*.mjs'],
  },
]; 