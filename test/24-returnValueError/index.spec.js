import path from 'path';
import build_run from "../build";

describe('Return Value Error', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'returnValueError.exp'))
    console.log(out);
  });

  test('return "ab"', () => {
    expect(out[0]).toBe("error: return value must be of int type");
  })

  test('return 0', () => {
    expect(out[1]).toBe("error: return value must be of void type");
  })

  test('def fy"', () => {
    expect(out[2]).toBe("error: missing return statement in returning function");
  })

  test('e = fx(1)', () => {
    expect(out[3]).toBe("error: the void type cannot be assigned in 'e' at line 15");
  })

  test('f = fy(1, 2)', () => {
    expect(out[4]).toBe("error: 'f' is str at line 20");
  })

  test('f = "ab"', () => {
    expect(out[5]).toBe("error: 'f' is defined but never used at line 19");
  })

  test("No more outputs", () => {
    expect(out[6]).toBe("");
  })
})
