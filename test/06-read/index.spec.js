import path from 'path';
import build_run from "../build";

describe('Read', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'read.exp'), '1\n2\n')
  });

  test("read 1 end 2 end add", () => {
    expect(out[0]).toBe("3");
  })
})
