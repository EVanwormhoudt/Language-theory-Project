const config = {
    type: Phaser.AUTO,
    width: window.innerWidth * 2 / 3,
    height: window.innerHeight - 200,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}

const game = new Phaser.Game(config)
let map, tilesets, mur, sol;
let cursors;

function preload() {
    this.load.tilemapTiledJSON("mapLvl1", "../asset/mapLvl1.json");
    this.load.tilemapTiledJSON('testmap2', '../asset/testmap2Lvl2estSolide.json');

    this.load.image('tiles', '../asset/imgbin_prison-architect-landscape-architecture-sprite-png.png');

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

        sol = map.createLayer('sol', tilesets);
        mur = map.createLayer('murs', tilesets);

        console.log(mur);
        //collision avec les personnages
        mur.setCollisionByProperty({estSolide: true});


        //rendu de la scène
        this.cameras.main.setZoom(0.5);
        this.cameras.main.setZoom(0.72);
        this.cameras.main.centerOn(896, 512);
        cursors = this.input.keyboard;

        //Création du personnage avec animation
        player = this.physics.add.group({classType : Player});
        player.create(window.innerWidth * 2.5 / 3/2,window.innerHeight - 250/1.5 ,'face');
        player.children.entries[0].setAnim('left','right','back','face');

        //Creation function collider
        this.physics.add.collider( player.children.entries[0], mur,()=>console.log("collision"));

        //permet de bouger le personnage
        movePlayer(player);
    }
}

function update() {
    //player.children.entries[0].move('down',2,player.children.entries[0].x,player.children.entries[0].y);
}

function movePlayer(player) {
    cursors.on('keydown-Q', () => {
        player.children.entries[0].setVelocity(-150, 0);
        player.children.entries[0].anims.play('left');
    });
    cursors.on('keydown-D', () => {
        player.children.entries[0].setVelocity(150, 0);
        player.children.entries[0].anims.play('right');
    });
    cursors.on('keydown-S', () => {
        player.children.entries[0].setVelocity(0, 150);
        player.children.entries[0].anims.play('face');
    });
    cursors.on('keydown-Z', () => {
        player.children.entries[0].setVelocity(0, -150);
        player.children.entries[0].anims.play('back');
    });
    return 0;
}