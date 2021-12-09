function GameOver() {
    document.getElementById("popupGameOver").hidden = false;

    verifRecupMDP, verifRecupMDPconsole, verifParlerMDPconsole = false;

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
    fin = true;
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
        let position = window.location.href.indexOf('?');

        if (position != -1) {
            let lvl = "";
            let fin_url = window.location.href.substr(position + 1);
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
                    document.location.href = "../html/lvl8.html?niveau=8";
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
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML=variable.toString();
    li.appendChild(p);
    ul.appendChild(li);
}

function ClearConsole() {
    document.getElementById("list").innerHTML = "";
}

function CollisionConsole() {
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    let p = document.createElement("p");
    p.innerHTML="ERROR : Collision area";
    li.appendChild(p);
    ul.appendChild(li);
}

function ErrorConsole(err){
    let tab=["\n",'nombre',"Afficher",";",",",":","==","=",">","*","/","-","++","+","!=",">=","<=","^","{","}","(",")","PI",">","<","Selon","Cas","Defaut","Pause","FinChoix","FinTantque","FinPour","Si","Alors","Sinon","FinSi","Pour","Faire","Allant De","A","E","<<EOF>>","move","haut","bas","droite","gauche","DEBUTSOURCE","FINSOURCE","Tantque","test","variable","\s+"];
    err = err.split("\n")
    console.log(err[0][27])
    let testParser = {"error":2,"IF":3,"SI":4,"(":5,"condition":6,")":7,":":8,"THEN":9,"ALORS":10,"ELSE":11,"bloc":12,"SINON":13,"ENDIF":14,"FINSI":15,"VARFOR":16,"VAR":17,"FOR":18,"POUR":19,"ALLANT":20,"e":21,",":22,"INC":23,"FINPOUR":24,"ENDFOR":25,"WHILE":26,"WHILEFIRST":27,"TANTQUE":28,"ENDWHILE":29,"FINTANTQUE":30,"SWITCH":31,"CHOIX":32,"CASE":33,"CAS":34,"DEFAULT":35,"DEFAUT":36,"ENDCASE":37,"PAUSE":38,";":39,"ENDSWITCH":40,"BLOCSWITCH":41,"FINCHOIX":42,"INSTRUCTIONSWITCH":43,"FUNCTION":44,"FONCTION":45,"FUNCTION2":46,"PARAMETERS":47,"FUNCTION3":48,"RETOURNER":49,"CALLFUNCTION":50,"PARAMETERS2":51,"PRINT":52,"AFFICHER":53,"PARAMETERS3":54,"ARGUMENTS":55,"STRING":56,"instruction":57,"SUP":58,"INF":59,"SUPEGAL":60,"INFEGAL":61,"EGAL":62,"NOTEGAL":63,"DEBUT":64,"{":65,"}":66,"FIN":67,"EOF":68,"MOVE":69,"UP":70,"DOWN":71,"LEFT":72,"RIGHT":73,"PARLE":74,"COM":75,"RETOURNE":76,"=":77,"ADD":78,"NUMBER":79,"[":80,"]":81,"SUB":82,"MULT":83,"DIV":84,"RECUP":85,"TEST":86,"$accept":0,"$end":1};
    console.log(testParser)
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    let p = document.createElement("p");
    err[3] = err[3].replace("Expecting","Attendu : ")
    err[3] = err[3].replace("got","Obtenu : ")
    let error = err[3].replace("Attendu : ","").replace("Obtenu : ","")
    console.log(err)
    error = error.split("'")
    error = error.filter(value=>{return (value != ", " && value != "" && value != " "&& value != ",  " ) })
    let msg ="Attendu : "
    for(let i = 0;i< error.length-1;i++)    {
        if(tab[idkdontouchit(testParser[error[i]])-1] ==',')
            msg += '","' +", "
        else
            msg += tab[idkdontouchit(testParser[error[i]])-1] +", "
    }
    let msg2
    if(tab[idkdontouchit(testParser[error[error.length-1]])-1]!==undefined){
        msg2 = "Obtenu : " + tab[idkdontouchit(testParser[error[error.length-1]])-1]
    }
    else {
        msg2 = " le symbole n'a pas été trouvé"
    }
    p.innerHTML=`Erreur ligne: ${err[0][27]}<br><br>`+err[1].replaceAll(" ","&nbsp;") + "<br><br>"+err[2] + "<br><br>"+msg + "<br><br>" + msg2;
    li.appendChild(p);
    console.log(p)
    ul.appendChild(li);
}

function idkdontouchit(value){
    switch(value) {
        case 0:return '\n';
            break;
        case 79:return 1;
            break;
        case 53:return 2;
            break;
        case 75:return 3;
            break;
        case 39:return 4;
            break;
        case 22:return 5;
            break;
        case 8:return 6;
            break;
        case 62:return 7;
            break;
        case 77:return 8;
            break;
        case 58:return 9;
            break;
        case 84:return 10;
            break;
        case 85:return 11;
            break;
        case 80:return 12;
            break;
        case 83:return 13;
            break;
        case 'INC':return 14;
            break;
        case 78:return 15;
            break;
        case 63:return 16;
            break;
        case 60:return 17;
            break;
        case 61:return 18;
            break;
        case '^':return 19;
            break;
        case 65:return 20;
            break;
        case 66:return 21;
            break;
        case 5:return 22;
            break;
        case 7:return 23;
            break;
        case 81:return 24;
            break;
        case 82:return 25;
            break;
        case 'PI':return 26;
            break;
        case 58:return 27;
            break;
        case 59:return 28;
            break;
        case 49:return 29;
            break;
        case 76:return 30;
            break;
        case 45:return 31;
            break;
        case 32:return 32;
            break;
        case 34:return 33;
            break;
        case 36:return 24;
            break;
        case 38:return 35;
            break;
        case 42:return 36;
            break;
        case 30:return 37;
            break;
        case 24:return 38;
            break;
        case 4:return 39;
            break;
        case 10:return 40;
            break;
        case 13:return 41;
            break;
        case 15:return 42;
            break;
        case 19:return 43;
            break;
        case 'FAIRE':return 44;
            break;
        case 20:return 45;
            break;
        case 68:return 46;
            break;
        case 86:return 47;
            break;
        case 74:return 48;
            break;
        case 69:return 49;
            break;
        case 70:return 50
            break;
        case 71:return 51;
            break;
        case 73:return 52;
            break;
        case 72:return 53;
            break;
        case 64:return 54;
            break;
        case 67:return 55;
            break;
        case 28:return 56;
            break;
        case 87:return 57;
            break;
        case 17:return 58;
            break;
        case 56:return 59;
            break;
        case '':return 60
            break;


    }
}


function tdsjknfsojnk(string){
    string = string.replaceAll("break;","")
    let tab = string.split("\n");
    let nombreTmp;
    let nombreTmp2;
    for(let i of tab){
        for(let j in i){
            if(tab[j] == ";"){
                if(typeof parseInt(tab[j-2]) ==Number){
                    nombreTmp += tab[j-2];
                    tab[j-2] = "";
                }
                nombreTmp += tab[j-1]
                tab[j-1]= "";
            }
        }
    }
}
