import compileTime from "./CompileTime.js";

export function whileHeader() {
  const curr = compileTime.while.max;
  compileTime.while.stack.push(curr);
  console.log(`BEGIN_WHILE_${curr}:`);
  compileTime.while.max += 1;
}

export function whileComparasion() {
  const last = compileTime.while.stack.length - 1;
  const curr = compileTime.while.stack[last];

  console.log(`END_WHILE_${curr}\n`);
}

export function whileFooter() {
  const curr = compileTime.while.stack.pop();

  console.log(`    goto   BEGIN_WHILE_${curr}`)
  console.log(`END_WHILE_${curr}:`);
}

export function whileFlowControl(tag) {
  const last = compileTime.while.stack.length - 1;
  if (last < 0) {
    console.error(`error: cannot use ${tag === 'END' ? 'break' : 'continue'} outside a loop`)
    compileTime.error = true;
  }

  const curr = compileTime.while.stack[last]
  console.log(`    goto ${tag}_WHILE_${curr} ; ${tag === 'END' ? 'break' : 'continue'}`)
}
