import path from 'path';
import build_run from "../build";

describe('Left Associativity', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'leftAssociativity.py'))
  });

  test('print 4 - 3 - 2 - 1', () => {
    expect(out[0]).toBe('-2');
  })

  test('print 8 / 4 / 2', () => {
    expect(out[1]).toBe('1');
  })

  test('print 987 % 654 % 321', () => {
    expect(out[2]).toBe('12');
  })
})
