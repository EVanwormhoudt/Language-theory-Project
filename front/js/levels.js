let lv1 = document.getElementsByTagName('a');

for(let i = 0; i < lv1.length; i++) {
    lv1[i].addEventListener('click', () => {
        socket.emit('lvl', i+1);
        window.location.href = "/game";
    })
}
