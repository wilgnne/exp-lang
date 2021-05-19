import path from 'path';
import build_run from "../build";

describe('Array', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'array.exp'), '4\n')
  });

  test("Print [1, 4, 9, 16]", () => {
    expect(out[1]).toBe("[1, 4, 9, 16]");
  })

  test("No more outputs", () => {
    expect(out[2]).toBe("");
  })
})
