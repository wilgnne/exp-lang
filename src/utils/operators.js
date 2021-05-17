import compileTime, { updateStack } from "./CompileTime.js";

export function attribution(name) {
  let index = compileTime.symbol.table.indexOf(name.text);
  index = index !== -1 ? index : compileTime.symbol.table.length;
  compileTime.symbol.table[index] = name.text;

  console.log("    istore", index);
  console.log();
  updateStack(-1);
}

export function comparasion(ExpParser, operator) {
  const if_decoder = {
    [ExpParser.EQ]: "ne",
    [ExpParser.NE]: "eq",
    [ExpParser.GT]: "le",
    [ExpParser.GE]: "lt",
    [ExpParser.LT]: "ge",
    [ExpParser.LE]: "gt",
  }
  const op = if_decoder[operator.type];
  process.stdout.write(`\n    if_icmp${op} `);
}

export function expression(ExpParser, operator) {
  if (operator.type === ExpParser.PLUS) console.log("    iadd");
  if (operator.type === ExpParser.SUB)  console.log("    isub");
  updateStack(-1);
}

export function term(ExpParser, operator) {
  if (operator.type === ExpParser.PLUS) console.log("    iadd");
  if (operator.type === ExpParser.TIMES) console.log("    imul");
  if (operator.type === ExpParser.DIV)   console.log("    idiv");
  if (operator.type === ExpParser.MOD)   console.log("    irem");
  updateStack(-1);
}
