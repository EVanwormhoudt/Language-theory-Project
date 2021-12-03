/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex

%%

"\n"                   return '\n';
[0-9]+("."[0-9]+)?\b  return 'NUMBER';
"Afficher"          return 'PRINT';
";"                   return ';';
","                   return ',';
":"                   return ':';
"=="                 return 'EGAL';
"="                   return '=';
">"                   return 'SUP';
"*"                   return 'MULT';
"/"                   return 'DIV';
"-"                   return 'SUB';
"++"                   return 'INC';
"+"                   return 'ADD';
"!="                  return 'NOTEGAL';
">="                   return 'SUPEGAL';
"<="                   return 'INFEGAL';
"^"                   return '^';
"{"                   return '{';
"}"                   return '}';
"("                   return '(';
")"                   return ')';
"PI"                  return 'PI';
">"                   return 'SUP';
"<"                   return 'INF';
"Selon"               return 'CHOIX';
"Cas"               return 'CAS';
"Defaut"               return 'DEFAUT';
"Pause"               return 'PAUSE';
"FinChoix"               return 'FINCHOIX';
"FinTantque"        return 'FINTANTQUE';
"FinPour"             return 'FINPOUR';
"Si"                  return 'SI';
"Alors"               return 'ALORS';
"Sinon"               return 'SINON';
"FinSi"               return 'FINSI';
"Pour"                return 'POUR';
"Faire"               return 'FAIRE';
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
"Tantque"            return 'TANTQUE';
"test"                return 'TEST';
[A-Za-z_][A-Za-z_0-9]* return 'VAR';
\s+                   /* skip whitespace */
/lex

/* operator associations and precedence */

%right ADD SUB   // N'oubliez pas de remettre left !
%left MULT DIV

%token CHOIX
%token PAUSE
%token DEFAUT
%token CAS
%token FINCHOIX
%token SUP
%token PRINT
%token INF
%token INFEGAL
%token SUPEGAL
%token EGAL
%token NOTEGAL
%token ADD
%token SUB
%token MULT
%token DIV
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
%token VAR


%start bloc


%% /* language grammar */

IF : SI '(' condition ')' ':'   {console.log("SI");addInstruction(0,"JMPCOND", 0);addTmpIf();tabTmpIf[CurseurIf].jc = ic;}
    ;

THEN : ALORS ':'
         {console.log("ALORS");}
    ;

ELSE :bloc SINON ':'
         {console.log("SINON");addInstruction(0,"JMP",0);tabTmpIf[CurseurIf].jmp = ic;code_genere[tabTmpIf[CurseurIf].jc-1].value = ic;}
    ;

ENDIF : bloc  FINSI {console.log("FINSI");code_genere[tabTmpIf[CurseurIf].jmp-1].value = ic;addInstruction(0,"FINSIF", 0);CurseurIf=CurseurIf-1;};

VARFOR : | VAR  {addInstruction($1,"VARFOR", 0);};


FOR : POUR VARFOR ALLANT '(' e ',' e ',' e ')' ':'
         {console.log("POUR");addTmpFor();console.log(CurseurFor);addInstruction(0,"POUR",0);tabTmpFor[CurseurFor].jc = ic-1;}
    ;


INC : bloc FINPOUR {console.log("INC");addInstruction(0,"INCFOR",0); code_genere[ic-1].value=tabTmpFor[CurseurFor].jc+1;code_genere[tabTmpFor[CurseurFor].jc].value=ic;}
        ;

ENDFOR : INC {console.log("INC");addInstruction(0,"FINPOUR",0);CurseurFor=CurseurFor-1;};

WHILE : WHILEFIRST '(' condition ')' ':' {console.log("TANT QUE");addInstruction(0,"JMPCONDWHILE",0);tabTmpWhile[CurseurWhile].jmp = ic-1;}
      ;

WHILEFIRST : TANTQUE {addTmpWhile();addInstruction(0,"WHILEFIRST",0);addTmpWhile(); tabTmpWhile[CurseurWhile].jc = ic;}
            ;
