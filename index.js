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
app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/accueil.html');
});

app.get('/levels', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/levels.html');
});
app.get('/game', (req, res, next) => {
  res.sendFile(__dirname + '/front/html/index.html');
});

app.post('/', (req, res) => {
  res.sendFile(__dirname + '/front/views/index.html');
});

app.post('/levels', (req, res) => {
  res.sendFile(__dirname + '/front/html/levels.html');
});

app.post('/game', (req, res) => {
  res.sendFile(__dirname + '/front/html/index.html');
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

