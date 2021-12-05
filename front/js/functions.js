function GameOver() {
    document.getElementById("popupGameOver").hidden = false;


    let btnClear = document.getElementById("clear");
    btnClear.disabled = true;
    let btnSubmit = document.getElementById("compilation");
    console.log(btnSubmit.disabled);
    btnSubmit.disabled = true;

    let objBTN = document.getElementById("objBTN");
    objBTN.disabled = true;
    let rulesBTN = document.getElementById("rulesBTN");
    rulesBTN.disabled = true;

    let example = document.getElementById("example");
    example.disabled = true;
    let back = document.getElementById("back");
    back.disabled = true;

    let tryAgain = document.getElementById('tryAgain');
    tryAgain.addEventListener('click', () => {
        if(lvl == "3"){
            game.scene.scenes[0].player.children.entries[0].x = 400-64 - (400-64)%64;
            game.scene.scenes[0].player.children.entries[0].y = 800-64 - (800-64)%64;
        }else{
            game.scene.scenes[0].player.children.entries[0].x = 400 - 400%64;
            game.scene.scenes[0].player.children.entries[0].y = 800 - 800%64;

        }

        document.getElementById("popupGameOver").hidden = true;

        document.getElementById("compilation").disabled = false;

        let btnClear = document.getElementById("clear");
        btnClear.disabled = false;

        let objBTN = document.getElementById("objBTN");
        objBTN.disabled = false;
        let rulesBTN = document.getElementById("rulesBTN");
        rulesBTN.disabled = false;

        let example = document.getElementById("example");
        example.disabled = false;
        let back = document.getElementById("back");
        back.disabled = false;
    });

    let leave = document.getElementById('leave3');
    leave.disabled = false;
    leave.addEventListener('click', () => {
        document.location.href = "../html/accueil.html";
    });
}

function Win() {
    document.getElementById("popupWin").hidden = false;

    let btnSubmit = document.getElementById("compilation");
    btnSubmit.disabled=true;
    btnSubmit.disabled = true;
    let btnClear = document.getElementById("clear");
    btnClear.disabled = true;

    let objBTN = document.getElementById("objBTN");
    objBTN.disabled = true;
    let rulesBTN = document.getElementById("rulesBTN");
    rulesBTN.disabled = true;

    let example = document.getElementById("example");
    example.disabled = true;
    let back = document.getElementById("back");
    back.disabled = true;

    let next = document.getElementById('next');
    next.addEventListener('click', () => {
        var position = window.location.href.indexOf('?');

        if (position != -1) {
            let lvl = "";
            var fin_url = window.location.href.substr(position + 1);
            fin_url = fin_url.replace(/-/g, " ");

            lvl = fin_url.substr(7);

            switch (lvl) {
                case '1':
                    document.location.href = "../html/lvl2.html?niveau=2";
                    break;
                case '2':
                    document.location.href = "../html/lvl3.html?niveau=3";
                    break;
                case '3':
                    document.location.href = "../html/lvl4.html?niveau=4";
                    break;
                case '4':
                    document.location.href = "../html/lvl5.html?niveau=4";
                    break;
                case '5':
                    document.location.href = "../html/lvl6.html?niveau=6";
                    break;
                case '6':
                    document.location.href = "../html/lvl7.html?niveau=7";
                    break;
                case '7':
                    document.location.href = "../html/lvl8.html?niveau=8";
                    break;
                case '8':
                    document.location.href = "../html/accueil.html";
                    break;
            }
        }
    });

    let leave = document.getElementById('leave3');
    leave.addEventListener('click', () => {
        leave.disabled = false;

        document.location.href = "../html/accueil.html";
    });
}

function PrintConsole(variable) {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var p = document.createElement("p");
    p.innerHTML = variable.toString();
    li.appendChild(p);
    ul.appendChild(li);
}

function ClearConsole() {
    document.getElementById("list").innerHTML = "";
}

function CollisionConsole() {
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var p = document.createElement("p");
    p.innerHTML = "ERROR : Collision area";
    li.appendChild(p);
    ul.appendChild(li);
}