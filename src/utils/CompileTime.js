const compileTime = {
  error: false,
  symbol: {
    table: [],
    type: [],
    used: [],
    line: []
  },
  stack: {
    curr: 0,
    max: 0
  },
  if: {
    stack: [],
    max: 0
  },
  while: {
    stack: [],
    max: 0
  }
}

export function updateStack(sideEffect) {
  compileTime.stack.curr += sideEffect;
  if (compileTime.stack.curr > compileTime.stack.max) {
    compileTime.stack.max = compileTime.stack.curr
  }
}

export default compileTime
