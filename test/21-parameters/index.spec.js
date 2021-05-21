import path from 'path';
import build_run from "../build";

describe('Parameters', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'parameters.exp'))
  });

  test("Summary:", () => {
    expect(out[0]).toBe("Summary:");
  })

  test("The square is 64", () => {
    expect(out[1]).toBe("The square is 64");
  })


  test("The sum is equal to the product", () => {
    expect(out[2]).toBe("The sum is equal to the product");
  })

  test("No more outputs", () => {
    expect(out[3]).toBe("");
  })
})
