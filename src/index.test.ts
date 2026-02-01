import { test } from 'node:test';
import assert from 'node:assert';
import { renderCard } from './index.js';

test('renderCard returns a string with name', () => {
  const result = renderCard();
  assert.strictEqual(typeof result, 'string');
  assert.ok(result.includes('Yoel Nozar'));
});

test('renderCard includes links', () => {
  const result = renderCard();
  assert.ok(result.includes('github.com'));
  assert.ok(result.includes('yoel.dev'));
  assert.ok(result.includes('linkedin.com'));
});

test('renderCard has box characters', () => {
  const result = renderCard();
  assert.ok(result.includes('┌'));
  assert.ok(result.includes('└'));
  assert.ok(result.includes('│'));
});
