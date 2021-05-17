import compileTime from "./CompileTime.js";

export function mainHeader() {
  console.log(".method public static main([Ljava/lang/String;)V");
  compileTime.symbol.table.push('args')
}

export function mainFooter() {
  console.log("    return");
  console.log();
  console.log(".limit stack", compileTime.stack.max);
  console.log(".limit locals", compileTime.symbol.table.length);
  console.log(".end method");

  console.log();
  console.log("; symbol_table: ", compileTime.symbol.table.length);
}
