import path from 'path';
import build_run from "../build";

describe('Type Cheking', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'typeCheking.exp'))
  });

  test('a = "Z"', () => {
    expect(out[0]).toBe("error: 'a' is int");
  })

  test('b = x', () => {
    expect(out[1]).toBe("error: 'b' is int");
  })

  test('a = read_str()', () => {
    expect(out[2]).toBe("error: 'a' is int");
  })

  test('x = 4', () => {
    expect(out[3]).toBe("error: 'x' is str");
  })

  test('y = b', () => {
    expect(out[4]).toBe("error: 'y' is str");
  })

  test('x = read_int()', () => {
    expect(out[5]).toBe("error: 'x' is str");
  })

  test('print(a + x)', () => {
    expect(out[6]).toBe("error: cannot mix types");
  })

  test('print(b - y)', () => {
    expect(out[7]).toBe("error: cannot mix types");
  })

  test('print(x * "W")', () => {
    expect(out[8]).toBe("error: cannot mix types");
  })

  test('print(y / x)', () => {
    expect(out[9]).toBe("error: cannot mix types");
  })

  test('print(8 % (x))', () => {
    expect(out[10]).toBe("error: cannot mix types");
  })

  test('if a == x', () => {
    expect(out[11]).toBe("error: cannot mix types");
  })

  test('while y < 4', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test("No more outputs", () => {
    expect(out[13]).toBe("");
  })
})
