let lv1 = document.getElementsByTagName('button');

for(let i = 0; i < lv1.length; i++) {
    lv1[i].addEventListener('click', () => {
        socket.emit('lvl', lv1[i].value);
        window.location.href = "/game";
    })
}
