module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/image.mock.ts',
    '.*\\.(css|less)$': '<rootDir>/tests/style.mock.ts'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom', 'jest-localstorage-mock'],
  globalSetup: '<rootDir>/tests/global-setup.ts',
  testMatch: ['<rootDir>/src/**/__tests__/*.spec.ts?(x)'],
  resetMocks: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!node_modules/**',
    '!src/__fixtures__/**',
    '!src/**/*.d.ts',
    '!src/**/*.styles.ts',
    '!src/**/styles.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
}
