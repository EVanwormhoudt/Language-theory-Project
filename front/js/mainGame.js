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
    this.load.tilemapTiledJSON('testmap2', '../asset/testmap2Lvl2estSolide.json');

    this.load.image('tiles', '../asset/imgbin_prison-architect-landscape-architecture-sprite-png.png');
    this.load.image('tilesdeco', '../asset/deco.png');

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

                break;
            case '2':
                map = this.add.tilemap('testmap2');

                break;
            default:
        }

        let controlConfig = {
            camera: this.cameras.main,
            acceleration: 0.8,
            drag: 0.005,
            maxSpeed: 3
        };

        tilesets = map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png', 'tiles');
        tilesetsdeco = map.addTilesetImage('deco', 'tilesdeco');

        this.sol = map.createLayer('sol', tilesets);
        this.mur = map.createLayer('murs', tilesets);
        this.deco = map.createLayer('deco', tilesetsdeco);

        console.log(this.mur);
        //collision avec les personnages
        this.mur.setCollisionByProperty({estSolide: true});
        this.sol.setCollisionByProperty({estFini: true});

        //rendu de la scène

        this.cameras.main.setZoom(0.50);
        this.cameras.main.centerOn(896, 512);
        cursors = this.input.keyboard;

        //Création du personnage avec animation
        this.player = this.physics.add.group({classType : Player});
        this.player.create(500,300,'face');
        this.player.children.entries[0].setAnim('left','right','back','face');

        //Creation function collider
        this.physics.add.collider( this.player.children.entries[0], this.mur,()=>console.log(this.player.children.entries[0].testCollision("up")));
        this.physics.add.collider( this.player.children.entries[0], this.sol,()=>console.log("FIN DU NIVEAU"));



    }
}

function update() {

    victory('1')
}


function victory(lvl){

    switch(lvl) {
        case '1':
            if(game.scene.scenes[0].player.children.entries[0].y <= 0 && (game.scene.scenes[0].player.children.entries[0].x < 1215 && game.scene.scenes[0].player.children.entries[0].x > 900)){
                alert("gagner");
            }
            break;
        case '2':


            break;

        default:
    }
}
