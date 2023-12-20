/**
 * this class is the enemy chicken
 * @class
 */
class Chicken extends MovableObjekt {
    y = 390;
    width = 50;
    height = 60;
    speed = 0.25;
    originalX = this.x;
    x = 400;

    isSplicing = false;
    offsetRight = 5;
    offsetLeft = 5;
    offsetTop = 10;
    offsetBottom = 0;

    isDead = false;
    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMG_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];

    /**
     * Initializes the class.
     * 
     * @param {string} imgPath - The path to the image sent from the level.
     * @param {string} this.IMG_WALKIN - The `IMG_WALKIN` array is loaded.
     * @param {number} this.x - The x-coordinate defined in the global variables.
     * @param {number} y - The y-coordinate, which is default in the World class.
     */
    constructor(imgPath) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN);
        this.loadImgS(this.IMG_DEAD);
        this.x = this.x + Math.random() * 1500;
        this.animation();
        this.moving();
    }


    /**
     * This function sets up an interval that triggers the 'moveLeft' function at a regular interval of 300 milliseconds.
     */
    moving() {
        setInterval(() => this.moveLeft(this.milliseconds(), this.getXSpeed()), 300);
    }


    /**
     * This function defines the animation of the chicken and its speed.
     * 
     * @param {number} this.millisecond - The number of milliseconds the animation takes place in.
     * @param {number} this.speed - The speed of the cloud, passed to the next function.
     */
    animation() {
        setInterval(() => {
            if (this.isSplicing) {
                this.deadAnimation()
            } else {
                this.walkingAnimation();
            }
        }, 500);
    }


    /**
     * This function defines the animation of the chicken while it is running.
     * 
     */
    deadAnimation() {
        this.playAnimation(this.IMG_DEAD);
    }
    walkingAnimation() {
        this.playAnimation(this.IMG_WALKIN);
    }


    /**
     * This function defines the milliseconds.
     * 
     */
    milliseconds = () => 50;

    /**
     * This function defines the speed.
     * 
     */
    getXSpeed() {
        return this.speed
    }
}