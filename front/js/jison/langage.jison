/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%
\s+                   /* skip whitespace */
"\n"                   return '\n';
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
";"                   return ';';
":"                   return ':';
">"                   return SUP;
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
">"                        return 'SUP';
"Si"                   return 'SI';
"Alors"                  return 'ALORS';
"Sinon"                  return 'SINON';
"FinSi"                  return 'FINSI';
"Pour"                return 'POUR';
"Faire"               return 'FAIRE';
"FinPour"             return 'FINPOUR';
"Fin Tant Que"             return 'FINTANTQUE';
"Allant De"           return 'ALLANT';
"A"                   return 'A';    
"E"                   return 'E';
<<EOF>>               return 'EOF';
"move"                return 'MOVE';
"haut"                return 'UP';
"bas"                 return 'DOWN';
"droite"              return 'RIGHT';
"gauche"              return 'LEFT';
"DEBUT SOURCE"        return 'DEBUT';
"FIN SOURCE"          return 'FIN';
"Tant que"            return 'TANTQUE';
"test"                return 'TEST';

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
%token POUR
%token FAIRE
%token ALLANT
%token A
%token FINPOUR
%token MOVE
%token UP
%token SUP
%token DOWN
%token LEFT
%token RIGHT
%token FINTANTQUE
%token TANTQUE
%token TEST


%start bloc


%% /* language grammar */

IF : SI '(' condition ')' ':'   {console.log("SI");addInstruction(0,"JMPCOND", 0); jc = ic} 
    ;

THEN : ALORS ':'
         {console.log("ALORS");}
    ;

ELSE :bloc SINON ':'
         {console.log("SINON");addInstruction(0,"JMP",0);jmp = ic;code_genere[jc-1].value = ic;}
    ;

ENDIF : bloc  FINSI {console.log("FINSI");code_genere[jmp-1].value = ic;addInstruction(0,"FINSIF", 0)};


FOR : POUR NUMBER ALLANT NUMBER A NUMBER ':' 
         {console.log("POUR");addInstruction(0,"POUR")}
    ;

WHILE : TANTQUE '(' condition ')' ':' {console.log("TANT QUE");addInstruction(0,"TANTQUE")}
      ;

bloc:
    |instruction bloc

    ;

condition:e      {}
        |e SUP e {}
        ;

instruction :'DEBUT' '{' {console.log("-----Debut du programme-----");}

            |'}' 'FIN' EOF {console.log("-----Fin du programme-----");}
            
            |IF THEN ELSE ENDIF {}
            |FOR bloc FINPOUR {console.log("FINPOUR");addInstruction(0,"FINPOUR")}
            |WHILE bloc FINTANTQUE {console.log("FINTANTQUE");addInstruction(0,"FINTANTQUE")}

            |MOVE '(' UP ')' ';' {addInstruction(0,"MH",0);}
            |MOVE '(' DOWN ')' ';' {addInstruction(0,"MB",0);}
            |MOVE '(' LEFT ')' ';' {addInstruction(0,"MG",0);}
            |MOVE '(' RIGHT ')' ';' {addInstruction(0,"MD,0");}

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
    | NUMBER {$$ = Number(yytext);addInstruction(0,"NUM", $1);}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
    ;