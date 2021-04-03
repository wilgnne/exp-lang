import path from 'path'
import compile from './compiler.js';

if (process.argv.length < 3) {
    process.exit(1)
}

const name = path.basename(process.argv[2]).split('.')[0]

// HEADER
console.log(`.source ${name}.src`);
console.log(`.class  public ${name}`);

compile(process.argv[2]);
