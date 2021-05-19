import path from 'path';
import build_run from "../build";

describe('Type Cheking', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'typeCheking.exp'))
  });

  test('a = "Z"', () => {
    expect(out[0]).toBe("error: 'a' is int at line 8");
  })

  test('b = x', () => {
    expect(out[1]).toBe("error: 'b' is int at line 9");
  })

  test('a = read_str()', () => {
    expect(out[2]).toBe("error: 'a' is int at line 10");
  })

  test('x = 4', () => {
    expect(out[3]).toBe("error: 'x' is str at line 14");
  })

  test('y = b', () => {
    expect(out[4]).toBe("error: 'y' is str at line 15");
  })

  test('x = read_int()', () => {
    expect(out[5]).toBe("error: 'x' is str at line 16");
  })

  test('print(a + x)', () => {
    expect(out[6]).toBe("error: cannot mix types at line 20");
  })

  test('print(b - y)', () => {
    expect(out[7]).toBe("error: cannot mix types at line 21");
  })

  test('print(x * "W")', () => {
    expect(out[8]).toBe("error: cannot mix types at line 22");
  })

  test('print(y / x)', () => {
    expect(out[9]).toBe("error: cannot mix types at line 23");
  })

  test('print(8 % (x))', () => {
    expect(out[10]).toBe("error: cannot mix types at line 24");
  })

  test('if a == x', () => {
    expect(out[11]).toBe("error: cannot mix types at line 26");
  })

  test('while y < 4', () => {
    expect(out[12]).toBe("error: cannot mix types at line 30");
  })

  test("No more outputs", () => {
    expect(out[13]).toBe("");
  })
})
