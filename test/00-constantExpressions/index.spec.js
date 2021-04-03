import path from 'path';
import build_run from "../build";

describe('Constant Expressions', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'constantExpressions.py'))
  });

  test('print 0', () => {
    expect(out[0]).toBe('0');
  })

  test('print 1 + 2 * 3 - 4', () => {
    expect(out[1]).toBe('3');
  })

  test('print 567 / 8 % 9', () => {
    expect(out[2]).toBe('7');
  })
})
