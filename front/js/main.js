var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");

class Instruction {
    constructor(code_, name_,value_) {
        this.code = code_;
        this.name = name_;
        this.value = parseInt(value_);
    }
}

class tmpIf {
    constructor(jc_, jmp_) {
        this.jc = jc_
        this.jmp = jmp_
    }
}

class tmpWhiles {
    constructor(jc_, jmp_) {
        this.js = jc_
        this.jmp = jmp_
    }
}

class tmpFor {
    constructor(var_, init_, fin_, incrementation_, jc_) {
        this.var = var_;
        this.init = init_;
        this.fin = fin_;
        this.incrementation = incrementation_;
        this.jc=jc_;
    }
}

let code_genere = [];
let ic=0;
let r1 = 0;
let r2 = 0;
let tabTmpIf = []
let CurseurIf = -1;
let tabTmpWhile = []
let CurseurWhile = -1;
let tabTmpFor = []
let CurseurFor = -1;
let variables = new Map();

function addTmpIf(){
    tabTmpIf.push(new tmpIf(0,0))
    CurseurIf++;
}

function addTmpWhile(){
    tabTmpWhile.push(new tmpWhyles(0,0))
    CurseurWhile++;
}

function addTmpFor(){
    tabTmpFor.push(new tmpFor("",0,0,0,0))
    CurseurFor++;
}

function test() {
    console.log("test");
}

document.getElementById("compilation").addEventListener('click', async () => {
    console.clear()
    langage.parse(editor.getValue());
    console.log(code_genere);
    await execution();
    console.log("loool")
    console.log(variables)
     InitCompilation();
})

document.getElementById("clear").addEventListener('click', () => {
    editor.setValue("");
})


function addInstruction(code,name,value){
    code_genere.push(new Instruction(code,name,value))
    ic++;
}


