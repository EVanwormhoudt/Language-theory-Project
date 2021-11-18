class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x2, y2, sprite) {
        super(scene, x2, y2, sprite);

        this.pos = {
            x: y2,
            y: x2
        }
        
        scene.add.existing(this);
        this.setScale(2);
    }


    
}