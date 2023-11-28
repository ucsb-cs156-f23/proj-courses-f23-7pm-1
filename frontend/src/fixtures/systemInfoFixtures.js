export const developerFixtures = {
  springH2ConsoleEnabled: true,
  showSwaggerUILink: true,
  startQtrYYYYQ: "20084",
  endQtrYYYYQ: "20222",
  sourceRepo: "mocklink",
  commitSha: "4a3d0f9b2c23e2e4a1c1d3e4f5b6a7d8b9c0e1f2",
  commitMessage: "Test commit message 1",
};

const systemInfoFixtures = {
  showingBoth: {
    springH2ConsoleEnabled: true,
    showSwaggerUILink: true,
    startQtrYYYYQ: "20084",
    endQtrYYYYQ: "20222",
    sourceRepo: "mocklink",
  },
  showingNeither: {
    springH2ConsoleEnabled: false,
    showSwaggerUILink: false,
    startQtrYYYYQ: "20084",
    endQtrYYYYQ: "20222",
    sourceRepo: "mocklink",
  },
};

export { systemInfoFixtures };
