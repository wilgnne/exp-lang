import path from 'path';
import build_run from "../build";

describe('Test print stetimanet', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'print.py'))
  });

  test('print one number', () => {
    expect(out[0]).toBe('1');
  })

  test('print a sum', () => {
    expect(out[1]).toBe('3');
  })

  test('print a times', () => {
    expect(out[2]).toBe('4');
  })

  test('print a division', () => {
    expect(out[3]).toBe('3');
  })

  test('print a mod', () => {
    expect(out[3]).toBe('0');
  })

  test('print a simple equation', () => {
    expect(out[3]).toBe('5');
  })

  test('print a complex equation', () => {
    expect(out[3]).toBe('3');
  })
})
