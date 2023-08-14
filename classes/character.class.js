class Character extends MovableObjekt {
    y = 80;
    width = 100;
    heigth = 200;
    world;
    speed = 3;
    walking_audio = new Audio('./audio/running.mp3');
    jump_audio = new Audio('audio/jumping_1-6452.mp3');
    hitpoints = 100;
    bottleEnergy = 0;
    lastHit = 0;
    coins = 0;
    otherDiscption = false;

    IMG_WALKIN = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMG_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]

    IMG_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    IMG_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    constructor(imgPath) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN);
        this.loadImgS(this.IMG_JUMPING);
        this.loadImgS(this.IMG_DEAD);
        this.loadImgS(this.IMG_HURT);
        this.moving();
        this.applyGravaty();
        this.animation();
    }


    moving() {
        setStoppebleInterval(() => {
            this.soundStop(this.walking_audio);
            this.soundStop(this.jump_audio);
            if (this.hitpoints > 0) {
                this.moveRight();
                this.moveLeft();
                this.jump();
            } else {
                this.isDead();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)
    }

    jump() {
        if (this.world.keyboard.SPACE) {
            this.soundPlay(this.jump_audio, 0.4)
            super.jump();
        }

    }

    moveLeft() {
        this.moveLeftPressKey();
    }

    moveRight() {
        this.moveRightPressKey();

    }


    moveLeftPressKey() {
        if (this.world.keyboard.LEFT && this.x > -719) {
            this.otherDiscption = true;
            this.soundPlay(this.walking_audio, 0.2)
            this.x -= this.speed;
        }
    }


    moveRightPressKey() {
        if (this.world.keyboard.RIGHT && this.x < this.world.lvl.lvl_end_x) {
            this.otherDiscption = false;
            this.soundPlay(this.walking_audio, 0.2)
            this.x += this.speed;
        }
    }


    animation() {
        setStoppebleInterval(() => {

            if (this.isDead()) {
                console.log('dead');
                this.playAnimation(this.IMG_DEAD);

                this.world.isLose();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMG_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMG_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMG_WALKIN);
            }
        }, 50);
    }



}