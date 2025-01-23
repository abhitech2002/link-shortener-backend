module.exports = {
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Fixed the key name
    testMatch: ["**/?(*.)+(spec|test).js"],
    verbose: true,
    overageDirectory: "coverage",
}