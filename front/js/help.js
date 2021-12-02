let verif = false;

let objBTN = document.getElementById('objBTN');
objBTN.addEventListener('click', () => {

    if(verif == false) {
        document.getElementById('popupOBJ').hidden = false;
        verif = true;
    }
    let quitter = document.getElementById('leave');
    quitter.addEventListener('click', () => {
        document.getElementById('popupOBJ').hidden = true;
        verif = false;
    })

});

let rulesBTN = document.getElementById('rulesBTN');
rulesBTN.addEventListener('click', () => {
    if(verif == false) {
        document.getElementById('popupRULES').hidden = false;
        verif = true;
    }
    let quitter = document.getElementById('leave2');
    quitter.addEventListener('click', () => {
        document.getElementById('popupRULES').hidden = true;
        verif = false;
    })
});