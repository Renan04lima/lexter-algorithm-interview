/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: 'babel',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
};

module.exports = config;
