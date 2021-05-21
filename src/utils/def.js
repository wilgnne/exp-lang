import compileTime, { updateStack } from "./CompileTime.js";

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

const typesMap = {
  'void': 'V',
  'int': 'I',
  'str': 'Ljava/lang/String;',
  'array': 'LRuntime/Array;'
}

export function defHeader(name, type = 'void') {
  type = type === null ? 'void' : type;
  if (hasDuplicates(compileTime.symbol.map(value => value.name))) {
    console.error(`error: parameter names must be unique`);
    compileTime.error = true;
  }

  const jvmType = typesMap[type]
  const parametersType = compileTime.symbol.map(value => value.type);
  const jvmArgs = parametersType.map(value => typesMap[value]).join('');

  if (compileTime.def.find(value => value.name === name)) {
    console.error(`error: function '${name}' is already declared`);
    compileTime.error = true;
  }

  console.log(`.method public static ${name}(${jvmArgs})${jvmType}`);
  console.log("");
  compileTime.def.push({ name, parametersType, type, returned: type === 'void' })
}

export function defReturn(expressionType) {
  expressionType = expressionType === null ? 'void' : expressionType;
  const def = compileTime.def[compileTime.def.length -1]
  const type = def.type;

  def.returned = true;

  if (expressionType !== type) {
    console.error(`error: return value must be of ${type} type`);
    compileTime.error = true;
  }

  const typesMap = {
    'void': '',
    'int': 'i',
    'str': 'a',
    'array': 'a'
  }

  console.log(`    ${typesMap[type]}return`);
}

export function defFooter(type) {
  type = type === null ? 'void' : type;
  const typesMap = {
    'void': '',
    'int': 'i',
    'str': 'a',
    'array': 'a'
  }

  const def = compileTime.def[compileTime.def.length -1]
  if (def.returned === false) {
    console.error(`error: missing return statement in returning function`);
    compileTime.error = true;
  }

  console.log(`    ${typesMap[type]}return`);
  console.log();
  console.log("    .limit stack", compileTime.stack.max);
  console.log("    .limit locals", compileTime.symbol.length);
  console.log(".end method");
  console.log("; symbol_table: ", compileTime.symbol.map(value => value.name));
  console.log();
  compileTime.symbol = [];
  compileTime.stack = {
    curr: 0,
    max: 0
  }
}

export function defCall(name) {
  const def = compileTime.def.find(value => value.name === name)
  if (def === undefined) {
    console.error(`error: function '${name}' is not declared`);
    compileTime.error = true;
    return 'void';
  }

  const callArgs = compileTime.args;
  const defArgs = def.parametersType;

  if (defArgs.length !== callArgs.length) {
    console.error(`error: wrong number of arguments`);
    compileTime.error = true;
    compileTime.args = [];
    return 'void';
  }

  if (JSON.stringify(defArgs) !== JSON.stringify(callArgs)) {
    console.error(`error: types don't match`);
    compileTime.error = true;
    compileTime.args = [];
    return 'void';
  }

  compileTime.args = [];

  const jvmArgs = defArgs.map(value => typesMap[value]).join('');
  const jvmType = typesMap[def.type]
  console.log(`    invokestatic ${compileTime.name}/${name}(${jvmArgs})${jvmType}`)

  updateStack(defArgs.length - def.type === 'void' ? 0 : 1)

  return def.type;
}

export function defParameters(name, type, line) {
  compileTime.symbol.push({ name, type, used: false, line });
}

export function defArgs(type) {
  compileTime.args.push(type)
}
