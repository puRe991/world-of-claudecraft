#!/usr/bin/env node

const isUnsupportedWindowsIa32 = process.platform === 'win32' && process.arch === 'ia32';

if (!isUnsupportedWindowsIa32) {
  process.exit(0);
}

const lines = [
  'Unsupported Node.js runtime for this project.',
  '',
  'You are running 32-bit Node.js on Windows (process.arch is ia32).',
  'Vite 8 uses Rolldown, and Rolldown does not publish a win32-ia32 native binding.',
  'That causes npm run dev to fail with: Cannot find module @rolldown/binding-win32-ia32-msvc.',
  '',
  'Install the 64-bit Windows Node.js LTS build, then reinstall dependencies:',
  '1. Uninstall the existing 32-bit Node.js installation.',
  '2. Install the Windows x64 LTS installer from https://nodejs.org/.',
  '3. Verify with: node -p "process.platform + \':\' + process.arch"',
  '   Expected output: win32:x64',
  '4. Delete node_modules and package-lock.json only if it was generated on the 32-bit install.',
  '5. Run npm install, then npm run dev again.',
];

console.error(lines.join('\n'));
process.exit(1);
