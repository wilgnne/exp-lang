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
  const target = compileTime.symbol.find(symbol => symbol.name === value);

  if (target === undefined) {
    console.error(`error: '${value}' not defined at line ${line}`)
    compileTime.error = true;
    return 'void';
  }
  target.used = true;

  const upcode = {
    'int': 'iload',
    'str': 'aload',
    'array': 'aload'
  };
  const type = target.type;

  console.log(`    ${upcode[type]}`, compileTime.symbol.indexOf(target));
  updateStack(1);
  return type;
}
