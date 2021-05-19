import compileTime, { updateStack } from "./CompileTime.js";

export function number(value) {
  console.log("    ldc " + value);
  updateStack(1);
}

export function string(value) {
  console.log("    ldc " + value);
  updateStack(1);
}

export function array () {
  console.log("    new Runtime/Array");
  console.log("    dup");
  console.log("    invokespecial Runtime/Array/<init>()V");
  updateStack(1);
}

export function name(value, line) {
  const index = compileTime.symbol.table.indexOf(value);
  if (index === -1) {
    console.error(`Undefined Variable: ${value} at line ${line}`)
    compileTime.error = true;
  }
  compileTime.symbol.used[index] = value;

  const upcode = {
    'int': 'iload',
    'str': 'aload',
    'array': 'aload'
  };
  const type = compileTime.symbol.type[index];

  console.log(`    ${upcode[type]}`, index);
  updateStack(1);
  return type;
}
