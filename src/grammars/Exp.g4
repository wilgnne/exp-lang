grammar Exp;

/*---------------- PARSER INTERNALS ----------------*/

@parser::header {
  import { exit } from 'process';
  var symbol_table = Array();
  var used_table = Array();
  let stack_curr = 0;
  let stack_max = stack_curr;

  let if_curr = 0;

  function updateStack(sideEffect) {
    // console.log("; ", stack_curr, stack_max, sideEffect)

    stack_curr += sideEffect;
    if (stack_curr > stack_max) {
      stack_max = stack_curr
    }
  }

  function getPrint() {
    console.log("    getstatic java/lang/System/out Ljava/io/PrintStream;");
    updateStack(1);
  }

  function printInt() {
    console.log("    invokevirtual java/io/PrintStream/print(I)V");
    console.log()
    updateStack(-2);
  }

  function printStr() {
    console.log("    invokevirtual java/io/PrintStream/print(Ljava/lang/String;)V");
    console.log()
    updateStack(-2);
  }

  function println() {
    console.log("    invokevirtual java/io/PrintStream/println()V");
    console.log()
    updateStack(-1);
  }
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
    console.log(".limit stack", stack_max);
    console.log(".limit locals", symbol_table.length);
    console.log(".end method");

    console.log();
    console.log("; symbol_table: " + symbol_table);
  };

statement:
	st_print
	| st_attrib {
    console.log();
  }
  | st_if;

st_print:
  PRINT OP_PAR {
    getPrint();
  } (expression {
    printInt();
    getPrint();
  } (COMMA {
    console.log('    ldc " "')
    updateStack(1)
    printStr();
    getPrint();
  } expression {
    printInt();
    getPrint();
  })*)? CL_PAR {
    println();
  };

st_attrib:
 	NAME ATTRIB expression {
    let index = symbol_table.indexOf($NAME.text);
    index = index !== -1 ? index : symbol_table.length;
    symbol_table[index] = $NAME.text;

    console.log("    istore", index);
    updateStack(-1);
  };

st_if:
  IF comparasion {
    const if_local = if_curr
    console.log(`NOT_IF_${if_curr}`)
    if_curr += 1
  } OP_CUR (statement)* CL_CUR {
    console.log(`NOT_IF_${if_local}:`);
  };

comparasion:
  expression (
    op = ( EQ | NE | GT | GE | LT| LE ) expression {
      const if_decoder = {
        [ExpParser.EQ]: "ne",
        [ExpParser.NE]: "eq",
        [ExpParser.GT]: "le",
        [ExpParser.GE]: "lt",
        [ExpParser.LT]: "ge",
        [ExpParser.LE]: "gt",
      }
      const op = if_decoder[$op.type];
      process.stdout.write(`    if_icmp${op} `);
    }
  );

expression:
	term (
		op = (PLUS | SUB) term {
      if ($op.type === ExpParser.PLUS) console.log("    iadd");
      if ($op.type === ExpParser.SUB)  console.log("    isub");
      updateStack(-1);
    }
	)*;

term:
	factor (
		op = (TIMES | DIV | MOD) factor {
      if ($op.type === ExpParser.TIMES) console.log("    imul");
      if ($op.type === ExpParser.DIV)   console.log("    idiv");
      if ($op.type === ExpParser.MOD)   console.log("    irem");
      updateStack(-1);
    }
	)*;

factor:
	NUMBER {
    console.log("    ldc " + $NUMBER.text);
    updateStack(1);
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
    updateStack(1);
  }
	| READ_INT OP_PAR CL_PAR {
    console.log("    invokestatic Runtime/readInt()I");
    updateStack(1);
  };
