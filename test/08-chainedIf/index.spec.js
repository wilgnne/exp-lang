import path from 'path';
import build_run from "../build";

describe('Chained if', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'chainedIf.exp'))
  });

  test("if b <= c", () => {
    expect(out[0]).toBe("7");
  })

  test("No more outputs", () => {
    expect(out[1]).toBe("");
  })
})
