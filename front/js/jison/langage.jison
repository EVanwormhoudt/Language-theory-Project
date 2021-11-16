
/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
"\n"                   return '\n';
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
";"                   return ';';
":"                   return ':';
"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"^"                   return '^';
"{"                   return '{';
"}"                   return '}';
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
"move"                return 'MOVE';
"haut"                return 'UP';
"bas"                 return 'DOWN';
"droite"              return 'RIGHT';
"gauche"              return 'LEFT';
"DEBUT SOURCE"        return 'DEBUT';
"FIN SOURCE"          return 'FIN';

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
%token MOVE
%token UP
%token DOWN
%token LEFT
%token RIGHT


%start bloc


%% /* language grammar */


bloc:
    |instruction bloc

    ;

instruction :'DEBUT' '{' {console.log("-----Debut du programme-----");}

            |'}' 'FIN' EOF {console.log("-----Fin du programme-----");}

            |MOVE '(' UP ')' ';' {console.log("move haut"); addInstruction(0,"MOVEUP");}
            |MOVE '(' DOWN ')' ';' {console.log("move bas");addInstruction(0,"MOVEDOWN");}
            |MOVE '(' LEFT ')' ';' {console.log("move gauche");addInstruction(0,"MOVELEFT");}
            |MOVE '(' RIGHT ')' ';' {console.log("move droite");addInstruction(0,"MOVERIGHT");}

            |SI '('  ')' ':'    
                ALORS ':'       
                    bloc
                SINON ':'       
                    bloc
                FINSI ';'   { console.log("Sinon");  }

            |e ';' {console.log($1);test();}

            |e ';' EOF {console.log($1);console.log("non");}
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
