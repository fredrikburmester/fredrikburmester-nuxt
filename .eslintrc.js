module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:nuxt/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
    // Prevent console from being used in production
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // Enforce use of comma
    // https://eslint.org/docs/rules/comma-dangle#always-multiline
    'comma-dangle': ['error', 'always-multiline'],

    // https://eslint.org/docs/rules/object-curly-newline#consistent
    'object-curly-newline': ['error', { consistent: true }],

    // https://eslint.org/docs/rules/curly#consistent
    curly: ['error', 'multi', 'consistent'],

    // Enforce use of semicolons
    // https://eslint.org/docs/rules/semi#omitlastinonelineblock
    semi: ['error', 'never'],

    // https://eslint.org/docs/rules/max-len
    'max-len': ['error', { code: 150 }],

    // Structure module imports
    'import/order': ['error', {
      pathGroups: [
        {
          pattern: '@/composables/**',
          group: 'external',
          position: 'after',
        },
        {
          pattern: '@/components/**',
          group: 'external',
          position: 'after',
        },
      ],
      'newlines-between': 'never',
    }],

    // https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/no-v-html.md
    'vue/no-v-html': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
    '@typescript-eslint/explicit-function-return-type': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-ignore.md
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',

    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-unused-vars': 'off',

    // Disabled until https://github.com/nuxt/eslint-config/issues/216 is fixed
    'vue/no-multiple-template-root': 'off',

    // Rule conflicts with vue/no-v-for-template-key-on-child
    'vue/no-v-for-template-key': 'off',
  },
  overrides: [
    {
      files: [
        'src/pages/**/*.vue',
        'src/layouts/**/*.vue',
      ],
      rules: {
        'vue/multi-word-component-names': false,
      },
    },
  ],
}
