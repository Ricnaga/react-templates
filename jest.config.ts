import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'json', 'text', 'text-summary'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/src/application/test/setup.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '\\.(jpg|jpeg|png)$': '<rootDir>/src/application/test/transform/index.js',
  },
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/screens/**/*.[jt]s?(x)',
    '<rootDir>/src/screens/**/components/**/*.[jt]s?(x)',
    '<rootDir>/src/shared/components/**/*.[jt]s?(x)',
    '!<rootDir>/src/screens/**/*.{spec,test}.[jt]s?(x)',
    '!<rootDir>/src/screens/index.[jt]s',
    '!<rootDir>/src/shared/components/**/*.{spec,test}.[jt]s?(x)',
    '!<rootDir>/src/shared/hooks/*.[jt]s',
  ],
};

export default config;
