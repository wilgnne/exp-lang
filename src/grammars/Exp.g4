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
  term,
  propty
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
  array,
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
OP_BRA: '[';
CL_BRA: ']';
ATTRIB: '=';
COMMA: ',';
DOT: '.';

PRINT: 'print';
READ_INT: 'read_int';
READ_STR: 'read_str';

IF: 'if';
ELSE: 'else';

WHILE: 'while';
BREAK: 'break';
CONTINUE: 'continue';

LENGTH: 'length';
PUSH: 'push';

NUMBER: '0' ..'9'+;
STRING: '"' ~('"')* '"';
NAME: 'a' ..'z'+;

/*---------------- PARSER RULES ----------------*/

program: { programHeader(); } main { programFooter(); };

main: { mainHeader(); } (statement)+ { mainFooter(); };

statement:
	st_print
	| st_attrib
	| expression { console.log('    pop') }
	| st_if
	| st_while
	| st_break
	| st_continue;

st_array_new: NAME ATTRIB OP_BRA CL_BRA;
st_array_push: NAME DOT PUSH OP_PAR expression CL_PAR;
st_array_set: NAME OP_BRA expression CL_BRA ATTRIB expression;

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

st_attrib: attr_direct | attr_index;

attr_direct:
	NAME ATTRIB exp = expression { attribution($exp.type, $NAME, $NAME.line); };

attr_index:
	f = factor OP_BRA index = expression CL_BRA ATTRIB value = expression { propty($f.type, 'set_item', { index: $index.type, value: $value.type })
		};

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
		op = (EQ | NE | GT | GE | LT | LE) exp2 = expression { comparasion(ExpParser, $op, $exp1.type, $exp2.type, $op.line);
			}
	);

expression
	returns[type]:
	t1 = term (
		op = (PLUS | SUB) t2 = term { expression(ExpParser, $op, $t1.type, $t2.type, $op.line); }
	)* { $type = $t1.type; };

term
	returns[type]:
	f1 = factor (
		op = (TIMES | DIV | MOD) f2 = factor { term(ExpParser, $op, $f1.type, $f2.type, $op.line); }
	)* { $type = $f1.type; };

factor
	returns[type]:
	fconst = fa_const { $type = $fconst.type; }
	| fvar = fa_var { $type = $fvar.type; }
	| io = fa_io { $type = $io.type; }
	| pr = propty { $type = $pr.type; };

fa_const
	returns[type]:
	NUMBER { number($NUMBER.text); $type = 'int'; }
	| STRING { string($STRING.text); $type = 'str'; }
	| OP_BRA CL_BRA { array(); $type = 'array'; };

fa_io
	returns[type]:
	READ_INT OP_PAR CL_PAR { readInt(); $type = 'int'; }
	| READ_STR OP_PAR CL_PAR { readString(); $type = 'str'; };

fa_var
	returns[type]:
	NAME { $type = name($NAME.text, $NAME.line); }
	| OP_PAR exp = expression { $type = $exp.type; } CL_PAR;

propty
	returns[type]:
	push = pr_push { $type = $push.type; }
	| len = pr_length { $type = $len.type; }
	| get = pr_get_item { $type = $get.type; };

pr_factor
	returns[type]:
	fconst = fa_const { $type = $fconst.type; }
	| fvar = fa_var { $type = $fvar.type; }
	| io = fa_io { $type = $io.type; };

pr_push
	returns[type]:
	f = pr_factor DOT PUSH OP_PAR exp = expression { $type = propty($f.type, 'push');
		} CL_PAR;

pr_length
	returns[type]:
	f = pr_factor DOT LENGTH { $type = propty($f.type, 'length'); };

pr_get_item
	returns[type]:
	f = pr_factor OP_BRA (exp = expression) CL_BRA { $type = propty($f.type, 'get_item', $exp.type)
		};
