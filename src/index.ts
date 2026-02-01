// ============================================
// EDIT YOUR INFO HERE
// ============================================
interface CardConfig {
  name: string;
  title: string;
  github: string | null;
  website: string | null;
  linkedin: string | null;
  twitter: string | null;
  email: string | null;
}

const card: CardConfig = {
  name: 'Yoel Nozar',
  title: 'Software Engineer',

  // Links (set to null to hide)
  github: 'ynozar',
  website: 'yoel.dev',
  linkedin: 'ynozar',
  twitter: null,
  email: null,
};

// ============================================
// ANSI color codes
// ============================================
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  white: '\x1b[97m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
  green: '\x1b[32m',
  magenta: '\x1b[35m',
} as const;

// ============================================
// Rendering utilities
// ============================================

function visibleLength(str: string): number {
  return str.replace(/\x1b\[[0-9;]*m/g, '').length;
}

function padEnd(str: string, len: number): string {
  const visible = visibleLength(str);
  return str + ' '.repeat(Math.max(0, len - visible));
}

// ============================================
// Business Card
// ============================================

interface Link {
  label: string;
  value: string;
  color: string;
}

export function renderCard(): string {
  const lines: string[] = [];
  const width = 48;
  const inner = width - 4;

  const topBorder = `${c.dim}┌${'─'.repeat(width - 2)}┐${c.reset}`;
  const botBorder = `${c.dim}└${'─'.repeat(width - 2)}┘${c.reset}`;
  const empty = `${c.dim}│${c.reset}${' '.repeat(width - 2)}${c.dim}│${c.reset}`;

  const line = (content: string): string => {
    const padded = padEnd(content, inner);
    return `${c.dim}│${c.reset}  ${padded}  ${c.dim}│${c.reset}`;
  };

  lines.push('');
  lines.push(topBorder);
  lines.push(empty);

  // Name
  lines.push(line(`${c.bold}${c.white}${card.name}${c.reset}`));

  // Title
  lines.push(line(`${c.cyan}${card.title}${c.reset}`));

  lines.push(empty);

  // Links
  const links: Link[] = [];
  if (card.github) links.push({ label: 'GitHub', value: `github.com/${card.github}`, color: c.white });
  if (card.website) links.push({ label: 'Web', value: card.website, color: c.green });
  if (card.linkedin) links.push({ label: 'LinkedIn', value: `linkedin.com/in/${card.linkedin}`, color: c.blue });
  if (card.twitter) links.push({ label: 'Twitter', value: `twitter.com/${card.twitter}`, color: c.cyan });
  if (card.email) links.push({ label: 'Email', value: card.email, color: c.magenta });

  const labelWidth = Math.max(...links.map((l) => l.label.length));

  for (const link of links) {
    const label = `${c.dim}${link.label.padEnd(labelWidth)}${c.reset}`;
    const value = `${link.color}${link.value}${c.reset}`;
    lines.push(line(`${label}  ${value}`));
  }

  lines.push(empty);
  lines.push(botBorder);
  lines.push('');

  return lines.join('\n');
}

export function printCard(): void {
  console.log(renderCard());
}

export default printCard;
