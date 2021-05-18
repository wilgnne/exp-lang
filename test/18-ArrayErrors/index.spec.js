import path from 'path';
import build_run from "../build";

describe('Type Cheking', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'ArrayErrors.exp'))
  });

  test('i = []', () => {
    expect(out[0]).toBe("error: 'i' is already declared");
  })

  test('a = [] ', () => {
    expect(out[1]).toBe("error: 'a' is already declared");
  })

  test('s = []', () => {
    expect(out[2]).toBe("error: 's' is already declared");
  })

  test('a = 2', () => {
    expect(out[3]).toBe("error: 'a' is array");
  })

  test('a = "X"', () => {
    expect(out[4]).toBe("error: 'a' is array");
  })

  test('a[a] = 2', () => {
    expect(out[5]).toBe("error: array index must be integer");
  })

  test('a[s] = 2', () => {
    expect(out[6]).toBe("error: array index must be integer");
  })

  test('i[0] = 2', () => {
    expect(out[7]).toBe("error: 'i' is not array");
  })

  test('a[0] = a', () => {
    expect(out[8]).toBe("error: 'a' is array");
  })

  test('a[0] = s', () => {
    expect(out[9]).toBe("error: 'a' is array");
  })

  test('s[0] = 2', () => {
    expect(out[10]).toBe("error: 'i' is not array");
  })

  test('x[0] = 2', () => {
    expect(out[11]).toBe("error: 'x' not defined");
  })

  test('i = a', () => {
    expect(out[12]).toBe("error: 'i' is integer");
  })

  test('i = i[0]', () => {
    expect(out[12]).toBe("error: 'i' is not array");
  })

  test('i = s[0]', () => {
    expect(out[12]).toBe("error: 's' is not array");
  })

  test('i = x[0]', () => {
    expect(out[12]).toBe("error: 'x' not defined");
  })

  test('i = i.length', () => {
    expect(out[12]).toBe("error: 'i' must be array");
  })

  test('i = s.length', () => {
    expect(out[12]).toBe("error: 'i' must be array");
  })

  test('i = x.length', () => {
    expect(out[12]).toBe("error: 'x' not defined");
  })

  test('print(a + a)', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test('print(a - i)', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test('print(i * a)', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test('print(a / s)', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test('print(8 % (a))', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test('while a > 2', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test('if 2 <= a', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test('if a == a', () => {
    expect(out[12]).toBe("error: cannot mix types");
  })

  test("No more outputs", () => {
    expect(out[13]).toBe("");
  })
})
