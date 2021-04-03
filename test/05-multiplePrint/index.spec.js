import path from 'path';
import build_run from "../build";

describe('Multiple Print', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'multiplePrint.py'))
  });

  test("print 2 4 8", () => {
    expect(out[0]).toBe("2 4 8");
  })

  test("print nothing", () => {
    expect(out[1]).toBe("");
  })
})