ENDWHILE :  bloc FINTANTQUE {console.log("Fin TANT QUE");addInstruction(0,"JMPENDWHILE",0);code_genere[ic-1].value = tabTmpWhile[CurseurWhile].jc-1;code_genere[tabTmpWhile[CurseurWhile].jmp].value = ic;CurseurWhile=CurseurWhile-1;}
      ;

SWITCH : CHOIX '(' VARFOR ')' ':' {console.log("CHOIX");addInstruction(0,"SWITCH",0);addTmpSwitch();}
        ;

CASE : CAS '('e ')' ':' {console.log("CASE");addInstruction(0,"CASE",tabTmpSwitch[CurseurSwitch].nbCase);tabTmpSwitch[CurseurSwitch].tabCase.push(ic-2);tabTmpSwitch[CurseurSwitch].nbCase++;}
    ;

DEFAULT : DEFAUT ':' {console.log("DEFAULT");addInstruction(0,"SWITCHDEFAULT",0);tabTmpSwitch[CurseurSwitch].default=ic-1}
        ;

ENDCASE :
        |PAUSE ';' {console.log("PAUSE");addInstruction(0,"PAUSE",0);}
        ;

ENDSWITCH : BLOCSWITCH DEFAULT bloc FINCHOIX {addInstruction(0,"ENDSWITCH",0);tabTmpSwitch[CurseurSwitch].FinSwitch = ic;CurseurSwitch=CurseurSwitch-1;}
            |BLOCSWITCH FINCHOIX {addInstruction(0,"ENDSWITCH",0);tabTmpSwitch[CurseurSwitch].FinSwitch = ic;CurseurSwitch=CurseurSwitch-1;}
            ;

INSTRUCTIONSWITCH : CASE bloc ENDCASE {}
                ;
BLOCSWITCH :
            |INSTRUCTIONSWITCH BLOCSWITCH
            ;


bloc:
    |instruction bloc
    ;

condition:e      {}
        |e SUP e {addInstruction(0,"SUP", 0);}
        |e INF e {addInstruction(0,"INF", 0);}
        |e SUPEGAL e {addInstruction(0,"SUPEGAL", 0);}
        |e INFEGAL e {addInstruction(0,"INFEGAL", 0);}
        |e EGAL e {addInstruction(0,"EGAL", 0);}
        |e NOTEGAL e {addInstruction(0,"NOTEGAL", 0);}
        ;

instruction :'DEBUT' '{' {console.log("-----Debut du programme-----");}

            |'}' 'FIN' EOF {console.log("-----Fin du programme-----");}

            |IF THEN ELSE ENDIF ';'{}
            |WHILE ENDWHILE ';'{}
            |FOR ENDFOR ';'{}
            |SWITCH ENDSWITCH';'{}

            |MOVE '(' UP ')' ';' {addInstruction(0,"MH",0);}
            |MOVE '(' DOWN ')' ';' {addInstruction(0,"MB",0);}
            |MOVE '(' LEFT ')' ';' {addInstruction(0,"MG",0);}
            |MOVE '(' RIGHT ')' ';' {addInstruction(0,"MD",0);}

            |PRINT '(' e ')' ';' {addInstruction(0,"PRINT",0);}

            |e ';' {console.log($1);test();}
            |VAR '=' e ';' {addInstruction($1,"ASSIGN",0 ); }
            |VAR INC ';'{addInstruction($1,"INC", 0);}

            |e ';' EOF {console.log($1);console.log("non");}
            ;


e   : e ADD e {addInstruction(0,"ADD", 0);}
    | NUMBER {$$ = Number(yytext);addInstruction(0,"NUM", yytext);}
    | VAR  {addInstruction($1,"VAR", 0);}
    | '(' e ')' {}
    | e SUB e {addInstruction(0,"SUB", 0);}
    | e MULT e    {addInstruction(0,"MULT", 0);}
    | e DIV e    {addInstruction(0,"DIV", 0);}
    ;
