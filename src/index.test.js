import { describe, it, expect } from 'vitest';

const add = (a, b) => parseInt(a) + parseInt(b)

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(add(1, 2)).toBe(3);
	});
	it('casts to the correct type when fed strings', () => {
		expect(add("1", "2")).toBe(3);
	});
});
