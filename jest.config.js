module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      tsConfig: {
        allowJs: true
      }
    }
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest']
  },
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    '@testing-library/jest-dom/extend-expect'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: ['src/v2/**/*.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95
    }
  }
}
