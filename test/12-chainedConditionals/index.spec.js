import path from 'path';
import build_run from "../build";

describe('Chained conditionals', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'chainedConditionals.exp'))
  });

  test("else", () => {
    expect(out[0]).toBe("1");
  })

  test("No more outputs", () => {
    expect(out[1]).toBe("");
  })
})