async function execution(){
    console.log(code_genere);
    let ic = 0;
    let pile = [];
    let pileVar = [];
    while(ic < code_genere.length) {
        let ins = code_genere[ic];
        switch (ins.name) {
            case 'NUM':
                console.log("On rentre un chiffre dans la pile")
                pile.push(ins.value);
                ic++;
                break;
            case 'VAR':
                if(variables.has(ins.code)){
                    pile.push(variables.get(ins.code));
                    console.log(ins.code ," " , variables.get(ins.code));
                    ic++;
                }
                else {
                    variables.set(ins.code, 0);
                    pile.push(variables.get(ins.code));
                    ic++;
                }
                break;
            case 'VARFOR':
                if(variables.has(ins.code)){
                    pile.push(variables.get(ins.code));
                    console.log(ins.code ," " , variables.get(ins.code));
                    ic++;
                }
                else {
                    variables.set(ins.code, 0);
                    pile.push(variables.get(ins.code));
                    ic++;
                }
                pileVar.push((ins.code));
                break;
            case 'ASSIGN':
                r1 = pile.pop();
                variables.set(ins.code, r1);
                ic++;
                break;
            case 'JMPCOND':
                //Teste de la condition
                r1 = pile.pop();
                if( r1 != 0){
                    console.log("Condition Vrai")
                    ic++;
                }
                else {
                    console.log("Condition fausse")
                    ic = ins.value;
                }
                break;
            case 'JMPCONDWHILE':
                r1 = pile.pop();
                if( r1 != 0){
                    ic++;
                }
                else {
                    console.log("Saute le while")
                    ic = ins.value;
                }
                break;
            case 'JMPENDWHILE':
                ic = ins.value;
            case 'WHILEFIRST':
                ic++;
                break;
            case 'JMP':
                // je récupère l'adresse à partir de la table
                ic = ins.value;
                break;
            case 'FINSIF':
                // je récupère l'adresse à partir de la table
                ic++;
                break;
            case 'MH':
                console.log("Ins : On anvance le personnage vers le haut");
                await player.children.entries[0].move("up")

                ic++;
                break;
            case 'MB':
                console.log("Ins : On anvance le personnage vers le bas")
                await player.children.entries[0].move("down")
                ic++;
                break;
            case 'MD':
                console.log("Ins : On anvance le personnage vers la droite")
                await player.children.entries[0].move("right")
                ic++;
                break;
            case 'MG':
                console.log("Ins : On anvance le personnage vers la gauche")
                await player.children.entries[0].move("left")
                ic++;
                break;
            case 'ADD':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r1+r2);
                console.log("addition entre ", r1, " et ", r2);
                ic++;
                break;
            case 'SUB':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r2-r1);
                console.log("soustration entre ", r1, " et ", r2);
                ic++;
                break;
            case 'MULT':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r1*r2);
                console.log("multiplication entre ", r1, " et ", r2);
                ic++;
                break;
            case 'DIV':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r2/r1);
                console.log("division entre ", r1, " et ", r2);
                ic++;
                break;
            case 'SUP':
                r1 = pile.pop();
                r2 = pile.pop();
                if(r2>r1){
                    pile.push(1);
                }
                else {
                    pile.push(0);
                }
                console.log("SUP entre ", r1, " et ", r2);
                ic++;
                break;
            case 'INF':
                r1 = pile.pop();
                r2 = pile.pop();
                if(r2<r1){
                    pile.push(1);
                }
                else {
                    pile.push(0);
                }
                console.log("INF entre ", r1, " et ", r2);
                ic++;
                break;
            case 'INFEGAL':
                r1 = pile.pop();
                r2 = pile.pop();
                if(r2<=r1){
                    pile.push(1);
                }
                else {
                    pile.push(0);
                }
                console.log("INF entre ", r1, " et ", r2);
                ic++;
                break;
            case 'SUPEGAL':
                r1 = pile.pop();
                r2 = pile.pop();
                if(r2>=r1){
                    pile.push(1);
                }
                else {
                    pile.push(0);
                }
                console.log("SUP entre ", r1, " et ", r2);
                ic++;
                break;
            case 'EGAL':
                r1 = pile.pop();
                r2 = pile.pop();
                if(r2==r1){
                    pile.push(1);
                }
                else {
                    pile.push(0);
                }
                console.log("egale entre ", r1, " et ", r2);
                ic++;
                break;
            case 'NOTEGAL':
                r1 = pile.pop();
                r2 = pile.pop();
                if(r2!=r1){
                    pile.push(1);
                }
                else {
                    pile.push(0);
                }
                console.log("pas egale entre ", r1, " et ", r2);
                ic++;
                break;
            case 'INC':
                r1 = pile.pop();
                variables.set(ins.code,variables.get(ins.code)+1);
                ic++;
                break;
            case 'PRINT':
                r1 = pile.pop();
                console.log("PRINT : ", r1);
                ic++;
                break;
            case 'POUR' :
                CurseurFor++;
                tabTmpFor[CurseurFor].var = pileVar.pop();
                tabTmpFor[CurseurFor].incrementation = pile.pop();
                tabTmpFor[CurseurFor].fin = pile.pop();
                tabTmpFor[CurseurFor].init = pile.pop();
                variables.set(tabTmpFor[CurseurFor].var,tabTmpFor[CurseurFor].init );
                console.log(variables, tabTmpFor[CurseurFor]);
                if(variables.get(tabTmpFor[CurseurFor].var)<tabTmpFor[CurseurFor].fin){
                    ic++;
                }
                else {
                    ic = ins.value;
                }
                break;
            case 'INCFOR' :
                variables.set(tabTmpFor[CurseurFor].var, variables.get(tabTmpFor[CurseurFor].var) +  tabTmpFor[CurseurFor].incrementation);
                console.log(variables.get(tabTmpFor[CurseurFor].var),tabTmpFor[CurseurFor].fin)
                if(variables.get(tabTmpFor[CurseurFor].var) <=  tabTmpFor[CurseurFor].fin) {
                    ic = ins.value;
                }
                else {
                    ic++;
                }
                break;
            case 'FINPOUR' :
                variables.delete(tabTmpFor[CurseurFor].var);
                CurseurFor--;
                ic++;
                break;
        }

    }
}

function InitCompilation(){
    code_genere = [];
    ic=0;
    r1 = 0;
    r2 = 0;
    tabTmpIf = []
    CurseurIf = -1;
    tabTmpWhile = []
    CurseurWhile = -1;
    tabTmpFor = []
    CurseurFor = -1;
    variables.clear();
}

/** instructions :
 * MH move(haut)
 * MB move(bas)
 * MD move(gauche)
 * MG move(droite)
 */

