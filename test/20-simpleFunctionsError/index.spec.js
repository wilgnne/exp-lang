import path from 'path';
import build_run from "../build";

describe('Simple Functions Error - ', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'simpleFunctionsError.exp'))
  });

  test("Function 'test' is already declared", () => {
    expect(out[0]).toBe("error: function 'test' is already declared");
  })

  test("Function 'sort' is not declared", () => {
    expect(out[1]).toBe("error: function 'sort' is not declared");
  })

  test("No more outputs", () => {
    expect(out[2]).toBe("");
  })
})
