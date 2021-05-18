import compileTime, { updateStack } from "./CompileTime.js";

export function number(value) {
  console.log("    ldc " + value);
  updateStack(1);
}

export function string(value) {
  console.log("    ldc " + value);
  updateStack(1);
}

export function name(value) {
  const index = compileTime.symbol.table.indexOf(value);
  if (index === -1) {
    console.error("Undefined Variable:", value)
    compileTime.error = true;
  }
  compileTime.symbol.used[index] = value;

  const upcode = {
    'int': 'iload',
    'str': 'aload'
  };
  const type = compileTime.symbol.type[index];

  console.log(`    ${upcode[type]}`, index);
  updateStack(1);
  return type;
}
