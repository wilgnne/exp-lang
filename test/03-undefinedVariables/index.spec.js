import path from 'path';
import build_run from "../build";

describe('Undefined Variables', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'undefinedVariables.exp'))
  });

  test("error: 'y' not defined at line 3", () => {
    expect(out[0]).toBe("error: 'y' not defined at line 3");
  })
})
