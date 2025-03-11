import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

const compat = new FlatCompat()

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends(
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ),
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'coverage/**',
      '*.tsbuildinfo',
      'next-env.d.ts'
    ]
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  }
]
