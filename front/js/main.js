var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");


let socket = io();  

socket.on('choixlvl', (lvl) => {

    console.log("level : ",lvl);
    

    let title_target = document.getElementById("title_target");
    let desc_target = document.getElementById("desc_target");
    let rules = document.getElementById("rules");
    let txt_rules = document.getElementById("txt_rules");

    switch(lvl) {
        default:
            rules.innerHTML = "Règles - Astuces";
        case '1':
            title_target.innerHTML = "Objectif - Faire avancer le prisonnier"
            desc_target.innerHTML = "Completer la fonction moove et le main dans l'éditeur de code"

            
            txt_rules.innerHTML = "Aidez vous des commentaires ect..."
            break;
        case '2':
            title_target.innerHTML = "Objectif - Diriger vous vers la cour"
            desc_target.innerHTML = "Ecrire une fonction qui permet au prisonnier de se deplacer et d'atteindre la cour de la prison"

            txt_rules.innerHTML = "Etudier la prison ainsi que le code. Vous pouvez utiliser le code du niveau 1"
            break;
    }

});

class Instruction {
    constructor(code, name) {
      this.code = code;
      this.name = name;
    }
}
let code_genere = [];

function test() {
    console.log("test");
}

document.getElementById("compilation").addEventListener('click', () => {
    console.log(langage.parse(editor.getValue()));
    console.log(code_genere)
})

document.getElementById("clear").addEventListener('click', () => {
    editor.setValue("");
})


function addInstruction(code,name){
    code_genere.push(new Instruction(code,name))
}






