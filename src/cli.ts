#!/usr/bin/env node

import { printCard } from './index.js';

const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
  yoel - Yoel Nozar's digital business card

  Usage:
    npx yoel         Show the business card
    npx yoel --help  Show this help
`);
  process.exit(0);
}

printCard();
