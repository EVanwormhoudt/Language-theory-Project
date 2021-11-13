class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x2, y2, id2, perso, perso2, perso3, perso4) {

        super(scene, x2, y2, perso);
        this.id = id2;
        this.pos = {
            x: y2,
            y: x2
        }

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.sprite = perso;
        this.sprite2 = perso2;
        this.sprite3 = perso3;
        this.sprite4 = perso4;
        this.initAnim();
    }

    initAnim() {
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers(this.sprite3, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        })
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers(this.sprite2),
            frameRate: 10,
            repeat: -1
        })
        this.anims.create({
            key: 'back',
            frames: this.anims.generateFrameNumbers(this.sprite4),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'face',
            frames: this.anims.generateFrameNumbers(this.sprite),
            frameRate: 10,
            repeat: -1
        });
    }

    movePlayer(player,cursors) {
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;

        if (cursors.up.isDown) {
            player.body.velocity.y -= 150;
            player.anims.play('back');
        }
        else if (cursors.down.isDown) {
            player.body.velocity.y += 150;
            player.anims.play('face');
        }
        else if (cursors.right.isDown) {
            player.body.velocity.x += 150;
            player.anims.play('right');
        }
        else if (cursors.left.isDown) {
            player.body.velocity.x -= 150;
            player.anims.play('left');
        }
        else {
            player.anims.stop();
            player.anims.play('face');
        }
        return 0;
    }
}