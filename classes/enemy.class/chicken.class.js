/**
 * this class is the enemy chicken
 * @class
 */
class Chicken extends MovableObjekt {
    y = 390;
    width = 50;
    height = 60;
    x = 400;
    speed = 4.5 + Math.random() * 1;
    originalX = this.x;

    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


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
        this.loadImgS(this.IMG_WALKIN)
        this.x = this.x + Math.random() * 1500;
        this.animation();
    }


    /**
     * This function defines the animation of the chicken and its speed.
     * 
     * @param {number} this.millisecond - The number of milliseconds the animation takes place in.
     * @param {number} this.speed - The speed of the cloud, passed to the next function.
     */
    animation() {
        this.moveLeft(this.milliseconds(), this.getXSpeed());
        this.walkingAnimation();
    }


    /**
     * This function defines the animation of the chicken while it is running.
     * 
     */
    walkingAnimation() {
        setInterval(() => this.playAnimation(this.IMG_WALKIN), 50);
    }


    /**
     * This function defines the milliseconds.
     * 
     */
    milliseconds() {
        return 50
    }


    /**
     * This function defines the speed.
     * 
     */

    getXSpeed() {
        return this.speed
    }
}