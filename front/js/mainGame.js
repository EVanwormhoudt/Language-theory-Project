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

function preload() {
    this.load.tilemapTiledJSON("mapLvl1", "../asset/mapLvl1.json");
    this.load.tilemapTiledJSON('mapLvl4', '../asset/mapLvl2.json');
    this.load.tilemapTiledJSON('mapEntrainement', '../asset/mapEntrainement.json');

    this.load.image('tiles', '../asset/imgbin_prison-architect-landscape-architecture-sprite-png.png');
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
        let lvl = "";
        var fin_url = window.location.href.substr(position + 1);
        fin_url = fin_url.replace(/-/g, " ");

        lvl = fin_url.substr(7);

        switch (lvl) {
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
            case '4':
                map = this.add.tilemap('mapLvl4');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
                tilesetsdeco2 = map.addTilesetImage('deco2', 'tilesdeco2');
                tilesetsdeco = map.addTilesetImage('deco','tilesdeco');
                basket = map.addTilesetImage('basket', 'basket');

                this.sol = map.createLayer('sol', tilesets);
                this.mur = map.createLayer('mur', tilesets);
                this.deco = map.createLayer('deco', tilesetsdeco2);
                this.prisonnier = map.createLayer('prisonner',tilesetsdeco);
                this.basket = map.createLayer('basket', basket);
                break;
            case '5':
                map = this.add.tilemap('mapLvl4');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
                tilesetsdeco2 = map.addTilesetImage('deco2', 'tilesdeco2');
                tilesetsdeco = map.addTilesetImage('deco','tilesdeco');
                basket = map.addTilesetImage('basket', 'basket');

                this.sol = map.createLayer('sol', tilesets);
                this.mur = map.createLayer('mur', tilesets);
                this.deco = map.createLayer('deco', tilesetsdeco2);
                this.prisonnier = map.createLayer('prisonner',tilesetsdeco);
                this.basket = map.createLayer('basket', basket);
                break;
            case '8':
                map = this.add.tilemap('mapEntrainement');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
               
                tilesetsdeco = map.addTilesetImage('deco','tilesdeco');
                tilesetsdeco2 = map.addTilesetImage('deco2', 'tilesdeco2');

                this.sol = map.createLayer('sol', tilesets);
                this.mur = map.createLayer('murs', tilesets);

                this.deco = map.createLayer('deco', tilesetsdeco);
                this.deco = map.createLayer('deco2', tilesetsdeco2);
                this.prisonnier = map.createLayer('prisonniers',tilesetsdeco);
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

        this.cameras.main.setZoom(0.72);
        this.cameras.main.centerOn(896, 512);
        cursors = this.input.keyboard;

        //Création du personnage avec animation
        this.player = this.physics.add.group({ classType: Player });
        this.player.create(500, 800, 'face');
        this.player.children.entries[0].setAnim('left', 'right', 'back', 'face');
    }
}

function update() {
    victory('1')
}


function victory(lvl) {
    switch (lvl) {
        case '1':
            if (game.scene.scenes[0].player.children.entries[0].y <= 0 && (game.scene.scenes[0].player.children.entries[0].x < 1215 && game.scene.scenes[0].player.children.entries[0].x > 894)) {
                Win();
            }
            break;
        case '2':
            if (game.scene.scenes[0].player.children.entries[0].y <= 0 && (game.scene.scenes[0].player.children.entries[0].x < 1215 && game.scene.scenes[0].player.children.entries[0].x > 894)) {
                Win();
            }
            break;
        case '3':

            break;
        case '4':

            break;

        case '5':

            break;
        default:
    }
}
