import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import vueEslintConfigTypescript from '@vue/eslint-config-typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import unicorn from 'eslint-plugin-unicorn';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import tsEslint from 'typescript-eslint';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

const frontendFiles = ['ts', 'vue'].map(ext => `frontend/**/*.${ext}`);

const { plugins, ...restVue } = vueEslintConfigTypescript;

export default [
  {
    ignores: ['dist', 'frontend/dist', 'node_modules', 'public', 'tmp', 'frontend/node_modules']
  },
  js.configs.all,
  ...tsEslint.configs.recommended,
  sonarjs.configs.recommended,
  unicorn.configs['flat/recommended'],
  ...fixupConfigRules(
    compat.extends(
      // https://github.com/import-js/eslint-plugin-import/issues/2948
      'plugin:import/recommended',
      // https://github.com/eslint-community/eslint-plugin-promise/issues/449
      'plugin:promise/recommended'
    )
  ),
  eslintConfigPrettier,
  {
    files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      ecmaVersion: 12,
      sourceType: 'module'
    },
    settings: {
      'import/internal-regex': '^src/'
    },
    rules: {
      '@typescript-eslint/class-methods-use-this': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreRestSiblings: true
        }
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          classes: false,
          functions: false
        }
      ],
      '@typescript-eslint/no-useless-constructor': 'error',
      'class-methods-use-this': 'off',
      'dot-notation': 'off',
      'func-style': [
        'error',
        'declaration',
        {
          allowArrowFunctions: true
        }
      ],
      'id-length': [
        'error',
        {
          exceptions: ['i', 'n']
        }
      ],
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc'
          },

          groups: [
            ['builtin', 'external'],
            ['internal', 'sibling', 'parent']
          ],
          'newlines-between': 'always'
        }
      ],
      'init-declarations': 'off',
      'max-statements': ['error', 20],
      'new-cap': 'off',
      'no-empty-function': 'off',
      'no-magic-numbers': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-ternary': 'off',
      'no-undefined': 'off',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      'no-useless-constructor': 'off',
      'one-var': ['error', 'never'],
      'sort-imports': 'off',
      'sort-keys': 'off',
      'unicorn/catch-error-name': [
        'error',
        {
          name: 'err'
        }
      ],
      'unicorn/explicit-length-check': [
        'error',
        {
          'non-zero': 'not-equal'
        }
      ],
      'unicorn/import-style': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prevent-abbreviations': 'off'
    }
  },
  {
    files: ['backend/src/main.ts'],
    rules: {
      'no-console': ['error', { allow: ['error'] }],
      'unicorn/no-process-exit': 'off'
    }
  },
  // Frontend
  ...vue.configs['flat/recommended'].map(config => ({
    ...config,
    files: config.files?.map(file => `frontend/${file}`) ?? frontendFiles
  })),
  ...compat.config(restVue),
  {
    files: frontendFiles,
    rules: {
      'no-useless-assignment': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            pascalCase: true
          }
        }
      ],
      'vue/html-closing-bracket-newline': 'off',
      'vue/html-indent': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3
          },
          multiline: {
            max: 1
          }
        }
      ],
      'vue/singleline-html-element-content-newline': 'off'
    }
  }
];
