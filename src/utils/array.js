import compileTime, { updateStack } from './CompileTime.js';

export function arrayLength() {
  console.log('    invokevirtual Runtime/Array/length()I');
  updateStack(0);
  return 'int';
}

export function arrayPush() {
  console.log('    invokevirtual Runtime/Array/push(I)LRuntime/Array;')
  updateStack(-1);
  return 'array';
}

export function arrayGet(indexType) {
  if (indexType !== 'int') {
    console.error(`error: array index must be integer`);
    compileTime.error = true;
    return;
  }
  console.log('    invokevirtual Runtime/Array/get(I)I');
  updateStack(-1);
  return 'int';
}

export function arraySet({ index, value }) {
  if (index !== 'int') {
    console.error(`error: array index must be integer`);
    compileTime.error = true;
    return;
  }
  if (value !== 'int') {
    console.error(`error: array value must be integer`);
    compileTime.error = true;
    return;
  }
  console.log('    invokevirtual Runtime/Array/set(II)V');
  updateStack(-3);
  return 'int';
}

export function arrayToString() {
  console.log('    invokevirtual Runtime/Array/string()Ljava/lang/String;');
  updateStack(0);
}
