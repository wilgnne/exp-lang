import compileTime from "./CompileTime.js";

export function mainHeader() {
  console.log(".method public static main([Ljava/lang/String;)V");
  console.log("");
  compileTime.symbol.push({ name: 'args', type: 'str', used: true, line: 0 });
}

export function mainFooter() {
  console.log("    return");
  console.log();
  console.log("    .limit stack", compileTime.stack.max);
  console.log("    .limit locals", compileTime.symbol.length);
  console.log(".end method");

  console.log();
  console.log("; symbol_table: ", compileTime.symbol.map(value => value.name));
}
