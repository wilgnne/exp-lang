import compileTime, { updateStack } from "./CompileTime.js";
import { arrayGet, arrayLength, arrayPush, arraySet } from "./array.js";

export function attribution(type, name, line) {
  console.log('; attr', type);
  const upcode = {
    'int': 'istore',
    'str': 'astore',
    'array': 'astore'
  };

  let index = compileTime.symbol.table.indexOf(name.text);

  if (index !== -1) {
    if (type === undefined) return;
    if (type === 'array') {
      console.error(`error: '${name.text}' is already declared at line ${line}`);
      compileTime.error = true;
      return;
    }
    if (compileTime.symbol.type[index] !== type) {
      console.error(`error: '${name.text}' is ${compileTime.symbol.type[index]} at line ${line}`);
      compileTime.error = true;
      return;
    }
  }

  index = index !== -1 ? index : compileTime.symbol.table.length;
  compileTime.symbol.table[index] = name.text;
  compileTime.symbol.type[index] = type;
  compileTime.symbol.line[index] = line;

  console.log(`    ${upcode[type]}`, index);
  console.log();
  updateStack(-1);
}

export function comparasion(ExpParser, operator, type1, type2, line) {
  if (type1 !== type2 || type1 !== 'int' || type2 !== 'int') {
    console.error(`error: cannot mix types at line ${line}`);
    compileTime.error = true;
  }

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

export function expression(ExpParser, operator, type1, type2, line) {
  if (type1 !== type2 || type1 !== 'int' || type2 !== 'int') {
    console.error(`error: cannot mix types at line ${line}`);
    compileTime.error = true;
  }
  if (operator.type === ExpParser.PLUS) console.log("    iadd");
  if (operator.type === ExpParser.SUB)  console.log("    isub");
  updateStack(-1);
}

export function term(ExpParser, operator, type1, type2, line) {
  if (type1 !== type2 || type1 !== 'int' || type2 !== 'int') {
    console.error(`error: cannot mix types at line ${line}`);
    compileTime.error = true;
  }
  if (operator.type === ExpParser.TIMES) console.log("    imul");
  if (operator.type === ExpParser.DIV)   console.log("    idiv");
  if (operator.type === ExpParser.MOD)   console.log("    irem");
  updateStack(-1);
}

export function propty(name, type, propName, prop, line) {
  const properties = {
    'array': {
      'push': arrayPush,
      'length': arrayLength,
      'get_item': arrayGet,
      'set_item': arraySet
    }
  }
  const property = properties[type]
  const func = property ? property[propName] : undefined


  if (func) {
    const ret = func({ ...prop, line, name, type });
    console.log('; propty', ret);
    return ret;
  }

  if (type !== undefined) {
    console.error(`error: '${name}' is not array at line ${line}`)
    compileTime.error = true;
  }
}
