import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  testEnvironment: "jsdom",
  coverageDirectory: "coverage",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-svg-transformer",
  },
  transformIgnorePatterns: ["node_modules/(?!(vite|another-package)/)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/src/**/*.(test|spec).(js|jsx|ts|tsx)"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
};

export default config;
