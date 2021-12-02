let verif = false;

let objBTN = document.getElementById('objBTN');
objBTN.addEventListener('click', () => {

    if(verif == false) {
        document.getElementById('popupOBJ').hidden = false;
        document.getElementById('example').disabled = true;
        document.getElementById('back').disabled = true;
        document.getElementById('clear').disabled = true;
        document.getElementById('compilation').disabled = true;
        verif = true;
    }
    let quitter = document.getElementById('leave');
    quitter.addEventListener('click', () => {
        document.getElementById('popupOBJ').hidden = true;
        verif = false;
        document.getElementById('example').disabled = false;
        document.getElementById('back').disabled = false;
        document.getElementById('clear').disabled = false;
        document.getElementById('compilation').disabled = false;
    })

});

let rulesBTN = document.getElementById('rulesBTN');
rulesBTN.addEventListener('click', () => {
    if(verif == false) {
        document.getElementById('popupRULES').hidden = false;
        document.getElementById('example').disabled = true;
        document.getElementById('back').disabled = true;
        document.getElementById('clear').disabled = true;
        document.getElementById('compilation').disabled = true;
        verif = true;
    }
    let quitter = document.getElementById('leave2');
    quitter.addEventListener('click', () => {
        document.getElementById('popupRULES').hidden = true;
        verif = false;
        document.getElementById('example').disabled = false;
        document.getElementById('back').disabled = false;
        document.getElementById('clear').disabled = false;
        document.getElementById('compilation').disabled = false;
    })
});