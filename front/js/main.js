var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setUseWorker(false);
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: false
});

var vitesse = 5;

var fin = false;

document.getElementById('back').style.visibility = 'hidden';
console.log(1)
let examples = ['DEBUTSOURCE {\n' + '\n' + 'move(bas);' + '\n' + 'move(droite);' + '\n' + 'move(gauche);' + '\n' + 'move(haut);' + '\n' + '\n' + '//après chaque instruction mettre un ;' + '\n' + '}FINSOURCE',
'DEBUTSOURCE {\n' + '\n' + '// pour i allant de (debut,fin,pas)' + '\n' + 'Pour i Allant De (1,15,1):\n' + '    move(droite);\n' + '\n' + 'FinPour;' + '\n' + '}FINSOURCE',
'DEBUTSOURCE {\n' + 'Si(test(haut)):' + '\n' + 'Alors:' + '\n' + '\t' + 'move(haut);' + '\n' + 'Sinon:' + '\n' + '\t' + 'move(bas);' + '\n' + 'FinSi;' + '\n' + '}FINSOURCE',
'DEBUTSOURCE {\n' + 'nbPas = 16;' + '//déclaration d\'une variable' + '\n' + 'nbPas++; //incrémente d\'un la variable' + '\n' + 'Afficher(nbPas);' + '\n \n' + '//utilisation de la variable dans les structures' + '\n' + 'Pour i Allant De (1,nbPas,1):' + '\n' + '\t' + 'move(haut);' + '\n' + 'FinPour' + '\n' + '}FINSOURCE',
'DEBUTSOURCE {\n' + 'Selon (var) :' + '\n' + 'cas (1): //si var vaut 1' + '\n' + '\tnbPas = 1;' + '\n\tPause; //facultatif' + '\ncas (2): //si var vaut 2' + '\n\tnbPas = 2;' + '\n\tPause;' + '\nDefaut: //si var  ne vaut ni 1 ni 2' + '\n\tnbPas = 6;' + '\n\tPause;' + '\nFinSelon;' + '\nAfficher(nbPas);' + '\n}FINSOURCE']

let liste = "\n" + "\n" + "\n" + "Liste des fonctions :" + "\n" + "Afficher(i) //permet d'afficher une varibale, un chiffre etc.." +
    "\n" + "move(haut) //permet de bouger le personnage dans la direction souhaitée" +
    "\n" + "test(haut) //fonction qui renvoie 0 si le personnage" + "\n" + " ne peut pas aller dans la direction souhaitée sinon 1";

let verifRecupMDPconsole = false;
let verifParlerMDPconsole = false;
document.getElementById("example").addEventListener('click', () => {
    document.getElementById('back').style.visibility = 'visible';
    document.getElementById("clear").disabled = true;
    document.getElementById("compilation").disabled = true;
    document.getElementById("example").disabled = true;
    let tmp = editor.getValue();
    editor.setValue(examples[lvl - 1] + liste);

    document.getElementById("back").addEventListener('click', () => {
        document.getElementById('back').style.visibility = 'hidden';
        document.getElementById("clear").disabled = false;
        document.getElementById("compilation").disabled = false;
        document.getElementById("example").disabled = false;
        editor.setValue(tmp);
    })


})

console.log(1)
var Range = function (startRow, startColumn, endRow, endColumn) {
    this.start = {
        row: startRow,
        column: startColumn
    };

    this.end = {
        row: endRow,
        column: endColumn
    };
};

