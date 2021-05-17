grammar Exp;

/*---------------- PARSER INTERNALS ----------------*/

@parser::header {
import { updateStack } from '../utils/CompileTime.js';

import { programHeader, programFooter } from '../utils/program.js';

import { mainHeader, mainFooter } from '../utils/main.js';

import {
  attribution,
  comparasion,
  expression,
  term
} from '../utils/operators.js';

import {
  ifHeader,
  ifElseHeader,
  ifFooter,
  elseFooter
} from '../utils/ifStatement.js';

import {
  whileHeader,
  whileComparasion,
  whileFooter,
  whileFlowControl
} from '../utils/whileStatemant.js';

import {
  readInt,
  getPrint,
  printInt,
  printStr,
  println
} from '../utils/io.js';

import {
  number,
  name
} from '../utils/value.js';

import { exit } from 'process';
}

@parser::members {
}

/*---------------- LEXER RULES ----------------*/
COMMENT: '#' ~('\n')* -> skip;
SPACE: (' ' | '\t' | '\r' | '\n')+ -> skip;

EQ: '==';
NE: '!=';
GT: '>';
GE: '>=';
LT: '<';
LE: '<=';

/* OPERATORS */
PLUS: '+';
SUB: '-';
TIMES: '*';
DIV: '/';
MOD: '%';
OP_PAR: '(';
CL_PAR: ')';
OP_CUR: '{';
CL_CUR: '}';
ATTRIB: '=';
COMMA: ',';

PRINT: 'print';
READ_INT: 'read_int';

IF: 'if';
ELSE: 'else';

WHILE: 'while';
BREAK: 'break';
CONTINUE: 'continue';

NUMBER: '0' ..'9'+;
NAME: 'a' ..'z'+;

/*---------------- PARSER RULES ----------------*/

program: { programHeader(); } main { programFooter(); };

main: { mainHeader(); } (statement)+ { mainFooter(); };

statement:
	st_print
	| st_attrib
	| st_if
	| st_while
	| st_break
	| st_continue;

st_print:
	PRINT OP_PAR { getPrint(); } (
		expression { printInt(); getPrint(); } (
			COMMA {
        console.log('    ldc " "')
        updateStack(1)
        printStr();
        getPrint();
      } expression { printInt(); getPrint(); }
		)*
	)? CL_PAR { println(); };

st_attrib: NAME ATTRIB expression { attribution($NAME); };

st_if:
	IF comparasion {ifHeader();} OP_CUR (statement*) (
		CL_CUR {ifFooter();} ELSE IF comparasion {ifElseHeader();} OP_CUR (
			statement*
		)
	)* {ifFooter();} (CL_CUR {} ELSE OP_CUR (statement*))? CL_CUR {elseFooter();};

st_while:
	WHILE { whileHeader(); } comparasion { whileComparasion(); } OP_CUR (
		statement*
	) CL_CUR { whileFooter(); };

st_break: BREAK { whileFlowControl('END'); };

st_continue: CONTINUE { whileFlowControl('BEGIN'); };

comparasion:
	expression (
		op = (EQ | NE | GT | GE | LT | LE) expression { comparasion(ExpParser, $op); }
	);

expression: term ( op = (PLUS | SUB) term { expression(ExpParser, $op); })*;

term: factor ( op = (TIMES | DIV | MOD) factor { term(ExpParser, $op); })*;

factor:
	NUMBER { number($NUMBER.text); }
	| OP_PAR expression CL_PAR
	| NAME { name($NAME.text); }
	| READ_INT OP_PAR CL_PAR { readInt(); };
