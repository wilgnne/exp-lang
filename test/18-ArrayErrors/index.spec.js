import path from 'path';
import build_run from "../build";

describe('Type Cheking', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'ArrayErrors.exp'))
  });

  test('i = []', () => {
    expect(out[0]).toBe("error: 'i' is already declared at line 8");
  })

  test('a = [] ', () => {
    expect(out[1]).toBe("error: 'a' is already declared at line 9");
  })

  test('s = []', () => {
    expect(out[2]).toBe("error: 's' is already declared at line 10");
  })

  test('a = 2', () => {
    expect(out[3]).toBe("error: 'a' is array at line 12");
  })

  test('a = "X"', () => {
    expect(out[4]).toBe("error: 'a' is array at line 13");
  })

  test('a[a] = 2', () => {
    expect(out[5]).toBe("error: array index must be integer at line 15");
  })

  test('a[s] = 2', () => {
    expect(out[6]).toBe("error: array index must be integer at line 16");
  })

  test('i[0] = 2', () => {
    expect(out[7]).toBe("error: 'i' is not array at line 18");
  })

  test('a[0] = a', () => {
    expect(out[8]).toBe("error: 'a' is array at line 19");
  })

  test('a[0] = s', () => {
    expect(out[9]).toBe("error: 'a' is array at line 20");
  })

  test('s[0] = 2', () => {
    expect(out[10]).toBe("error: 'i' is not array at line 21");
  })

  test('x[0] = 2', () => {
    expect(out[11]).toBe("error: 'x' not defined at line 22");
  })

  test('i = a', () => {
    expect(out[12]).toBe("error: 'i' is integer at line 24");
  })

  test('i = i[0]', () => {
    expect(out[12]).toBe("error: 'i' is not array at line 25");
  })

  test('i = s[0]', () => {
    expect(out[12]).toBe("error: 's' is not array at line 26");
  })

  test('i = x[0]', () => {
    expect(out[12]).toBe("error: 'x' not defined at line 27");
  })

  test('i = i.length', () => {
    expect(out[12]).toBe("error: 'i' must be array at line 29");
  })

  test('i = s.length', () => {
    expect(out[12]).toBe("error: 'i' must be array at line 30");
  })

  test('i = x.length', () => {
    expect(out[12]).toBe("error: 'x' not defined at line 31");
  })

  test('print(a + a)', () => {
    expect(out[12]).toBe("error: cannot mix types at line 35");
  })

  test('print(a - i)', () => {
    expect(out[12]).toBe("error: cannot mix types at line 36");
  })

  test('print(i * a)', () => {
    expect(out[12]).toBe("error: cannot mix types at line 37");
  })

  test('print(a / s)', () => {
    expect(out[12]).toBe("error: cannot mix types at line 38");
  })

  test('print(8 % (a))', () => {
    expect(out[12]).toBe("error: cannot mix types at line 39");
  })

  test('while a > 2', () => {
    expect(out[12]).toBe("error: cannot mix types at line 41");
  })

  test('if 2 <= a', () => {
    expect(out[12]).toBe("error: cannot mix types at line 46");
  })

  test('if a == a', () => {
    expect(out[12]).toBe("error: cannot mix types at line 49");
  })

  test("No more outputs", () => {
    expect(out[13]).toBe("");
  })
})
