import path from 'path';
import build_run from "../build";

describe('else if', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'elseIf.exp'))
  });

  test("else if", () => {
    expect(out[0]).toBe("2");
  })

  test("No more outputs", () => {
    expect(out[1]).toBe("");
  })
})
