# Antlr4 with JavaScript Boilerplate

It's very simple to use, all the required and example boilerplate is already done with scripts to automate the process.

## Requirements

- NodeJS
- JDK 8 or 11
- Yarn or NPM

## Installation

On the root directory
```bash
yarn
# or
npm install
```

## Running

An script is already done, so running one command line is enough to run everything at once

```bash
yarn start [input_file.txt]
```
e.g
```bash
yarn start entries.txt
```

The script consists of three main steps

### ant
Consists of using the grammar file (`src/grammars/Exp.g4`) to generate the lexer and parser scripts,
which will be stored in the `src/antlr` folder.

```bash
yarn ant
```

### compiler
With the lexer and parser scripts created, we can then build our jvm assembly, for this we execute the compilation script, passing as argument our program.

```bash
yarn start entries.txt
```

### jasmin
Having the assembly in hand we can then assemble our program using jasmin.

```bash
yarn jasmin
```

## License

MIT

Copyright 2021

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.