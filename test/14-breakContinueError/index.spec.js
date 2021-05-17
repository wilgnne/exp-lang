import path from 'path';
import build_run from "../build";

describe('Break - Continue Error', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'breakContinueError.exp'))
  });

  test("Break Error", () => {
    expect(out[0]).toBe("error: cannot use break outside a loop");
  })

  test("Continue Error", () => {
    expect(out[1]).toBe("error: cannot use continue outside a loop");
  })

  test("No more outputs", () => {
    expect(out[2]).toBe("");
  })
})
