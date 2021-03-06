import compileTime, { updateStack } from "./CompileTime.js";
import { arrayGet, arrayLength, arrayPush, arraySet } from "./array.js";

export function attribution(type, name, line) {
  console.log('; attr', type);
  const upcode = {
    'int': 'istore',
    'str': 'astore',
    'array': 'astore',
    'void': '; error: void store'
  };

  if (type === 'void') {
    console.error(`error: the void type cannot be assigned in '${name.text}' at line ${line}`);
    compileTime.error = true;
    return;
  }

  let target = compileTime.symbol.find(value => value.name === name.text);

  if (target) {
    if (type === undefined) return;
    if (type === 'array') {
      console.error(`error: '${name.text}' is already declared at line ${line}`);
      compileTime.error = true;
      return;
    }
    if (target.type !== type) {
      console.error(`error: '${name.text}' is ${target.type} at line ${line}`);
      compileTime.error = true;
      return;
    }
  } else {
    target = {
      name: name.text,
      type: type,
      used: false,
      line: line
    };
    compileTime.symbol.push(target);
  }

  console.log(`    ${upcode[type]}`, compileTime.symbol.indexOf(target));
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
  if (operator.type === ExpParser.SUB) console.log("    isub");
  updateStack(-1);
}

export function term(ExpParser, operator, type1, type2, line) {
  if (type1 !== type2 || type1 !== 'int' || type2 !== 'int') {
    console.error(`error: cannot mix types at line ${line}`);
    compileTime.error = true;
  }
  if (operator.type === ExpParser.TIMES) console.log("    imul");
  if (operator.type === ExpParser.DIV) console.log("    idiv");
  if (operator.type === ExpParser.MOD) console.log("    irem");
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

  const returnType = {
    'push': 'array',
    'length': 'int',
    'get_item': 'int',
    'set_item': 'void'
  }

  const property = properties[type]
  const func = property ? property[propName] : undefined


  if (func) {
    const ret = func({ ...prop, line, name, type });
    console.log('; propty', ret);
    return ret;
  }

  if (type !== 'void') {
    console.error(`error: '${name}' is not array at line ${line}`)
    compileTime.error = true;
  }

  return returnType[propName];
}
