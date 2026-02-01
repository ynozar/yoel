#!/usr/bin/env node

import { hype, getHype } from './index.js';

const args = process.argv.slice(2);

const help = `
  🎉 yoel - Get hyped!

  Usage:
    yoel              Show a random hype message
    yoel --lowkey     Show a calmer, supportive message
    yoel --plain      No box, no rainbow, just vibes
    yoel --fire       Use fire frame 🔥
    yoel --rocket     Use rocket frame 🚀
    yoel --party      Use party frame 🎉
    yoel --count N    Show N messages
    yoel --help       Show this help

  Examples:
    npx yoel                    # Get hyped!
    npx yoel --lowkey           # Get gentle encouragement
    npx yoel --fire --count 3   # MAXIMUM HYPE

  Use as a module:
    import { hype, getHype } from 'yoel';

    hype();                          // Print colorful hype
    getHype({ rainbow: true });      // Get a rainbow message string
    getHype({ lowKey: true });       // Get gentle encouragement
`;

if (args.includes('--help') || args.includes('-h')) {
  console.log(help);
  process.exit(0);
}

const options = {
  lowKey: args.includes('--lowkey') || args.includes('--low-key'),
  rainbow: !args.includes('--plain'),
  box: !args.includes('--plain'),
  frame: 'stars',
  count: 1,
};

if (args.includes('--fire')) options.frame = 'fire';
if (args.includes('--rocket')) options.frame = 'rocket';
if (args.includes('--party')) options.frame = 'party';

const countIndex = args.indexOf('--count');
if (countIndex !== -1 && args[countIndex + 1]) {
  options.count = parseInt(args[countIndex + 1], 10) || 1;
}

hype(options);
