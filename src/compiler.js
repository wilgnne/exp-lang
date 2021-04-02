import antlr4 from 'antlr4';
import ExpLexer from './antlr/ExpLexer.js';
import ExpParser from './antlr/ExpParser.js'
import readline from 'readline';
import fs from 'fs';

function compile(inputPath) {
    const input = fs.readFileSync(inputPath, 'utf-8')
    const chars = new antlr4.InputStream(input);
    const lexer = new ExpLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new ExpParser(tokens);
    parser.program();
}

export default compile;
