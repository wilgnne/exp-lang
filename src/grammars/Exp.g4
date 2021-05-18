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
  readString,
  getPrint,
  print,
  printInt,
  printStr,
  println
} from '../utils/io.js';

import {
  number,
  string,
  name
} from '../utils/value.js';
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
READ_STR: 'read_str';

IF: 'if';
ELSE: 'else';

WHILE: 'while';
BREAK: 'break';
CONTINUE: 'continue';

NUMBER: '0' ..'9'+;
STRING: '"' ~('"')* '"';
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
		exp1 = expression { print($exp1.type); getPrint(); } (
			COMMA {
        console.log('    ldc " "')
        updateStack(1)
        printStr();
        getPrint();
      } exp2 = expression { print($exp2.type); getPrint(); }
		)*
	)? CL_PAR { println(); };

st_attrib:
	NAME ATTRIB exp = expression { attribution($exp.type, $NAME); };

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
	exp1 = expression (
		op = (EQ | NE | GT | GE | LT | LE)
    exp2 = expression { comparasion(ExpParser, $op, $exp1.type, $exp2.type); }
	);

expression
	returns[type]:
	t1 = term (
		op = (PLUS | SUB) t2 = term { expression(ExpParser, $op, $t1.type, $t2.type); }
	)* { $type = $t1.type; };

term
	returns[type]:
	f1 = factor (
		op = (TIMES | DIV | MOD) f2 = factor { term(ExpParser, $op, $f1.type, $f2.type); }
	)* { $type = $f1.type; };

factor
	returns[type]:
	NUMBER { number($NUMBER.text); $type = 'int'; }
	| STRING { string($STRING.text); $type = 'str'; }
	| OP_PAR exp = expression { $type = $exp.type; } CL_PAR
	| NAME { $type = name($NAME.text); }
	| READ_INT OP_PAR CL_PAR { readInt(); $type = 'int'; }
	| READ_STR OP_PAR CL_PAR { readString(); $type = 'str'; };
