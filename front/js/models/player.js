class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x2, y2, sprite) {
        super(scene, x2, y2, sprite);


            this.x= x2;
            this.y= y2;
            this.previousX = x2;
            this.previousY = y2;


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

   move(direction, nbCase,posx,posy){
        nbCase++;
       if(!this.started){
         this.previousX = posx;
         this.previousY = posy;
         this.started = true;
       }


        switch (direction){
            case 'up':
                if((Math.trunc(this.y) >= Math.trunc(this.previousY-nbCase*32-2)) && (Math.trunc(this.y) <= Math.trunc(this.previousY-nbCase*32+2)) ){
                    this.setVelocity(0,0);
                }else{
                    this.setVelocity(0,-150);
                }
                break;

            case 'down':
                if((Math.trunc(this.y) >= Math.trunc(this.previousY+nbCase*32-2)) && (Math.trunc(this.y) <= Math.trunc(this.previousY+nbCase*32+2)) ){
                    this.setVelocity(0,0);
                }else{
                    this.setVelocity(0,+150);
                }
                break;


            case 'left':
                if((Math.trunc(this.x) >= Math.trunc(this.previousX-nbCase*32-2)) && (Math.trunc(this.x) <= Math.trunc(this.previousX-nbCase*32+2)) ){
                    this.setVelocity(0,0);
                }else{
                    this.setVelocity(-150,0);
                }
                break;


            case 'right':
                if((Math.trunc(this.x) >= Math.trunc(this.previousX+nbCase*32-2)) && (Math.trunc(this.x) <= Math.trunc(this.previousX+nbCase*32+2)) ){
                    this.setVelocity(0,0);
                }else{
                    this.setVelocity(150,0);
                }
                break;

        }
   }

    
}