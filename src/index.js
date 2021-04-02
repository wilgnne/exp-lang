import compile from './compiler.js';

if (process.argv.length < 3) {
    process.exit(1)
}

compile(process.argv[2]);
