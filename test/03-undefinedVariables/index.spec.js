import path from 'path';
import build_run from "../build";

describe('Undefined Variables', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'undefinedVariables.exp'))
  });

  test("Undefined Variable: y", () => {
    expect(out[0]).toBe('Undefined Variable: y');
  })
})
