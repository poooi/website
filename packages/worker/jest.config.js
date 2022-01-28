/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'miniflare',
  testEnvironmentOptions: {
    bindings: { KEY: 'value' },
    kvNamespaces: ['TEST_NAMESPACE'],
  },
  moduleNameMapper: {
    '^__STATIC_CONTENT_MANIFEST$': '<rootDir>/jest/staticContentManifest.js',
  },
  testTimeout: 15 * 1000,
}
