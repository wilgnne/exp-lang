import path from 'path';
import build_run from "../build";

describe('parameters Error', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'parametersError.exp'))
  });

  test("error: parameter names must be unique", () => {
    expect(out[0]).toBe("error: parameter names must be unique");
  })

  test("error: wrong number of arguments", () => {
    expect(out[1]).toBe("error: wrong number of arguments");
  })

  test("error: wrong number of arguments", () => {
    expect(out[2]).toBe("error: wrong number of arguments");
  })

  test("error: wrong number of arguments", () => {
    expect(out[3]).toBe("error: wrong number of arguments");
  })

  test("error: wrong number of arguments", () => {
    expect(out[4]).toBe("error: wrong number of arguments");
  })

  test("error: types don't match", () => {
    expect(out[5]).toBe("error: types don't match");
  })

  test("error: types don't match", () => {
    expect(out[6]).toBe("error: types don't match");
  })

  test("error: types don't match", () => {
    expect(out[7]).toBe("error: types don't match");
  })

  test("No more outputs", () => {
    expect(out[8]).toBe("");
  })
})
