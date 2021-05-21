grammar Exp;

/*---------------- PARSER INTERNALS ----------------*/

@parser::header {
import compileTime, { updateStack } from '../utils/CompileTime.js';

import { programHeader, programFooter } from '../utils/program.js';

import { mainHeader, mainFooter } from '../utils/main.js';

import {
  defHeader,
  defFooter,
  defCall,
  defParameters,
  defArgs
} from '../utils/def.js';

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
DDOT: ':';

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

DEF: 'def';

NUMBER: '0' ..'9'+;
STRING: '"' ~('"')* '"';
NAME: 'a' ..'z'+;

/*---------------- PARSER RULES ----------------*/

program: { programHeader(); } (def)* main { programFooter(); };

def:
	DEF NAME OP_PAR (parameters)? CL_PAR ( DDOT t = NAME)? OP_CUR { defHeader($NAME.text, $t.text); } (
		statement
	)* CL_CUR { defFooter(); };

parameters:
	n1 = NAME DDOT t1 = NAME { defParameters($n1.text, $t1.text); } (
		COMMA n2 = NAME DDOT t2 = NAME { defParameters($n2.text, $t2.text); }
	)*;

main: { mainHeader(); } (statement)* { mainFooter(); };

statement:
	st_print
	| st_attrib
  | st_call
	| exp = expression { if ($exp.type !== 'void') console.log('    pop'); }
	| st_if
	| st_while
	| st_break
	| st_continue;

st_call: NAME OP_PAR (args)? CL_PAR { defCall($NAME.text); };

args: exp1 = expression { defArgs($exp1.type); } (COMMA exp2 = expression { defArgs($exp2.type); })*;

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
	f = factor line = OP_BRA index = expression CL_BRA ATTRIB value = expression { propty($f.text, $f.type, 'set_item', { index: $index.type, value: $value.type }, $line.line)
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
	pr = propty { $type = $pr.type; }
	| f = fac { $type = $f.type; };

fac
	returns[type, text]:
	fconst = fa_const {
    $type = $fconst.type;
    $text = $fconst.text;
  }
	| fvar = fa_var {
    $type = $fvar.type;
    $text = $fvar.text;
  }
	| io = fa_io {
    $type = $io.type;
    $text = $io.text;
  };

fa_const
	returns[type, text]:
	NUMBER {
    number($NUMBER.text);
    $type = 'int';
    $text = $NUMBER.text
  }
	| STRING {
    string($STRING.text);
    $type = 'str';
    $text = $STRING.text
  }
	| OP_BRA CL_BRA {
    array();
    $type = 'array';
    $text = '[]';
  };

fa_io
	returns[type, text]:
	READ_INT OP_PAR CL_PAR {
    readInt();
    $type = 'int';
    $text = 'read_int()';
  }
	| READ_STR OP_PAR CL_PAR {
    readString();
    $type = 'str';
    $text = 'read_str()';
  };

fa_var
	returns[type, text]:
	NAME {
    $type = name($NAME.text, $NAME.line);
    $text = $NAME.text;
  }
	| OP_PAR exp = expression {
    $type = $exp.type;
    $text = 'expression result';
  } CL_PAR;

propty
	returns[type]:
	f = fac ret = rc_prop[localctx.f] { $type = $ret.type; };

rc_prop[father]
	returns[type]:
	push = pr_push[father] (
		prop = rc_prop[localctx.push]
	)? { $type = localctx.prop ? $prop.type : $push.type }
	| len = pr_length[father] (
		prop = rc_prop[localctx.len]
	)? { $type = localctx.prop ? $prop.type : $len.type }
	| get = pr_get_item[father] (
		prop = rc_prop[localctx.get]
	)? { $type = localctx.prop ? $prop.type : $get.type };

pr_push[father]
	returns[type]:
	line = DOT PUSH OP_PAR exp = expression { $type = propty(father.text, father.type, 'push', { value: $exp.type }, $line.line);
		} CL_PAR;

pr_length[father]
	returns[type]:
	line = DOT LENGTH { $type = propty(father.text, father.type, 'length', {}, $line.line); };

pr_get_item[father]
	returns[type]:
	line = OP_BRA (exp = expression) CL_BRA { $type = propty(father.text, father.type, 'get_item', { index: $exp.type }, $line.line)
		};
