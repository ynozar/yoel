import { test } from 'node:test';
import assert from 'node:assert';
import { getHype, getAllMessages, addMessage, rainbowize, boxify } from './index.js';

test('getHype returns a string', () => {
  const result = getHype();
  assert.strictEqual(typeof result, 'string');
  assert.ok(result.length > 0);
});

test('getHype with lowKey option returns calmer message', () => {
  const lowKeyMessages = getAllMessages(true);
  const result = getHype({ lowKey: true });
  assert.ok(lowKeyMessages.some(msg => result.includes(msg)));
});

test('getAllMessages returns array of messages', () => {
  const messages = getAllMessages();
  assert.ok(Array.isArray(messages));
  assert.ok(messages.length > 0);
  assert.ok(messages.every(m => typeof m === 'string'));
});

test('addMessage adds custom message', () => {
  const before = getAllMessages().length;
  addMessage('Test hype message!');
  const after = getAllMessages().length;
  assert.strictEqual(after, before + 1);
});

test('rainbowize adds color codes', () => {
  const result = rainbowize('hello');
  assert.ok(result.includes('\x1b['));
  assert.ok(result.includes('\x1b[0m')); // reset code
});

test('boxify wraps text in box', () => {
  const result = boxify('test');
  assert.ok(result.includes('═') || result.includes('─'));
  assert.ok(result.includes('║') || result.includes('│'));
});

test('getHype with box option returns boxed message', () => {
  const result = getHype({ box: true });
  assert.ok(result.includes('\n')); // boxes have multiple lines
});

test('getHype with different frames works', () => {
  const frames = ['stars', 'fire', 'rocket', 'party'];
  for (const frame of frames) {
    const result = getHype({ box: true, frame });
    assert.ok(result.includes('\n'));
  }
});
