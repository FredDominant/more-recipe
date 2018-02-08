module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverge/',
    '/templates/',
    '/server/',
    '/client/js/tests/mocks',
    '/client/js/tests/setupTest.js',
    '/client/js/Index.jsx'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    // '<rootDir>/js/tests',
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  rootDir: 'client',
  roots: ['<rootDir>/js'],
  setupFiles: [
    '<rootDir>/js/tests/setupTest.js',
    '<rootDir>/js/tests/mocks/localStorage.mock.js'
  ],
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/js/tests/mocks/style.mock.js'
  },
  snapshotSerializers: ['enzyme-to-json/serializer']
};
