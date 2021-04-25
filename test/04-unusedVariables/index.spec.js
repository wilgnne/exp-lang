import path from 'path';
import build_run from "../build";

describe('Unused Variables', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'unusedVariables.exp'))
  });

  test("Unused Variables: [ 'b' ]", () => {
    expect(out[0]).toBe("Unused Variables: [ 'b' ]");
  })
})
