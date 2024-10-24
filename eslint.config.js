import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  {
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      eqeqeq: ['error', 'always'],
      'no-new': 'error',
      'no-unused-expressions': 'error',
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always'
        }
      ]
    }
  },
  pluginJs.configs.recommended
]
