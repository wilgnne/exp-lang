import path from 'path';
import build_run from "../build";

describe('Variables', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'variables.exp'))
  });

  test('print(x * 5)', () => {
    expect(out[0]).toBe('10');
  })

  test('print(4 + x * (3 - y))', () => {
    expect(out[1]).toBe('8');
  })

  test('print(x)', () => {
    expect(out[2]).toBe('6');
  })
})
