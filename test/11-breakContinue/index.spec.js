import path from 'path';
import build_run from "../build";

describe('Break - Continue', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'breakContinue.exp'))
  });

  test("while n <= 5", () => {
    expect(out[0]).toBe("1");
    expect(out[1]).toBe("3");
  })

  test("No more outputs", () => {
    expect(out[2]).toBe("");
  })
})
