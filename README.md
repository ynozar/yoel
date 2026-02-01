# yoel

Get hyped! A zero-dependency CLI tool and module that delivers colorful encouragement when you need it most.

## Install

```bash
npm install yoel
```

## CLI Usage

```bash
# Get a random hype message
npx yoel

# Sample output:
# ✨══════════════════════════════════════════✨
# ║ You're crushing it!                        ║
# ✨══════════════════════════════════════════✨

# Calmer, supportive messages
npx yoel --lowkey

# Different frame styles
npx yoel --fire    # 🔥
npx yoel --rocket  # 🚀
npx yoel --party   # 🎉

# Multiple messages
npx yoel --count 3

# Plain text (no box, no colors)
npx yoel --plain
```

## Module Usage

```javascript
import { hype, getHype, addMessage } from 'yoel';

// Print a colorful boxed message to console
hype();

// Get a message as a string
const message = getHype();

// Options
getHype({
  lowKey: true,      // Calmer messages
  rainbow: true,     // Rainbow text colors
  box: true,         // Wrap in ASCII box
  frame: 'fire'      // Box style: 'stars', 'fire', 'rocket', 'party'
});

// Print multiple messages
hype({ count: 3 });

// Add your own messages
addMessage("You're an absolute legend!");
addMessage("Take a break, you've earned it.", true); // lowKey
```

## API

### `hype(options?)`
Prints hype message(s) to console with rainbow colors and box by default.

### `getHype(options?)`
Returns a hype message string.

**Options:**
- `lowKey` (boolean) - Use calmer, supportive messages
- `rainbow` (boolean) - Apply rainbow colors to text
- `box` (boolean) - Wrap message in ASCII art box
- `frame` (string) - Box frame style: `'stars'`, `'fire'`, `'rocket'`, `'party'`
- `count` (number) - Number of messages (hype only)

### `getAllMessages(lowKey?)`
Returns array of all available messages.

### `addMessage(message, lowKey?)`
Add a custom message to the pool.

### `rainbowize(text)`
Apply rainbow colors to any string.

### `boxify(text, frame?)`
Wrap text in an ASCII art box.

## License

ISC
