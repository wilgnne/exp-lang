import path from 'path';
import build_run from "../build";

describe('String', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'string.exp'))
  });

  test("This is just a test!", () => {
    expect(out[0]).toBe("This is just a test!");
  })

  test("No more outputs", () => {
    expect(out[1]).toBe("");
  })
})
