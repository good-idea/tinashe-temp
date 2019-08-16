module.exports = {
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testMatch: ['**/__tests__/**/*.test.tsx'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'coverage',
    '/__.*__/',
    'jest.config.js',
  ],
  testEnvironment: 'jsdom',
  // collectCoverageFrom: ['./src'],
  collectCoverageFrom: ['./src/**/*.{ts,tsx}'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
