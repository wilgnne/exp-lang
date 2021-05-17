import { exit } from 'process';

import compileTime, { updateStack } from "./CompileTime.js";

export function number(value) {
  console.log("    ldc " + value);
  updateStack(1);
}

export function name(value) {
  const index = compileTime.symbol.table.indexOf(value);
    if (index === -1) {
      console.error("Undefined Variable:", value)
      exit(1)
    }
    compileTime.symbol.used[index] = value;

    console.log("    iload", index);
    updateStack(1);
}
