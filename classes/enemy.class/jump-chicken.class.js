/**
 * this class is the enemy little jumping chicken 
 * @class
 */
class JumpChicken extends MovableObjekt {
    y = 420;
    width = 30;
    height = 30;
    x = 400;

    offsetRight = -5;
    offsetLeft = -5;
    offsetTop = -10;
    offsetBottom = -10;

    speed = 1 + Math.random() * 0.25;
    isSpotted = false
    originalX = 1700;
    maxMoveDistance = 500;
    maxBossCharacterDistance = 300;
    spotDistance = 300;
    isDead = false;
    isSplicing = false;

    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMG_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * Initializes the jump-Chicken class.
     * 
     * @param {string} imgPath - Loads the starting image.
     * @param {string} this.IMG_WALKIN - Loads the walking animation.
     * @param {number} this.x - Calculates the x-coordinate with a random factor of 1500.
     * @param {number} this.originalX - The initial x-coordinate becomes a reference point.
     * @param {number} this.y - The this.y coordinate is defined in the world.
     */
    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN);
        this.loadImgS(this.IMG_DEAD);
        this.x = x + Math.random() * 1500;
        this.animation();
        this.applyGravity();
        this.moving();
    }


    /**
     * This function defines the setInterval for the movement functions.
     */
    moving() {
        setInterval(() => {
            if (!this.isSplicing) {
                this.moveLeft(200, this.speed);
                this.jumpingLeft();
                this.y = 410;
            }
        }, 300);
    }


    /**
     * This function defines the jumping to the upper-left direction.
     */
    jumpingLeft() {
        if (this.isSpotted) {
            this.jumping();
            this.speed = 2 + Math.random() * 0.25;
            this.moveLeft(50, this.speed + 1);
            this.isSpotted = false;
        }
    }


    /**
     * This function defines the jumping upward.
     */
    jumping() {
        if (this.isSpotted && !this.isAboveGround()) {
            this.speedY = 15;
        }
    }


    /**
     * This function defines the setInterval for the walking animation.
     */
    animation() {
        setInterval(() => {
            if (!this.isSplicing) {
                this.playAnimation(this.IMG_WALKIN)
            } else {
                this.playAnimation(this.IMG_DEAD)
                this.speedY = -15;
            }
        }, 1000 / 60);
    }
}