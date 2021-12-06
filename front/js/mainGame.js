const config = {
    type: Phaser.AUTO,
    width: window.innerWidth * 2 / 3,
    height: window.innerHeight - 200,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

const game = new Phaser.Game(config)
let map, tilesets, tilesetsdeco;
let cursors;
let verif = false;

function preload() {
    this.load.tilemapTiledJSON("mapLvl1", "../asset/mapLvl1.json");
    this.load.tilemapTiledJSON('mapLvl4', '../asset/mapLvl2.json');
    this.load.tilemapTiledJSON('mapLvl3', '../asset/mapLvl3.json');
    this.load.tilemapTiledJSON('mapEntrainement', '../asset/mapEntrainement.json');

    this.load.image('tiles', '../asset/imgbin_prison-architect-landscape-architecture-sprite-png.png');
    this.load.image('tilestuyau', '../asset/aerationn.png');
    this.load.image('tilesdeco', '../asset/deco.png');
    this.load.image('basket', '../asset/basket.png');
    this.load.image('tilesdeco2', '../asset/deco2.png');

    this.load.spritesheet('face', '../asset/sprite_face.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('right', '../asset/sprite_right.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('left', '../asset/sprite_left.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('back', '../asset/sprite_back.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {

    var position = window.location.href.indexOf('?');

    if (position != -1) {
        this.lvl = "";
        var fin_url = window.location.href.substr(position + 1);
        fin_url = fin_url.replace(/-/g, " ");

        this.lvl = fin_url.substr(7);

        switch (this.lvl) {
            case '1':
                map = this.add.tilemap('mapLvl1');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
                tilesetsdeco = map.addTilesetImage('deco', 'tilesdeco');

                this.sol = map.createLayer('sol', tilesets);
                this.mur = map.createLayer('murs', tilesets);
                this.deco = map.createLayer('deco', tilesetsdeco);

                break;
            case '2':
                map = this.add.tilemap('mapLvl1');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
                tilesetsdeco = map.addTilesetImage('deco', 'tilesdeco');

                this.sol = map.createLayer('sol', tilesets);
                this.mur = map.createLayer('murs', tilesets);
                this.deco = map.createLayer('deco', tilesetsdeco);

                break;
            case '3':
                map = this.add.tilemap('mapLvl3');
                console.log(map);

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
                tuyau = map.addTilesetImage('aerationn', 'tilestuyau');

                this.mur = map.createLayer('mur', tilesets);
                this.mur.setDepth(2000);
                this.sol = map.createLayer('sol', tilesets);
                this.sol.setDepth(4000);
                this.tuyau = map.createLayer('aeration', tuyau);
                this.tuyau.setDepth(2000);

                var texture = this.textures.createCanvas('night-layer', map.widthInPixels + 32 * 56, map.heightInPixels + 32 * 32);
                texture.context.fillStyle = '#000000'; //pour mettre la couleur noir
                texture.context.fillRect(0, 0, map.widthInPixels + 32 * 56, map.heightInPixels + 32 * 32); //fait un rectangle à partir de la coordonéee (0,0) et de taille de la map
                texture.context.globalCompositeOperation = 'destination-out'; //comment se met la couleur sur la map
                texture.refresh();

                var overlay = this.add.image(0, 0, 'night-layer');

                overlay.setDepth(3000);
                overlay.setAlpha(0.99);




                break;

            case '4':
                map = this.add.tilemap('mapLvl4');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
                tilesetsdeco2 = map.addTilesetImage('deco2', 'tilesdeco2');
                tilesetsdeco = map.addTilesetImage('deco', 'tilesdeco');
                basket = map.addTilesetImage('basket', 'basket');

                this.sol = map.createLayer('sol', tilesets);
                this.mur = map.createLayer('mur', tilesets);
                this.deco = map.createLayer('deco', tilesetsdeco2);
                this.prisonnier = map.createLayer('prisonner', tilesetsdeco);
                this.basket = map.createLayer('basket', basket);
                break;
            case '5':
                map = this.add.tilemap('mapLvl4');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
                tilesetsdeco2 = map.addTilesetImage('deco2', 'tilesdeco2');
                tilesetsdeco = map.addTilesetImage('deco', 'tilesdeco');
                basket = map.addTilesetImage('basket', 'basket');

                this.sol = map.createLayer('sol', tilesets);
                this.mur = map.createLayer('mur', tilesets);
                this.deco = map.createLayer('deco', tilesetsdeco2);
                this.prisonnier = map.createLayer('prisonner', tilesetsdeco);
                this.basket = map.createLayer('basket', basket);
                break;
            case '8':
                map = this.add.tilemap('mapEntrainement');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');

                tilesetsdeco = map.addTilesetImage('deco', 'tilesdeco');
                tilesetsdeco2 = map.addTilesetImage('deco2', 'tilesdeco2');

                this.sol = map.createLayer('sol', tilesets);

                this.mur = map.createLayer('murs', tilesets);

                this.deco = map.createLayer('deco', tilesetsdeco);
                this.deco = map.createLayer('deco2', tilesetsdeco2);
                this.prisonnier = map.createLayer('prisonniers', tilesetsdeco);
                break;
            default:
        }

        let controlConfig = {
            camera: this.cameras.main,
            acceleration: 0.8,
            drag: 0.005,
            maxSpeed: 3
        };

        //rendu de la scène

        this.cameras.main.setZoom(0.50);
        this.cameras.main.centerOn(896, 512);
        cursors = this.input.keyboard;



        //Création du personnage avec animation
        this.player = this.physics.add.group({ classType: Player });
        if (this.lvl == '8') {
            this.player.create(800, 500, 'face');
        } else if (this.lvl == "3") {
            this.player.create(400 - 64, 800 - 64, 'face');
        } else {
            this.player.create(400, 800, 'face');

        }
        if (this.lvl == "3") {
            this.player.setDepth(4000);


        }

        this.win = false;
        this.win2 = false;
        this.win3 = false;
        this.win4 = false;
        this.win5 = false;
        this.aera = false;
        this.area5 = false;
        this.player.children.entries[0].setAnim('left', 'right', 'back', 'face');
        movePlayer(this.player);


    }

}

function update() {
    switch (game.scene.scenes[0].lvl) {
        case '1':
            if (!this.win) victory(game.scene.scenes[0].lvl);
            break;
        case '2':
            if (!this.win2) victory(game.scene.scenes[0].lvl);
            break;
        case '3':
            if (!this.win3) victory(game.scene.scenes[0].lvl);
            break;
        case '4':
            if (!this.win4) victory(game.scene.scenes[0].lvl);
            //if(!this.area)isInArea();
            
            if (isInArea() == 34 && verif != true) {
                if(execution() == 1234) {
                    let ul = document.getElementById("list");
                    let li = document.createElement("li");
                    let p = document.createElement("p");
                    p.innerHTML = `Eh psss<br><br>Le mot de passe est 34 !`
                    li.appendChild(p);
                    ul.appendChild(li);
                    verif = true;
                }
            }
            break;
        case '5':
            if (!this.win5) victory(game.scene.scenes[0].lvl);
            if (!this.area5) isInArea();

    }


    //var pointer = this.input.activePointer;
    //console.log(pointer.x,  ' y',pointer.y);
    //console.log(game.scene.scenes[0].player.children.entries[0].x,game.scene.scenes[0].player.children.entries[0].y)
}


function isInArea() {
    if (game.scene.scenes[0].lvl == '4' || game.scene.scenes[0].lvl == '5') {
        if (game.scene.scenes[0].player.children.entries[0].x >= 128 && game.scene.scenes[0].player.children.entries[0].x <= 250 && game.scene.scenes[0].player.children.entries[0].y < 447 && game.scene.scenes[0].player.children.entries[0].y > 320) {

            if (game.scene.scenes[0].lvl == '4') {
                game.scene.scenes[0].area = true;
                return 34;
            } else {
                game.scene.scenes[0].area5 = true;
                return Math.floor(Math.random() * (7 - 4 + 1)) + 4;;
            }

        }
        return;
    }
}

function victory(lvl) {

    switch (lvl) {
        case '1':
            if (game.scene.scenes[0].player.children.entries[0].y <= 0 && (game.scene.scenes[0].player.children.entries[0].x < 1215 && game.scene.scenes[0].player.children.entries[0].x > 894)) {
                game.scene.scenes[0].win = true;
                Win();
            }
            break;
        case '2':
            if (game.scene.scenes[0].player.children.entries[0].y <= 0 && (game.scene.scenes[0].player.children.entries[0].x < 1215 && game.scene.scenes[0].player.children.entries[0].x > 894)) {
                game.scene.scenes[0].win2 = true;
                Win();
            }
            break;
        case '3':
            if ((game.scene.scenes[0].player.children.entries[0].y <= 189 && game.scene.scenes[0].player.children.entries[0].y >= 0) && (game.scene.scenes[0].player.children.entries[0].x < 1667 && game.scene.scenes[0].player.children.entries[0].x >= 1542)) {
                game.scene.scenes[0].win3 = true;
                Win();
            }
            break;
        case '4':
            if ((game.scene.scenes[0].player.children.entries[0].y <= 416 && game.scene.scenes[0].player.children.entries[0].y >= 284) && (game.scene.scenes[0].player.children.entries[0].x < 1532 && game.scene.scenes[0].player.children.entries[0].x >= 1411)) {
                if(verif == true && execution() == 12345) {
                    game.scene.scenes[0].win4 = true;
                    Win();
                }
            }            
            break;

        case '5':
            game.scene.scenes[0].win5 = true;
            break;
        default:
    }
}
function movePlayer() {


    cursors.on('keydown-Q', () => {
        game.scene.scenes[0].player.children.entries[0].setVelocity(-150, 0);
        game.scene.scenes[0].player.children.entries[0].anims.play('left');
    });
    cursors.on('keydown-D', () => {
        game.scene.scenes[0].player.children.entries[0].setVelocity(150, 0);
        game.scene.scenes[0].player.children.entries[0].anims.play('right');
    });
    cursors.on('keydown-S', () => {
        game.scene.scenes[0].player.children.entries[0].setVelocity(0, 150);
        game.scene.scenes[0].player.children.entries[0].anims.play('face');
    });
    cursors.on('keydown-Z', () => {
        game.scene.scenes[0].player.children.entries[0].setVelocity(0, -150);
        game.scene.scenes[0].player.children.entries[0].anims.play('back');
    });
    return 0;
}
