import { exit } from 'process';
import compileTime from "./CompileTime.js";

export function programHeader() {
  // console.log(".source Test.src");
  // console.log(".class  public Test");
  console.log(".super  java/lang/Object");
  console.log();
  console.log(".method public <init>()V");
  console.log("    aload_0");
  console.log("    invokenonvirtual java/lang/Object/<init>()V");
  console.log("    return");
  console.log(".end method");
  console.log();

}

export function programFooter() {
  const [_, ...rest] = compileTime.symbol.table
  const difference = rest.filter(x => !compileTime.symbol.used.includes(x));
  difference.forEach(variable => {
    const line = compileTime.symbol.line[compileTime.symbol.table.indexOf(variable)];
    console.error(`error: '${variable}' is defined but never used at line ${line}`)
  })

  if (difference.length > 0) {
    compileTime.error = true;
  }
  if (compileTime.error)
    exit(1);
}
