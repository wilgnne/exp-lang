const compileTime = {
  symbol: {
    table: [],
    used: []
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

export default compileTime
