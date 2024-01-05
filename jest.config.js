/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  coverageProvider: 'babel',
  roots: [
    '<rootDir>/src',
    '<rootDir>/tests'
  ],
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.spec.ts'],
  transform: {
    '\\.ts$': 'ts-jest'
  },
};

module.exports = config;
