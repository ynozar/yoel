// ANSI color codes for terminal fun
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const rainbow = [colors.red, colors.yellow, colors.green, colors.cyan, colors.blue, colors.magenta];

const hypeMessages = [
  "You're crushing it!",
  "That code is FIRE!",
  "Legend status: CONFIRMED",
  "Your commits bring joy to the universe",
  "10/10 would merge again",
  "You make bugs tremble in fear",
  "Stack Overflow wishes it had YOUR answers",
  "Your code is so clean it sparkles",
  "Future you will thank present you",
  "This is peak performance",
  "You're not just on fire, you ARE the fire",
  "Git blame? More like git FAME",
  "Senior devs study YOUR pull requests",
  "Rubber ducks ask YOU for debugging advice",
  "Your semicolons are perfectly placed",
  "Even your console.logs are inspiring",
  "You're the main character of this codebase",
  "They should name a design pattern after you",
  "Your code runs on first try... obviously",
  "NASA called, they want your error handling",
];

const lowKeyMessages = [
  "You got this.",
  "One step at a time.",
  "Progress, not perfection.",
  "Every expert was once a beginner.",
  "The bug will be found. You're close.",
  "Take a breath. You're doing fine.",
  "This too shall compile.",
  "Trust the process.",
];

const asciiFrames = {
  stars: {
    topLeft: '✨',
    topRight: '✨',
    bottomLeft: '✨',
    bottomRight: '✨',
    horizontal: '═',
    vertical: '║',
  },
  fire: {
    topLeft: '🔥',
    topRight: '🔥',
    bottomLeft: '🔥',
    bottomRight: '🔥',
    horizontal: '━',
    vertical: '┃',
  },
  rocket: {
    topLeft: '🚀',
    topRight: '🚀',
    bottomLeft: '🚀',
    bottomRight: '🚀',
    horizontal: '─',
    vertical: '│',
  },
  party: {
    topLeft: '🎉',
    topRight: '🎊',
    bottomLeft: '🎊',
    bottomRight: '🎉',
    horizontal: '~',
    vertical: '¦',
  },
};

function rainbowize(text) {
  return text
    .split('')
    .map((char, i) => `${rainbow[i % rainbow.length]}${char}`)
    .join('') + colors.reset;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Strip ANSI codes to get visible length
function visibleLength(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '').length;
}

function boxify(text, frame = 'stars') {
  const f = asciiFrames[frame] || asciiFrames.stars;
  const lines = text.split('\n');
  const maxLen = Math.max(...lines.map(l => visibleLength(l)));
  const pad = (s) => s + ' '.repeat(maxLen - visibleLength(s));

  const top = `${f.topLeft}${f.horizontal.repeat(maxLen + 2)}${f.topRight}`;
  const bottom = `${f.bottomLeft}${f.horizontal.repeat(maxLen + 2)}${f.bottomRight}`;
  const middle = lines.map(l => `${f.vertical} ${pad(l)} ${f.vertical}`).join('\n');

  return `${top}\n${middle}\n${bottom}`;
}

/**
 * Get a random hype message
 * @param {Object} options
 * @param {boolean} options.lowKey - Get a calmer, supportive message instead
 * @param {boolean} options.rainbow - Apply rainbow colors
 * @param {string} options.frame - Box frame style: 'stars', 'fire', 'rocket', 'party'
 * @param {boolean} options.box - Wrap in ASCII box
 * @returns {string} A hype message
 */
export function getHype(options = {}) {
  const { lowKey = false, rainbow: useRainbow = false, frame = 'stars', box = false } = options;

  let message = lowKey ? pick(lowKeyMessages) : pick(hypeMessages);

  if (useRainbow) {
    message = rainbowize(message);
  }

  if (box) {
    message = boxify(message, frame);
  }

  return message;
}

/**
 * Print hype directly to console with full effects
 * @param {Object} options - Same options as getHype, plus:
 * @param {number} options.count - Number of messages to show
 */
export function hype(options = {}) {
  const { count = 1, ...rest } = options;

  for (let i = 0; i < count; i++) {
    console.log(getHype({ ...rest, rainbow: rest.rainbow ?? true, box: rest.box ?? true }));
    if (i < count - 1) console.log('');
  }
}

/**
 * Get all available hype messages
 * @param {boolean} lowKey - Get low-key messages instead
 * @returns {string[]} Array of messages
 */
export function getAllMessages(lowKey = false) {
  return lowKey ? [...lowKeyMessages] : [...hypeMessages];
}

/**
 * Add a custom hype message
 * @param {string} message - The message to add
 * @param {boolean} lowKey - Add to low-key messages instead
 */
export function addMessage(message, lowKey = false) {
  if (lowKey) {
    lowKeyMessages.push(message);
  } else {
    hypeMessages.push(message);
  }
}

export { rainbowize, boxify };
export default hype;
