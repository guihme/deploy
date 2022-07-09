module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePathIgnorePatterns: ["/node_modules/"],
    testPathIgnorePatterns: ["/node_modules/"],
    testMatch: ["**/tests/**/*.spec.ts"],
    setupFilesAfterEnv: ["./jest.setup.env.js"],
    modulePaths: ["node_modules", "<rootDir>/src"],
    collectCoverageFrom: ["src/**/*.{ts,js,jsx}"],
  };
  