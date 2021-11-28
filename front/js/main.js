var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");

class Instruction {
    constructor(code_, name_,value_) {
      this.code = code_;
      this.name = name_;
      this.value = parseInt(value_);
    }
}

let code_genere = [];
let pile = [];
let ic=0;
let jc = 0;
let jmp=0;
let r1 = 0;
let r2 = 0;

function test() {
    console.log("test");
}

document.getElementById("compilation").addEventListener('click', () => {
    langage.parse(editor.getValue());
    execution();
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
    while(ic < code_genere.length) {
        let ins = code_genere[ic];
        switch (ins.name) {
            case 'NUM':
              console.log("On rentre un chiffre dans la pile");
              pile.push(ins.value);
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
                player.children.entries[0].move("up")
                await new Promise(r => setTimeout(r, 200));
                ic++;
                break;
            case 'MB':
                console.log("Ins : On anvance le personnage vers le bas")
                player.children.entries[0].move("down")
                await new Promise(r => setTimeout(r, 1000));
                ic++;
                break;
            case 'MD':
                console.log("Ins : On anvance le personnage vers la droite")
                player.children.entries[0].move("right")
                await new Promise(r => setTimeout(r, 1000));
                ic++;
                break;
            case 'MG':
                console.log("Ins : On anvance le personnage vers la gauche")
                player.children.entries[0].move("left")
                await new Promise(r => setTimeout(r, 1000));
                ic++;
                break;
          }
    }
}

/** instructions :
 * MH move(haut)
 * MB move(bas)
 * MD move(gauche)
 * MG move(droite)
 */

