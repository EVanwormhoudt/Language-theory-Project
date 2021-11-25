const express = require('express');
const bodyParser = require('body-parser');
const urlencodedparser = bodyParser.urlencoded({ extended: false });
const sharedsession = require("express-socket.io-session");
const { body, validationResult } = require('express-validator');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const session = require("express-session")({
  // CIR2-chat encode in sha256
  secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    secure: false
  }
});

app.use(express.static(__dirname + '/front/'));
app.use(urlencodedparser);
app.use(session);

io.use(sharedsession(session, {
  // Session automatiquement sauvegardée en cas de modification
  autoSave: true
}));

/**** Code ****/

//===========GET=============
app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/accueil.html');
});
app.get('/levels', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/levels.html');
});
app.get('/lvl1', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl1.html');
});
app.get('/lvl2', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl2.html');
});
app.get('/lvl3', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl3.html');
});
app.get('/lvl4', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl4.html');
});
app.get('/lvl5', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl5.html');
});
app.get('/lvl6', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl6.html');
});
app.get('/lvl7', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl7.html');
});
app.get('/lvl8', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/lvl8.html');
});
//===========POST=============
app.post('/', (req, res) => {
  res.sendFile(__dirname + '/front/views/index.html');
});
app.post('/levels', (req, res) => {
  res.sendFile(__dirname + '/front/html/levels.html');
});
app.post('/lvl1', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl1.html');
});
app.post('/lvl2', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl2.html');
});
app.post('/lvl3', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl3.html');
});
app.post('/lvl4', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl4.html');
});
app.post('/lvl5', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl5.html');
});
app.post('/lvl6', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl6.html');
});
app.post('/lvl7', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl7.html');
});
app.post('/lvl8', (req, res) => {
  res.sendFile(__dirname + '/front/html/lvl8.html');
});


let nblvl;

io.on('connection', (socket) => {
  

  //console.log('Un élève s\'est connecté');

  socket.on("login", () => {
    let srvSockets = io.sockets.sockets;
    srvSockets.forEach(user => {
      //console.log(user.handshake.session.username);
    });
    io.emit('new-message', 'Utilisateur ' + socket.handshake.session.username + ' vient de se connecter');
  });


  socket.on('disconnect', () => {
    io.emit('new-message', 'Serveur : Utilisateur ' + socket.handshake.session.username + ' vient de se déconnecter');
    //console.log('Un élève s\'est déconnecté');
  });

  socket.on('lvl', (msg) => {
    //Affichage en console
    console.log('Level Click : ' + msg);
    nblvl = msg;
    //Envoie le message pour tous, Affichage du chat sur la page leaderboard
  });

  socket.on("partie", () => {
    socket.emit('choixlvl', nblvl);
  })
});



http.listen(4200, () => {
  console.log('Serveur : http://localhost:4200');
});

