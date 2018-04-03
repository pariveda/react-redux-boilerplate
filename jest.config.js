module.exports = {
  cacheDirectory: './.jest-cache',
  transform: {
    '.(ts|tsx)$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'app', 'app/redux'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/types/**',
    '!**/*types.ts',
    '!**/index.d.ts',
    '!**/node_modules/**',
    '!**/*stories.tsx',
    '!**/scripts/*.ts',
  ],
  coverageThreshold: {
    global: {
      statements: 57,
      lines: 59,
    },
  },
  coverageReporters: ['text-summary'],
  globals: {
    'ts-jest': {
      tsConfigFile: '.storybook/tsStories.json',
      useBabelrc: true,
    },
  },
  testRegex: '((\\\\|/)__tests__(\\\\|/).*|\\.(test|spec))\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: './setupTest.ts',
};
