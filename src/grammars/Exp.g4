grammar Exp;

/*---------------- PARSER INTERNALS ----------------*/

@parser::header {
  import { exit } from 'process';
  var symbol_table = Array();
  var used_table = Array();
}

@parser::members {
}

/*---------------- LEXER RULES ----------------*/
COMMENT: '#' ~('\n')* -> skip;
SPACE: (' ' | '\t' | '\r' | '\n')+ -> skip;

/* OPERATORS */
PLUS: '+';
SUB: '-';
TIMES: '*';
DIV: '/';
MOD: '%';
OP_PAR: '(';
CL_PAR: ')';
ATTRIB: '=';

PRINT: 'print';

NUMBER: '0' ..'9'+;
NAME: 'a' ..'z'+;

/*---------------- PARSER RULES ----------------*/

program:
	{
    // console.log(".source Test.src");
    // console.log(".class  public Test");
    console.log(".super  java/lang/Object");
    console.log();
    console.log(".method public <init>()V");
    console.log("    aload_0");
    console.log("    invokenonvirtual java/lang/Object/<init>()V");
    console.log("    return");
    console.log(".end method");
    console.log();
  } main {
    const [_, ...rest] = symbol_table
    const difference = rest.filter(x => !used_table.includes(x));
    if (difference.length !== 0) {
      console.error("Unused Variables:", difference)
      exit(2)
    }
  };

main:
	{
    console.log(".method public static main([Ljava/lang/String;)V");
    symbol_table.push('args')
  } (statement)+ {
    console.log("    return");
    console.log();
    console.log(".limit stack 10");
    console.log(".limit locals", symbol_table.length);
    console.log(".end method");

    console.log();
    console.log("; symbol_table: " + symbol_table);
  };

statement:
	st_print
	| st_attrib {
    console.log();
  };

st_print:
	PRINT OP_PAR {
    console.log("    getstatic java/lang/System/out Ljava/io/PrintStream;");
  } expression {
    console.log("    invokevirtual java/io/PrintStream/println(I)V");
  } CL_PAR;

st_attrib:
	NAME ATTRIB expression {
    let index = symbol_table.indexOf($NAME.text);
    index = index !== -1 ? index : symbol_table.length;
    symbol_table[index] = $NAME.text;

    console.log("    istore", index);
  };

expression:
	term (
		op = (PLUS | SUB) term {
      if ($op.type === ExpParser.PLUS) console.log("    iadd");
      if ($op.type === ExpParser.SUB)  console.log("    isub");
    }
	)*;

term:
	factor (
		op = (TIMES | DIV | MOD) factor {
      if ($op.type === ExpParser.TIMES) console.log("    imul");
      if ($op.type === ExpParser.DIV)   console.log("    idiv");
      if ($op.type === ExpParser.MOD)   console.log("    irem");
    }
	)*;

factor:
	NUMBER {
    console.log("    ldc " + $NUMBER.text);
    // symbol_table.push($NUMBER.text);
  }
	| OP_PAR expression CL_PAR
	| NAME {
    const index = symbol_table.indexOf($NAME.text);
    if (index === -1) {
      console.error("Undefined Variable:", $NAME.text)
      exit(1)
    }
    used_table[index] = $NAME.text;

    console.log("    iload", index);
  };
