#!/usr/bin/env node

import { existsSync } from 'node:fs';

try {
  process.loadEnvFile?.();
} catch {
  // .env is optional when DATABASE_URL is provided by the shell or host.
}
try {
  process.loadEnvFile?.('.env.local');
} catch {
  // .env.local is optional and must not be required for server startup.
}

if (process.env.DATABASE_URL) {
  process.exit(0);
}

const hasEnvFile = existsSync('.env');
const lines = [
  'DATABASE_URL is required before starting the game server.',
  '',
  hasEnvFile
    ? 'A .env file exists, but it does not define DATABASE_URL.'
    : 'No .env file was found in the project root.',
  '',
  'For local development with Docker Postgres:',
  '1. Copy the template into a local .env file:',
  '   Windows Command Prompt: copy .env.example .env',
  '   PowerShell: Copy-Item .env.example .env',
  '   macOS/Linux: cp .env.example .env',
  '2. Edit .env and set POSTGRES_PASSWORD to a long local password.',
  '3. Keep DATABASE_URL in .env using the same password.',
  '4. Start Postgres with: npm run db:up',
  '5. Start the server with: npm run server',
  '',
  'If Postgres is already running elsewhere, set DATABASE_URL in your shell before running npm run server.',
];

console.error(lines.join('\n'));
process.exit(1);
