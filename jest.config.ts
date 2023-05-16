export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|js)x?$": "@swc/jest"  
    },
    testTimeout: 30000,
    setupFiles: ['dotenv/config'],
    testMatch: [
      '<rootDir>/src/tests/__test__/*.test.js',
      '<rootDir>/src/tests/__test__/*.test.tsx',
      '<rootDir>/**/tests/*.test.ts',
    ],
    moduleNameMapper: {
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/mocks/fileMocks.js',
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
  }