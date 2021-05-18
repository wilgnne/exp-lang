import { updateStack } from "./CompileTime.js";

export function readInt() {
  console.log("    invokestatic Runtime/readInt()I");
  updateStack(1);
}

export function readString() {
  console.log("    invokestatic Runtime/readString()Ljava/lang/String;");
  updateStack(1);
}

export function getPrint() {
  console.log("    getstatic java/lang/System/out Ljava/io/PrintStream;");
  updateStack(1);
}

export function printInt() {
  console.log("    invokevirtual java/io/PrintStream/print(I)V");
  console.log()
  updateStack(-2);
}

export function printStr() {
  console.log("    invokevirtual java/io/PrintStream/print(Ljava/lang/String;)V");
  console.log()
  updateStack(-2);
}

export function print(type) {
  if (type === 'int') {
    printInt()
  } else if (type === 'str') {
    printStr()
  }
}

export function println() {
  console.log("    invokevirtual java/io/PrintStream/println()V");
  console.log()
  updateStack(-1);
}
