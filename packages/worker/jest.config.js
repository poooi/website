/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'miniflare',
  testEnvironmentOptions: {
    sitePath: '../web/build',
  },
  moduleNameMapper: {
    '^__STATIC_CONTENT_MANIFEST$': '<rootDir>/jest/staticContentManifest.js',
  },
  testTimeout: 15 * 1000,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
}
