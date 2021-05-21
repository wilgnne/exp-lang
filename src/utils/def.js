import compileTime from "./CompileTime.js";

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

const typesMap = {
  'void': 'V',
  'int': 'I',
  'str': 'Ljava/lang/String;',
  'array': 'LRuntime/Array;',
  null: 'V'
}

export function defHeader(name, type = 'void') {
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
  compileTime.def.push({ name, parametersType, type })
}

export function defFooter() {
  console.log("    return");
  console.log();
  console.log("    .limit stack", compileTime.stack.max);
  console.log("    .limit locals", compileTime.symbol.length);
  console.log(".end method");

  console.log();
  console.log("; symbol_table: ", compileTime.symbol.map(value => value.name));
  compileTime.symbol = [];
}

export function defCall(name) {
  const def = compileTime.def.find(value => value.name === name)
  if (def === undefined) {
    console.error(`error: function '${name}' is not declared`);
    compileTime.error = true;
    return;
  }

  const callArgs = compileTime.args;
  const defArgs = def.parametersType;

  console.log('; callArgs', callArgs, callArgs.length);
  console.log('; defArgs', defArgs, defArgs.length);

  if (defArgs.length !== callArgs.length ) {
    console.error(`error: wrong number of arguments`);
    compileTime.error = true;
    compileTime.args = [];
    return;
  }

  if (JSON.stringify(defArgs) !== JSON.stringify(callArgs)) {
    console.error(`error: types don't match`);
    compileTime.error = true;
    compileTime.args = [];
    return;
  }

  compileTime.args = [];

  const jvmArgs = defArgs.map(value => typesMap[value]).join('');
  const jvmType = typesMap[def.type]
  console.log(`    invokestatic ${compileTime.name}/${name}(${jvmArgs})${jvmType}`)
  return def.type;
}

export function defParameters(name, type, line) {
  compileTime.symbol.push({ name, type, used: false, line });
}

export function defArgs(type) {
  compileTime.args.push(type)
}
