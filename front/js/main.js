var editor = ace.edit("editor");
editor.setTheme("ace/theme/chaos");

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






