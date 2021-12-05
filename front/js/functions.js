function GameOver() {
    document.getElementById("popupGameOver").hidden = false;

    let btnSubmit = document.getElementById("compilation");
    btnSubmit.disabled = true;
    let btnClear = document.getElementById("clear");
    btnClear.disabled = true;

    let tryAgain = document.getElementById('tryAgain');
    tryAgain.addEventListener('click', () => {
        let position = window.location.href.indexOf('?');

        if (position != -1) {
            let lvl = "";
            let fin_url = window.location.href.substr(position + 1);
            fin_url = fin_url.replace(/-/g, " ");

            lvl = fin_url.substr(7);

            switch (lvl) {
                case '1':
                    document.location.href = "../html/lvl1.html?niveau=1";
                    break;
                case '2':
                    document.location.href = "../html/lvl2.html?niveau=2";
                    break;
                case '3':
                    document.location.href = "../html/lvl3.html?niveau=3";
                    break;
                case '4':
                    document.location.href = "../html/lvl4.html?niveau=4";
                    break;
                case '5':
                    document.location.href = "../html/lvl5.html?niveau=5";
                    break;
                case '6':
                    document.location.href = "../html/lvl6.html?niveau=6";
                    break;
                case '7':
                    document.location.href = "../html/lvl7.html?niveau=7";
                    break;
                case '8':
                    document.location.href = "../html/lvl8.html?niveau=8";
                    break;
            }
        }
    });

    let leave = document.getElementById('leave3');
    leave.addEventListener('click', () => {
        document.location.href = "../html/accueil.html";
    });
}

function Win() {
    document.getElementById("popupWin").hidden = false;

    let btnSubmit = document.getElementById("compilation");
    btnSubmit.disabled = true;
    let btnClear = document.getElementById("clear");
    btnClear.disabled = true;

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
    let tab=["\n",'nombre',"Afficher",";",",",":","==","=",">","*","/","-","++","+","!=",">=","<=","^","{","}","(",")","PI",">","<","Selon","Cas","Defaut","Pause","FinChoix","FinTantque","FinPour","Si","Alors","Sinon","FinSi","Pour","Faire","Allant De","A","E","<<EOF>>","move","haut","bas","droite","gauche","DEBUT SOURCE","FIN SOURCE","Tantque","test","variable","\s+"];
    err = err.split("\n")
    console.log(err[0][27])

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
        case 0:/* skip whitespace */
            break;
        case 1:return '\n';
        case 64:return 2;
        case 61:return 3;
        case 39:return 4;
        case 22:return 5;
        case 8:return 6;
        case 49:return 7;
        case 62:return 8;
        case 45:return 9;
        case 66:return 10;
        case 67:return 11;
        case 65:return 12;
        case 'INC':return 13;
        case 63:return 14;
        case 50:return 15;
        case 47:return 16;
        case 48:return 17;
        case '^':return 18;
        case 52:return 19;
        case 53:return 20;
        case 5:return 21;
        case 7:return 22;
        case 'PI':return 23;
        case 90:return 24;
        case 46:return 25;
        case 32:return 26;
        case 34:return 27;
        case 36:return 28;
        case 38:return 29;
        case 42:return 30;
        case 30:return 31;
        case 24:return 32;
        case 4:return 33;
        case 10:return 34;
        case 13:return 35;
        case 15:return 36;
        case 19:return 37;
        case 'FAIRE':return 38;
        case 20:return 39;
        case 'A':return 40;
        case 'E':return 41;
        case 55:return 42;
        case 56:return 43;
        case 57:return 44;
        case 58:return 45;
        case 60:return 46;
        case 59:return 47;
        case 51:return 48;
        case 54:return 49;
        case 28:return 80;
        case 'TEST':return 51;
        case 17:return 52;

    }
}

