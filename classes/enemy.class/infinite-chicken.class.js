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
        setInterval(() => {
            this.infiniteChickenMove()
        }, 50);
    }


    infiniteChickenMove() {
        this.infiniteChickenMoveRight();
        this.infiniteChickenMoveLeft();
    }


    infiniteChickenMoveLeft() {
        if ((this.leftLimitReached() || this.leftAreaEnd()) && !this.otherDiscption) {
            this.otherDiscption = false;
            this.x -= this.speed;
        } else {
            if (this.isXInRangeOfLeftLimit()) {
                this.jumping();
            }
            this.otherDiscption = true;
        }
    }

    isXInRangeOfLeftLimit() {
        return this.x >= this.leftLimit - 10 && this.x <= this.leftLimit + 10
    }

    leftAreaEnd() {
        return this.x < -719
    }

    leftLimitReached() {
        return this.leftLimit < this.x
    }

    infiniteChickenMoveRight() {
        if (this.isWithinRightLimit() && this.otherDiscption) {
            this.otherDescription = true;
            this.x += this.speed;
        } else {
            if (this.isWithinRightLimitRange()) {
                this.jumping();
            }
            this.otherDiscption = false;
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
    updateChickenPositionAboveGround() {

    }

    jumping() {
        if (!this.isAboveGroundchicken()) {
            this.speedY = 15;
        }
    }


    animation() {
        setInterval(() => this.playAnimation(this.IMG_WALKIN), 50);
    }


    isWithinRightLimit() {
        return this.rightLimit > this.x;
    }


    isWithinRightLimitRange() {
        return this.x >= this.rightLimit - 10 && this.x <= this.rightLimit + 10;
    }

}