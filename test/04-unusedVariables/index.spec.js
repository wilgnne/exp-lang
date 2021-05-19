import path from 'path';
import build_run from "../build";

describe('Unused Variables', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'unusedVariables.exp'))
  });

  test("error: 'b' is defined but never used", () => {
    expect(out[0]).toBe("error: 'b' is defined but never used at line 4");
  })
})
