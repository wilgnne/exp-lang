import path from 'path';
import build_run from "../build";

describe('Sequential while', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'sequentialWhile.exp'))
  });

  test("while n <= 2", () => {
    expect(out[0]).toBe("1");
    expect(out[1]).toBe("2");
  })

  test("while n >= 1", () => {
    expect(out[2]).toBe("3");
    expect(out[3]).toBe("2");
    expect(out[4]).toBe("1");
  })

  test("No more outputs", () => {
    expect(out[5]).toBe("");
  })
})
