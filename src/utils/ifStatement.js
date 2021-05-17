import compileTime from "./CompileTime.js";

export function ifHeader() {
  const curr = compileTime.if.max
  compileTime.if.stack.push(curr)
  compileTime.if.stack.push(curr)
  console.log(`NOT_IF_${curr}`);
  compileTime.if.max += 1
}

export function ifElseHeader() {
  const curr = compileTime.if.max
  compileTime.if.stack.push(curr)
  console.log(`NOT_IF_${curr}`);
  compileTime.if.max += 1
}

export function ifFooter() {
  const currIf = compileTime.if.stack.pop()
  const targetElse = compileTime.if.stack[compileTime.if.stack.length -1]

  console.log(`    goto END_ELSE_${targetElse}\n`);
  console.log(`NOT_IF_${currIf}:`)
}

export function elseFooter() {
  console.log(`END_ELSE_${compileTime.if.stack.pop()}:\n`);
}
