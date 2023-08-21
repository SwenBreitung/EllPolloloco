/**
 * this class is the enemy infinite chicken 
 * @class
 */
class InfiniteChicken extends MovableObjekt {
    y = 390;
    width = 50;
    height = 60;
    x;
    otherDiscption = false;

    speed = 3 + Math.random() * 0.25;

    isSpotted = false
    originalX = 400;
    x = 400;
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


    /**
     * Initializes the Endboss class.
     * 
     * @param {string} imgPath - The path to the starting image.
     * @param {string} this.IMG_WALKIN - Loads the walking animation.
     * @param {number} this.x - Calculates the x-coordinate with a random factor of 1500.
     * @param {number} this.originalX - The initial x-coordinate becomes the reference point.
     * @param {number} this.y - The this.y coordinate is defined in the World class.
     */
    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN)
        this.x = x + Math.random() * 1500;
        this.originalX = this.x;
        this.animation();
        this.applyGravity();
        this.moving();
    }


    /**
     * This function defines the setInterval for the movement functions.
     */
    moving() {
        setInterval(() => {
            this.infiniteChickenMove()
        }, 50);
    }


    /**
     * This function displays the different motion patterns.
     */
    infiniteChickenMove() {
        this.infiniteChickenMoveRight();
        this.infiniteChickenMoveLeft();
    }


    /**
     * This function describes how the Infinity chicken moves to the left.
     * 
     * @param {number} this.speed - Defines the speed of the chicken.
     * @param {number} this.x - Indicates the current position of the chicken.
     * @param {boolean} otherDescription - This boolean value changes when the chicken reaches the maximum distance, in order to make it move to the right.
     */
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


    /**
     * This function determines whether the range has been reached from the left side.
     * 
     * @returns Returns a boolean value indicating whether the maximum range has been reached.
     */
    isXInRangeOfLeftLimit() {
        return this.x >= this.leftLimit - 10 && this.x <= this.leftLimit + 10
    }


    /**
     * Diese funktion bestimmt das area ende
     * 
     * @returns returnt die absolute maximale reichweite
     */
    leftAreaEnd() {
        return this.x < -719
    }


    /**
     * This function determines the area's end.
     * 
     * @returns Returns the absolute maximum range.
     */
    leftLimitReached() {
        return this.leftLimit < this.x
    }


    /**
     * This function defines the basics of the MoveRight function.
     * 
     * @param {Boolean} this.otherDescription - When the boolean is true, the chicken moves to the right.
     * @param {number} this.speed - Defines the speed of the chicken.
     */
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


    /**
     * This function makes the chicken jump when it is on the ground.
     * 
     * @param {number} this.speed - Defines the y speed of the chicken when jumping.
     */
    jumping() {
        if (!this.isAboveGround()) {
            this.speedY = 15;
        }
    }


    /**
     * This function defines the loading of the walking animation.
     */
    animation() {
        setInterval(() => this.playAnimation(this.IMG_WALKIN), 50);
    }

    /**
     * This function checks if the maximum range has been reached.
     * 
     * @returns Returns whether the maximum range to the right has been reached.
     */
    isWithinRightLimit() {
        return this.rightLimit > this.x;
    }


    /**
     * This function calculates whether the chicken has reached the end of the area.
     * 
     * @returns Returns whether the absolute right edge of the area has been reached.
     */
    isWithinRightLimitRange() {
        return this.x >= this.rightLimit - 10 && this.x <= this.rightLimit + 10;
    }
}