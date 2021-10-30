const port = 4200;

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const http = require('http').Server(app);
const io = require('socket.io')(server);

const sharedsession = require("express-socket.io-session");

const bodyParser = require('body-parser');
const session = require('express-session')({
  secret: "30cm",
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 56060 * 1000,
    secure: false,
  }
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* init express */
app.use(urlencodedParser);
app.use(session);
app.use(express.static(__dirname + "/front/"));

io.use(sharedsession(session, {
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

io.on('connection', (socket) => {
  console.log('Un élève s\'est connecté');

  socket.on("login", () => {
    let srvSockets = io.sockets.sockets;
    srvSockets.forEach(user => {
      console.log(user.handshake.session.username);
    });
    io.emit('new-message', 'Utilisateur ' + socket.handshake.session.username + ' vient de se connecter');
  });


  socket.on('disconnect', () => {
    io.emit('new-message', 'Serveur : Utilisateur ' + socket.handshake.session.username + ' vient de se déconnecter');
    console.log('Un élève s\'est déconnecté');
  });
});

http.listen(4200, () => {
  console.log('Serveur : http://localhost:4200');
});