(function () {
    this.isEqual = function (range) {
        return this.start.row === range.start.row &&
            this.end.row === range.end.row &&
            this.start.column === range.start.column &&
            this.end.column === range.end.column;
    };
    this.toString = function () {
        return ("Range: [" + this.start.row + "/" + this.start.column +
            "] -> [" + this.end.row + "/" + this.end.column + "]");
    };

    this.contains = function (row, column) {
        return this.compare(row, column) == 0;
    };
    this.compareRange = function (range) {
        var cmp,
            end = range.end,
            start = range.start;

        cmp = this.compare(end.row, end.column);
        if (cmp == 1) {
            cmp = this.compare(start.row, start.column);
            if (cmp == 1) {
                return 2;
            } else if (cmp == 0) {
                return 1;
            } else {
                return 0;
            }
        } else if (cmp == -1) {
            return -2;
        } else {
            cmp = this.compare(start.row, start.column);
            if (cmp == -1) {
                return -1;
            } else if (cmp == 1) {
                return 42;
            } else {
                return 0;
            }
        }
    };
    this.comparePoint = function (p) {
        return this.compare(p.row, p.column);
    };
    this.containsRange = function (range) {
        return this.comparePoint(range.start) == 0 && this.comparePoint(range.end) == 0;
    };
    this.intersects = function (range) {
        var cmp = this.compareRange(range);
        return (cmp == -1 || cmp == 0 || cmp == 1);
    };
    this.isEnd = function (row, column) {
        return this.end.row == row && this.end.column == column;
    };
    this.isStart = function (row, column) {
        return this.start.row == row && this.start.column == column;
    };
    this.setStart = function (row, column) {
        if (typeof row == "object") {
            this.start.column = row.column;
            this.start.row = row.row;
        } else {
            this.start.row = row;
            this.start.column = column;
        }
    };
    this.setEnd = function (row, column) {
        if (typeof row == "object") {
            this.end.column = row.column;
            this.end.row = row.row;
        } else {
            this.end.row = row;
            this.end.column = column;
        }
    };
    this.inside = function (row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isEnd(row, column) || this.isStart(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };
    this.insideStart = function (row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isEnd(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };
    this.insideEnd = function (row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isStart(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };
    this.compare = function (row, column) {
        if (!this.isMultiLine()) {
            if (row === this.start.row) {
                return column < this.start.column ? -1 : (column > this.end.column ? 1 : 0);
            }
        }

        if (row < this.start.row)
            return -1;

        if (row > this.end.row)
            return 1;

        if (this.start.row === row)
            return column >= this.start.column ? 0 : -1;

        if (this.end.row === row)
            return column <= this.end.column ? 0 : 1;

        return 0;
    };
    this.compareStart = function (row, column) {
        if (this.start.row == row && this.start.column == column) {
            return -1;
        } else {
            return this.compare(row, column);
        }
    };
    this.compareEnd = function (row, column) {
        if (this.end.row == row && this.end.column == column) {
            return 1;
        } else {
            return this.compare(row, column);
        }
    };
    this.compareInside = function (row, column) {
        if (this.end.row == row && this.end.column == column) {
            return 1;
        } else if (this.start.row == row && this.start.column == column) {
            return -1;
        } else {
            return this.compare(row, column);
        }
    };
    this.clipRows = function (firstRow, lastRow) {
        if (this.end.row > lastRow)
            var end = { row: lastRow + 1, column: 0 };
        else if (this.end.row < firstRow)
            var end = { row: firstRow, column: 0 };

        if (this.start.row > lastRow)
            var start = { row: lastRow + 1, column: 0 };
        else if (this.start.row < firstRow)
            var start = { row: firstRow, column: 0 };

        return Range.fromPoints(start || this.start, end || this.end);
    };
    this.extend = function (row, column) {
        var cmp = this.compare(row, column);

        if (cmp == 0)
            return this;
        else if (cmp == -1)
            var start = { row: row, column: column };
        else
            var end = { row: row, column: column };

        return Range.fromPoints(start || this.start, end || this.end);
    };

    this.isEmpty = function () {
        return (this.start.row === this.end.row && this.start.column === this.end.column);
    };
    this.isMultiLine = function () {
        return (this.start.row !== this.end.row);
    };
    this.clone = function () {
        return Range.fromPoints(this.start, this.end);
    };
    this.collapseRows = function () {
        if (this.end.column == 0)
            return new Range(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0);
        else
            return new Range(this.start.row, 0, this.end.row, 0);
    };
    this.toScreenRange = function (session) {
        var screenPosStart = session.documentToScreenPosition(this.start);
        var screenPosEnd = session.documentToScreenPosition(this.end);

        return new Range(
            screenPosStart.row, screenPosStart.column,
            screenPosEnd.row, screenPosEnd.column
        );
    };
    this.moveBy = function (row, column) {
        this.start.row += row;
        this.start.column += column;
        this.end.row += row;
        this.end.column += column;
    };

}).call(Range.prototype);
Range.fromPoints = function (start, end) {
    return new Range(start.row, start.column, end.row, end.column);
};


Range.comparePoints = function (p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
};

class fonction {
    constructor(name_, debut_, fin_) {
        this.debut = debut_;
        this.name = name_;
        this.fin=fin_;
        this.tabArguments = []
        this.return;
        this.mapReturn = new Map();
    }
}

class Instruction {
    constructor(code_, name_, value_) {
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
        this.jc = jc_;
    }
}

class tmpSwitch {
    constructor(var_, NbCase_, FinSwitch_) {
        this.var = var_;
        this.nbCase = NbCase_;
        this.tabCase = [];
        this.FinSwitch = FinSwitch_;
        this.default = -1;
    }
}
console.log(2)
let code_genere = [];
let ic = 0;
let r1 = 0;
let r2 = 0;
let tabTmpIf = []
let CurseurIf = -1;
let tabTmpWhile = []
let CurseurWhile = -1;
let tabTmpFor = []
let CurseurFor = -1;
let tabTmpSwitch = []
let CurseurSwitch = -1;
let tabFonctions = []
let CurseurFonctions = -1;
let variables = new Map();
let tableCode = [];
let tableRange = [];
let marker;
let retourhiglight = [];
var position = window.location.href.indexOf('?');

if (position != -1) {
    var lvl = "";
    var fin_url = window.location.href.substr(position + 1);
    fin_url = fin_url.replace(/-/g, " ");
    lvl = fin_url.substr(7);
}

function addFonctions(){
    tabFonctions.push(new fonction("",0))
    CurseurFonctions++;
}

function addTmpSwitch() {
    tabTmpSwitch.push(new tmpSwitch(0, 0, 0))
    CurseurSwitch++;
}

function addTmpIf() {
    tabTmpIf.push(new tmpIf(0, 0))
    CurseurIf++;
}

function addTmpWhile() {
    tabTmpWhile.push(new tmpWhiles(0, 0))
    CurseurWhile++;
}

function addTmpFor() {
    tabTmpFor.push(new tmpFor("", 0, 0, 0, 0))
    CurseurFor++;
}

console.log(3)
function parseCodeHighlight() {
    let tmp = editor.getValue().replace("DEBUTSOURCE {", "").replace("}FINSOURCE", "")
    let tmpTable;
    let length = 0;
    let ligne = 0;
    tmpTable = tmp.split(":");
    for (let i of tmpTable) {
        tableCode = [...tableCode, ...i.split(";")];
    }
    console.log(tableCode)

    tmpTable = tableCode; tableCode = [];
    for (let i of tmpTable) {
        tableCode = [...tableCode, ...i.split("\n")];
    }
    console.log(tableCode)
    for(let i of tableCode){

        if(i === "" || i === "\r" ){
            ligne++;
            length = 0;
        }
        else if(i === "Alors"){

        }
        else {
            console.log(i)
            console.log(ligne)
            tableRange.push(new Range(ligne, length, ligne, length + i.length + 1));
            length = i.length + 1;
            console.log(tableRange)
        }
    }

}

function adaptIndex() {
    let instruction = 0;
    for (let i in code_genere) {
        if (code_genere[i].name == "NUM" || code_genere[i].name == "INCFOR" || code_genere[i].name == "VARFOR" || code_genere[i].name == "SUP" || code_genere[i].name == "INF" || code_genere[i].name == "SUPEGAL" || code_genere[i].name == "INFEGAL" || code_genere[i].name == "EGAL" || code_genere[i].name == "NOTEGAL" || code_genere[i].name == "VAR" || code_genere[i].name == "SUB" || code_genere[i].name == "ADD" || code_genere[i].name == "MULT" || code_genere[i].name == "DIV") {
            retourhiglight.push(-1);
        }
        else {
            retourhiglight.push(instruction)
            instruction++;
        }
    }
    for(let i in code_genere){
        if(code_genere[i].name =="INCFOR"){
            console.log(retourhiglight[parseInt(i)+1]);
            retourhiglight[i] = retourhiglight[parseInt(i)+1];
        }
        if (code_genere[i].name == "VARFOR") {

            retourhiglight[i] = retourhiglight[parseInt(i) + 4];
            retourhiglight[parseInt(i) + 1] = retourhiglight[parseInt(i) + 3];
            retourhiglight[parseInt(i) + 2] = retourhiglight[parseInt(i) + 2];
            retourhiglight[parseInt(i) + 3] = retourhiglight[parseInt(i) + 1];
        }

    }

}
    console.log(1)
document.getElementById("compilation").addEventListener('click', async () => {
    //document.getElementById("compilation").disabled = true;
    verifRecupMDPconsole = false;
    verifParlerMDPconsole = false;

    let btnStyle = document.getElementById("compilation");
    btnStyle.style.color = 'grey';
    ClearConsole();
    parseCodeHighlight();
    try{
        langage.parse(editor.getValue());
    }
    catch (err){
        ErrorConsole(err.toString())
        console.log(err)
        marker = editor.getSession().addMarker(new Range(err.toString()[27]-1,0,err.toString()[27]-1,100000), "errorHighlight", "screenLine");
        return;
    }
    adaptIndex();
    console.log(code_genere)
    console.log(retourhiglight)
    console.log(tableRange)
    console.log(tabFonctions);
    console.log(tabTmpWhile);
    await execution();
    console.log(variables)
    InitCompilation();

    btnStyle.style.color = 'white';
})

document.getElementById("clear").addEventListener('click', () => {
    editor.setValue("DEBUTSOURCE{" +
        "\n" +
        "\n" +
        "\n" +
        "\n" +
        "}FINSOURCE");
})


function addInstruction(code, name, value) {
    code_genere.push(new Instruction(code, name, value))
    ic++;
}




async function execution(){
    CurseurFonctions=-1;
    let ic = 0;
    let pile = [];
    let pileVar = [];
    let pileFonction = [];
    let AppelFonction = [];
    console.log(code_genere)
    while (ic < code_genere.length && !fin) {
        let btnClear = document.getElementById("clear");
        btnClear.disabled = true;
        let ins = code_genere[ic];
        if(retourhiglight[ic] !== -1) {
            editor.getSession().removeMarker(marker);
            marker = editor.getSession().addMarker(tableRange[retourhiglight[ic]], "currentHighlight", "screenLine");

        }

        switch (ins.name) {
            case 'NUM':
                console.log("On rentre un chiffre dans la pile")
                console.log(ins.code);
                pile.push(ins.code);
                ic++;
                break;
            case 'VAR':
                if (variables.has(ins.code)) {
                    pile.push(variables.get(ins.code));
                    console.log(ins.code, " ", variables.get(ins.code));
                    ic++;
                }
                else {
                    variables.set(ins.code, 0);
                    pile.push(variables.get(ins.code));
                    ic++;
                }
                break;
            case 'VARFOR':
                if (variables.has(ins.code)) {
                    //pile.push(variables.get(ins.code));
                    console.log(ins.code, " ", variables.get(ins.code));
                    ic++;
                }
                else {
                    variables.set(ins.code, 0);
                    //pile.push(variables.get(ins.code));
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
                if (r1 != 0) {
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
                if (r1 != 0) {
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
            case 'TH':
                console.log("Ins : On anvance le personnage vers le haut");
                if(await game.scene.scenes[0].player.children.entries[0].testCollision("up")){
                    pile.push(0);
                }
                else {
                    pile.push(1);
                }
                ic++;
                break;
            case 'TB':
                console.log("Ins : On anvance le personnage vers le haut");
                if(await game.scene.scenes[0].player.children.entries[0].testCollision("down")){
                    pile.push(0);
                }
                else {
                    pile.push(1);
                }
                ic++;
                break;
            case 'TD':
                console.log("Ins : On anvance le personnage vers le haut");
                if(await game.scene.scenes[0].player.children.entries[0].testCollision("right")){
                    pile.push(0);
                }
                else {
                    pile.push(1);
                }
                ic++;
                break;
            case 'TG':
                console.log("Ins : On anvance le personnage vers le haut");
                if(await game.scene.scenes[0].player.children.entries[0].testCollision("left")){
                    pile.push(0);
                }
                else {
                    pile.push(1);
                }
                ic++;
                break;
            case 'MH':
                console.log("Ins : On anvance le personnage vers le haut");
                if(!(await game.scene.scenes[0].player.children.entries[0].move("up",1) )) {
                    editor.getSession().removeMarker(marker);
                    marker = editor.getSession().addMarker(tableRange[retourhiglight[ic]], "errorHighlight", "screenLine");
                    return -1;
                }
                ic++;
                break;
            case 'MB':
                console.log("Ins : On anvance le personnage vers le bas")

                if(!(await game.scene.scenes[0].player.children.entries[0].move("down",1) )){
                    editor.getSession().removeMarker(marker);
                    marker = editor.getSession().addMarker(tableRange[retourhiglight[ic]], "errorHighlight", "screenLine");
                    return -1;
                }


                //victory(lvl,game);

                ic++;
                break;
            case 'MD':
                console.log("Ins : On anvance le personnage vers la droite")
                if(!(await game.scene.scenes[0].player.children.entries[0].move("right",1) )){
                    editor.getSession().removeMarker(marker);
                    marker = editor.getSession().addMarker(tableRange[retourhiglight[ic]], "errorHighlight", "screenLine");
                    return -1;
                }

                //victory(lvl,game);
                ic++;
                break;
            case 'MG':
                console.log("Ins : On anvance le personnage vers la gauche")
                if(!(await game.scene.scenes[0].player.children.entries[0].move("left",1) )){
                    editor.getSession().removeMarker(marker);
                    marker = editor.getSession().addMarker(tableRange[retourhiglight[ic]], "errorHighlight", "screenLine");
                    return -1;
                }
                //victory(lvl,game);
                ic++;
                break;
            case 'ADD':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r1 + r2);
                console.log("addition entre ", r1, " et ", r2);
                ic++;
                break;
            case 'SUB':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r2 - r1);
                console.log("soustration entre ", r1, " et ", r2);
                ic++;
                break;
            case 'MULT':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r1 * r2);
                console.log("multiplication entre ", r1, " et ", r2);
                ic++;
                break;
            case 'DIV':
                r1 = pile.pop();
                r2 = pile.pop();
                pile.push(r2 / r1);
                console.log("division entre ", r1, " et ", r2);
                ic++;
                break;
            case 'SUP':
                r1 = pile.pop();
                r2 = pile.pop();
                if (r2 > r1) {
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
                if (r2 < r1) {
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
                if (r2 <= r1) {
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
                if (r2 >= r1) {
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
                if (r2 == r1) {
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
                if (r2 != r1) {
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
                variables.set(ins.code, variables.get(ins.code) + 1);
                ic++;
                break;
            case 'PRINT':
                let str = "";
                while(pile.length!=0){
                    str = str + pile.shift();
                }
                PrintConsole(str);
                ic++;
                break;
            case 'POUR':
                CurseurFor++;
                tabTmpFor[CurseurFor].var = pileVar.pop();
                tabTmpFor[CurseurFor].incrementation = pile.pop();
                tabTmpFor[CurseurFor].fin = pile.pop();
                tabTmpFor[CurseurFor].init = pile.pop();
                variables.set(tabTmpFor[CurseurFor].var, tabTmpFor[CurseurFor].init);
                console.log(variables, tabTmpFor[CurseurFor]);
                if (variables.get(tabTmpFor[CurseurFor].var) < tabTmpFor[CurseurFor].fin) {
                    ic++;
                }
                else {
                    ic = ins.value;
                }
                break;
            case 'INCFOR':
                variables.set(tabTmpFor[CurseurFor].var, variables.get(tabTmpFor[CurseurFor].var) + tabTmpFor[CurseurFor].incrementation);
                console.log(variables.get(tabTmpFor[CurseurFor].var), tabTmpFor[CurseurFor].fin)
                if (variables.get(tabTmpFor[CurseurFor].var) <= tabTmpFor[CurseurFor].fin) {
                    ic = ins.value;
                }
                else {
                    ic++;
                }
                break;
            case 'FINPOUR':
                variables.delete(tabTmpFor[CurseurFor].var);
                CurseurFor--;
                ic++;
                break;
            case 'SWITCH':
                CurseurSwitch++;
                tabTmpSwitch[CurseurSwitch].var = variables.get(pileVar.pop());
                ic++;
                break;
            case 'PAUSE':
                ic = tabTmpSwitch[CurseurSwitch].FinSwitch;
                break;
            case 'CASE':
                r1 = pile.pop();
                if (tabTmpSwitch[CurseurSwitch].var == r1) {
                    console.log("on rentre dans le case ", ins.value)
                    ic++;
                }
                else {
                    console.log("on saute le case ", ins.value)
                    if (ins.value < (tabTmpSwitch[CurseurSwitch].nbCase - 1)) {
                        console.log("on va au switch d'apres");
                        ic = tabTmpSwitch[CurseurSwitch].tabCase[ins.value + 1];
                    }
                    else {
                        console.log("son sort de switch");
                        if (tabTmpSwitch[CurseurSwitch].default != -1) {
                            ic = tabTmpSwitch[CurseurSwitch].default;
                        }
                        else {
                            ic = tabTmpSwitch[CurseurSwitch].FinSwitch;
                        }
                    }
                }
                break;
            case 'ENDSWITCH':

                CurseurSwitch=CurseurSwitch-1;
                break;
            case 'NEWFUNCTION':
                CurseurFonctions++;
                ic = tabFonctions[CurseurFonctions].fin;
                break;
            case 'FINDFONCTION':
                let NameFonction =  ins.code;

                let i = 0;

                let isLargeNumber = (element) => element.name == NameFonction;
                i=tabFonctions.findIndex(isLargeNumber);

                if(i >=0){
                    CurseurFonctions = i;
                    let tab = [];
                    while(pile.length!=0){
                        tab.push(pile.pop());
                    }
                    if(tab.length==tabFonctions[CurseurFonctions].tabArguments.length){
                        for(let j=0;j<tab.length;j++){
                            variables.set(tabFonctions[CurseurFonctions].tabArguments[j], tab[j]);
                        }
                        pileFonction.push(ic+1);
                        AppelFonction.push(CurseurFonctions);
                        ic = tabFonctions[CurseurFonctions].debut;
                        break;
                    }
                    else{
                        PrintConsole("ERROR :Fonction : "+ NameFonction + " Arguments");
                        ic++;
                        break;
                    }

                }
                else {
                    PrintConsole("ERROR :Fonction : "+ NameFonction + " Indefinie");
                    ic++;
                }
                break;
            case 'RETURN':
                let curseur = AppelFonction.pop();
                console.log("retuuuurn",ic);
                if((typeof tabFonctions[curseur].mapReturn.get(ic) )=="string"){
                    pile.push(variables.get(tabFonctions[curseur].mapReturn.get(ic)));
                }
                else {
                    pile.push(tabFonctions[curseur].mapReturn.get(ic));
                }
                for(let j = 0;j<tabFonctions[curseur].tabArguments.length;j++){
                    variables.delete(tabFonctions[curseur].tabArguments[j]);
                }
                ic = pileFonction.pop();
                break;
            case 'STRING':
                pile.push(ins.code.substring(1, ins.code.length-1));
                console.log(ins.code)
                ic++;
                break;
            case 'SPEAK':
                let MP = ins.code;
                //Fonction regarder si on est dans la zone et regarder si c'est le bon mp
                verifParlerMDPconsole = true;
                ic++;
                break;
            case 'GET':
                //Fonction regarder si on est dans la zone et retunrn la valeur
                verifRecupMDPconsole = true;

                let MP2 = isInArea();
                console.log("isareaaaa ", MP2)
                pile.push(MP2);
                ic++;
                break;
            default :
                ic++;
        }
        if(!(ins.name ==="MH"||ins.name ==="MD"||ins.name ==="MG"||ins.name ==="MD" ||ins.name ==="NUM"||ins.name ==="VAR"||ins.name ==="INF"||ins.name ==="SUP"||ins.name ==="SUPEGAL"||ins.name ==="INFEGAL"||ins.name ==="EGAL"||ins.name ==="NOTEGAL"||ins.name ==="ADD"||ins.name ==="SUB"||ins.name ==="MULT"||ins.name ==="DIV"))
            await new Promise(r => setTimeout(r, 500/vitesse));
            console.log(vitesse)
    }
    if (retourhiglight[ic] != -1) {
        editor.getSession().removeMarker(marker);
    }
    if(lvl != '8') {
        GameOver();

    }

}

function InitCompilation() {
    code_genere = [];
    ic = 0;
    r1 = 0;
    r2 = 0;
    tabTmpIf = []
    CurseurIf = -1;
    tabTmpWhile = []
    CurseurWhile = -1;
    tabTmpFor = []
    CurseurFor = -1;
    variables.clear();
    tabTmpSwitch = []
    CurseurSwitch = -1;
    tableRange = [];
    retourhiglight = [];
    tabFonctions = []
    CurseurFonctions = -1;
    fin = false;
}


/** instructions :
 * MH move(haut)
 * MB move(bas)
 * MD move(gauche)
 * MG move(droite)
 */




