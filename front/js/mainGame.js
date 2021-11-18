const config = {
    type: Phaser.AUTO,
    width: window.innerWidth * 2 / 3,
    height: window.innerHeight - 200,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

const game = new Phaser.Game(config)
let map, tilesets;
let cursors;

function preload() {

    this.load.setPath("../asset");
    //this.load.image("imgbin_prison-architect-landscape-architecture-sprite-png");


    this.load.tilemapTiledJSON("testmap", "testmap.json");
    this.load.tilemapTiledJSON('testmap2', 'testmap2.json');

    this.load.image('tiles', 'imgbin_prison-architect-landscape-architecture-sprite-png.png');

    this.load.spritesheet('face', 'sprite_face.png', {frameWidth: 64, frameHeight: 32});
    this.load.spritesheet('right', 'sprite_right.png', {frameWidth: 64, frameHeight: 32});
    this.load.spritesheet('left', 'sprite_left.png', {frameWidth: 64, frameHeight: 32});
    this.load.spritesheet('back', 'sprite_back.png', {frameWidth: 64, frameHeight: 32});
}

function create() {
    let lvl = 1;
        switch (lvl) {
            case 1:
                map = this.add.tilemap('testmap');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');

                map.createLayer('sol', tilesets);
                map.createLayer('walls', tilesets);

                break;
            case 2:
                map = this.add.tilemap('testmap2');

                tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');

                map.createLayer('sol', tilesets);
                map.createLayer('walls', tilesets);

                break;
            default:
        }
    ;

    let controlConfig = {
        camera: this.cameras.main,
        acceleration: 0.8,
        drag: 0.005,
        maxSpeed: 3
    };

    player = new Player(this, 0, 0, 'face', 'right','left','back');
    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setZoom(0.5);
    
    
}

function update() {
    player.movePlayer(player,cursors);
}