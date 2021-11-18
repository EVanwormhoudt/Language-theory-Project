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

   setAnim(player,left,right,back,face){
       player.anims.create({
           key: left,
           frames: this.anims.generateFrameNames(left, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       })

       player.anims.create({
           key: right,
           frames: this.anims.generateFrameNames(right, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       })
       player.anims.create({
           key: back,
           frames: this.anims.generateFrameNames(back, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       });

       player.anims.create({
           key: face,
           frames: this.anims.generateFrameNames(face, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       });
   }

    
}