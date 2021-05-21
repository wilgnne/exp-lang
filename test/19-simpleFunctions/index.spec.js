import path from 'path';
import build_run from "../build";

describe('Simple Functions - ', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'simpleFunctions.exp'), '4\n')
  });

  test("Print please enter a positive integer:", () => {
    expect(out[0]).toBe("please enter a positive integer:");
  })


  test("Print divisors of 4 -> 1", () => {
    expect(out[1]).toBe("1");
  })

  test("Print divisors of 4 -> 2", () => {
    expect(out[2]).toBe("2");
  })

  test("Print divisors of 4 -> 4", () => {
    expect(out[3]).toBe("4");
  })

  test("Print 1234", () => {
    expect(out[4]).toBe("1234");
  })

  test("No more outputs", () => {
    expect(out[5]).toBe("");
  })
})
