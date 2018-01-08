module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverge/',
    '/templates/',
    '/server/'
  ],
  collectCoverageFrom: [
    '<rootDir>/js/tests',
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  rootDir: 'client',
  roots: ['<rootDir>/js/tests'],
  setupFiles: [
    '<rootDir>/js/tests/setupTest.js',
    '<rootDir>/js/mocks/localStorage.mock.js'
  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  snapshotSerializers: ['enzyme-to-json/serializer']
};

// module.exports = {
//   rootDir: 'client',
//   roots: ['<rootDir>/js/tests/'],
//   setupFiles: [
//     '<rootDir>/js/tests/setupTest.js'
//     // '<rootDir>/__mocks__/localStorage.mock.js',
//     // '<rootDir>/__mocks__/eventObject.mock.js'
//   ],
//   snapshotSerializers: ['enzyme-to-json/serializer'],
//   coveragePathIgnorePatterns: ['!<rootDir>/tests/setupTest.js'],
// };
