module.exports = {
    testEnvironment: "node",
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testMatch: ["**/?(*.)+(spec|test).js"],
    verbose: true,
    coverageDirectory: "coverage",
}