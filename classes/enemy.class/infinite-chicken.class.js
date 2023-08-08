class InfiniteChicken extends MovableObjekt {
    y = 390;
    width = 50;
    heigth = 60;
    x;
    otherDiscption = false;

    speed = 3 + Math.random() * 0.25;

    isSpotted = false
    originalX = 400;
    rightLimit = this.originalX + 200;
    leftLimit = this.originalX - 200;
    maxMoveDistance = 500;
    maxBossCharacterDistance = 300;
    spotDistance = 300;

    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor(imgPath) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN)
        this.x = 400 + Math.random() * 1500;
        this.originalX = this.x;
        this.animation();
        this.applyGravatyChicken();
        this.moving();
    }


    moving() {
        this.moveLeft(500, this.speed);
        setInterval(() => {
            this.moveRight();
            this.moveLeft();
        }, 50);
    }


    moveRight() {
        if (this.rightLimit > this.x && this.otherDiscption) {
            this.otherDiscption = true;
            this.x += this.speed;
        } else {
            if (this.x >= this.rightLimit - 10 && this.x <= this.rightLimit + 10) {
                this.jumping();
            }
            this.otherDiscption = false;
        }

    }

    moveLeft() {
        if ((this.leftLimit < this.x || this.x < -719) && !this.otherDiscption) {
            this.otherDiscption = false;
            this.x -= this.speed;
        } else {
            if (this.x >= this.leftLimit - 10 && this.x <= this.leftLimit + 10) {
                this.jumping();
            }
            this.otherDiscption = true;
        }
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


    jumping() {
        if (!this.isAboveGroundchicken()) {
            this.speedY = 15;
        }
    }


    animation() {
        setInterval(() => {
            this.playAnimation(this.IMG_WALKIN);
        }, 50);
    }

}