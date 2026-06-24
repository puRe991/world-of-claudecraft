#!/usr/bin/env node

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const parseMajor = (version) => {
  const match = String(version).match(/^(?:\D*)(\d+)/);
  return match ? Number.parseInt(match[1], 10) : Number.NaN;
};

let viteVersion = 'unknown';
try {
  ({ version: viteVersion } = require('vite/package.json'));
} catch (error) {
  console.warn(`Could not read installed Vite version: ${error instanceof Error ? error.message : String(error)}`);
}

const viteMajor = parseMajor(viteVersion);
const isWindowsIa32 = process.platform === 'win32' && process.arch === 'ia32';
const isRolldownOnlyVite = Number.isFinite(viteMajor) && viteMajor >= 8;

if (!isWindowsIa32 || !isRolldownOnlyVite) {
  process.exit(0);
}

const lines = [
  'Unsupported Node.js runtime for this dependency set.',
  '',
  `You are running 32-bit Node.js on Windows (process.arch is ia32) with Vite ${viteVersion}.`,
  'Vite 8 uses Rolldown, and Rolldown does not publish a win32-ia32 native binding.',
  'That causes npm run dev to fail with: Cannot find module @rolldown/binding-win32-ia32-msvc.',
  '',
  'Use the pinned Vite 7 dependency from package-lock.json, then reinstall dependencies:',
  '1. Delete node_modules.',
  '2. Run npm install.',
  '3. Run npm run dev again.',
  '',
  'If you intentionally upgraded to Vite 8 or newer, use 64-bit Windows Node.js instead.',
];

console.error(lines.join('\n'));
process.exit(1);
