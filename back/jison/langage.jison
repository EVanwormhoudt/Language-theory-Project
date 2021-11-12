
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
\n                    return '\n';
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
";"                   return ';';
"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';
"("                   return '(';
")"                   return ')';
"PI"                  return 'PI';
">"				  	  return 'SUP';
"Si"				  return 'SI';
"Alors"				  return 'ALORS';
"Sinon"				  return 'SINON';
"FinSi"				  return 'FINSI';
"E"                   return 'E';
<<EOF>>               return 'EOF';

/lex

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%token SUP
%token SI
%token ALORS
%token SINON
%token FINSI


%start bloc


%% /* language grammar */

bloc:
    |instruction bloc

    ;

instruction :
    e ';' {console.log($1);test();}
    |e ';' EOF {console.log($1);console.log("non");}

	|SI '(' e SUP e ')' '\n'
		ALORS '\n'
			bloc
		SINON '\n'
			bloc
		FINSI            { console.log("ici");  }
    ;



e
    : e '+' e
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
    | e '^' e
        {$$ = Math.pow($1, $3);}
    | '-' e %prec UMINUS
        {$$ = -$2;}
    | '(' e ')'
        {$$ = $2;}
    | NUMBER
        {$$ = Number(yytext);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;
