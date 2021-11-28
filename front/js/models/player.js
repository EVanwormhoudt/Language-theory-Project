class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x2, y2, sprite) {
        super(scene, x2, y2, sprite);


            this.x= Math.trunc(x2 - x2%32);
            this.y= Math.trunc(y2 - y2%32);
            this.direction = 'none';

            console.log(this.x / 32)
            console.log(this.y / 32)
            console.log(this.x);
            console.log(this.y)
            console.log(this)
        scene.add.existing(this);
        this.setScale(2);
        this.started = false;


    }

   setAnim(left,right,back,face){
       this.anims.create({
           key: left,
           frames: this.anims.generateFrameNames(left, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       })

       this.anims.create({
           key: right,
           frames: this.anims.generateFrameNames(right, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       })
       this.anims.create({
           key: back,
           frames: this.anims.generateFrameNames(back, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       });

       this.anims.create({
           key: face,
           frames: this.anims.generateFrameNames(face, { start: 0, end: 1 }),
           frameRate: 3.5,
           repeat: -1
       });
   }

   preUpdate(time, delta) {
        super.preUpdate(time, delta);


   }

   async move(direction, nbCase){
        nbCase++;
       console.log(this.x)
       console.log(this.y)
       for(let i =0;i<32;i++) {
           await new Promise(r => setTimeout(r, 10));
           switch (direction) {
               case 'up':

                   this.y -= 1;
                   break;

               case 'down':
                   this.y += 1;
                   break;


               case 'left':
                   this.x -= 1;

                   break;


               case 'right':
                   this.x += 1;

                   break;

           }
       }
   }

    
}