class JumpChicken extends MovableObjekt {
    y = 390;
    width = 30;
    heigth = 50;
    x;
    speed = 0.8 + Math.random() * 0.25;
    isSpotted = false
    originalX = 1700;
    maxMoveDistance = 500;
    maxBossCharacterDistance = 300;
    spotDistance = 300;

    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    constructor(imgPath) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN)
        this.x = 400 + Math.random() * 1500;
        this.animation();
        this.applyGravatyChicken();
        this.moving();
    }


    moving() {
        this.moveLeft(500, this.speed);
        setInterval(() => {
            this.jumpingLeft();
        }, 50);
    }



    isAboveGroundchicken() {
        if (this instanceof ThrowableObjekt) {
            return true;
        } else {
            return this.y < 390;
        }
    }

    applyGravatyChicken() {
        setInterval(() => {
            if (this.isAboveGroundchicken() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }


    jumpingLeft() {
        if (this.isSpotted) {
            this.jumping();
            this.moveLeft(50, this.speed + 2);
            this.isSpotted = false;
            this.speed = 0.8 + Math.random() * 0.25;
        }
    }


    jumping() {
        if (this.isSpotted && !this.isAboveGroundchicken()) {
            this.speedY = 15;
        }
    }

    animation() {
        setInterval(() => {
            this.playAnimation(this.IMG_WALKIN);
        }, 50);
    }



}