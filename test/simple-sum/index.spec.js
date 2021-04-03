import path from 'path';
import build_run from '../build'

describe('simple-sum', () => {
  let out

  beforeAll(() => {
    out = build_run(path.resolve(__dirname, 'simpleSum.py'))
  });

  test('adds 1 + 2 to equal 3', () => {
    expect(out[0]).toBe('3');
  })
})
