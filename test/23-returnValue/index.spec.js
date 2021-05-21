import path from 'path';
import build_run from "../build";

describe('Return Value', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'returnValue.exp'))
  });

  test("factorial(5)", () => {
    expect(out[0]).toBe("120");
  })

  test("No more outputs", () => {
    expect(out[1]).toBe("");
  })
})
