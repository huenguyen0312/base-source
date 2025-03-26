module.exports = {
  extends: ['@commitlint/config-conventional'],
  // https://commitlint.js.org/#/reference-rules
  rules: {
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
  },
};
