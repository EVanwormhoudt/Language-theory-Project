class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x2, y2, sprite, sprite2, sprite3, sprite4) {
        super(scene, x2, y2, 'face');

        this.pos = {
            x: y2,
            y: x2
        }

        this.face = sprite;
        this.back = sprite2;
        this.left = sprite3;
        this.right = sprite4;

        scene.add.existing(this);
        this.setScale(3)
    }


    
}