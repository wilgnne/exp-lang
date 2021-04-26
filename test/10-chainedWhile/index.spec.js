import path from 'path';
import build_run from "../build";

describe('Chained while', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'chainedWhile.exp'))
  });

  test("print(total)", () => {
    expect(out[0]).toBe("1000000");
  })

  test("No more outputs", () => {
    expect(out[1]).toBe("");
  })
})
