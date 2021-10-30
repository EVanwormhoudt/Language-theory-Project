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
let map;

function preload() {
    /*
    this.load.setPath("assets");
    this.load.tilemapTiledJSON("testmap.json", "testmap");
    this.load.image("imgbin_prison-architect-landscape-architecture-sprite-png");
    */

    this.load.tilemapTiledJSON('testmap2', '../../asset/testmap2.json');

    this.load.image('tiles', 'asset/imgbin_prison-architect-landscape-architecture-sprite-png.png');
}

function create() {
    /*
    this.map = this.add.tilemap("testmap");
    let tileset = this.map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png');

    this.background = this.map.createLayer("Calque de Tuiles 1", tileset);
    */

    map = this.add.tilemap('testmap2');

    let tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png','tiles');
    
    console.log(map);
    console.log(tilesets);

    let sol = map.createLayer('sol', tilesets);
    let walls = map.createLayer('walls', tilesets);

    let controlConfig = {
        camera: this.cameras.main,
        acceleration: 0.8,
        drag: 0.005,
        maxSpeed: 3
    };

    this.cameras.main.setZoom(0.4);
}

function update() {

}