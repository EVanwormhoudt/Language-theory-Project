//a mettre dans el load de la scene Phaser
this.load.setPath("assets/image/main_menu");
this.load.tilemapTiledJSON("testmap.json", "testmap");
this.load.image("imgbin_prison-architect-landscape-architecture-sprite-png");

//a mettre dans le create de la scene Phaser
this.map = this.add.tilemap("testmap");
let tileset = this.map.addTilesetImage('imgbin_prison-architect-landscape-architecture-sprite-png');


this.background= this.map.createLayer("Calque de Tuiles 1", tileset);
