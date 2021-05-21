import compileTime, { updateStack } from './CompileTime.js';

export function arrayLength({ type, line, name }) {
  console.log('    invokevirtual Runtime/Array/length()I');
  updateStack(0);
  return 'int';
}

export function arrayPush({ value, line }) {
  if (value !== 'int') {
    console.error(`error: array value must be integer at line ${line}`);
    compileTime.error = true;
    return 'array';
  }
  console.log('    invokevirtual Runtime/Array/push(I)LRuntime/Array;')
  updateStack(-1);
  return 'array';
}

export function arrayGet({ array, index, line }) {
  if (index !== 'int') {
    console.error(`error: array index must be int at line ${line}`);
    compileTime.error = true;
    return 'int';
  }
  console.log('    invokevirtual Runtime/Array/get(I)I');
  updateStack(-1);
  return 'int';
}

export function arraySet({ index, value, line, name }) {
  if (index !== 'int') {
    console.error(`error: array index must be int at line ${line}`);
    compileTime.error = true;
    return 'void';
  }
  if (value !== 'int') {
    console.error(`error: '${name}' is array at line ${line}`);
    compileTime.error = true;
    return 'void';
  }
  console.log('    invokevirtual Runtime/Array/set(II)V');
  updateStack(-3);
  return 'void';
}

export function arrayToString() {
  console.log('    invokevirtual Runtime/Array/string()Ljava/lang/String;');
  updateStack(0);
}
