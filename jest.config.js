module.exports = async () => {
  return {
    testEnvironment: "node",
    collectCoverage: true,
    coverageReporters: ["lcov"],
    roots: ["test"],
    testMatch: ["test/*.test.js"]
  };
};