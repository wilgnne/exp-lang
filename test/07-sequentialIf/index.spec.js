import path from 'path';
import build_run from "../build";

describe('Sequential if', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'sequentialIf.exp'))
  });

  test("if x != y", () => {
    expect(out[0]).toBe("2");
  })

  test("x <= y", () => {
    expect(out[1]).toBe("4");
  })

  test("x >= y", () => {
    expect(out[2]).toBe("6");
  })
})
