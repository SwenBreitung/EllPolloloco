/**
 * this class is the enemy spawn chicken 
 * @class
 */
class SpawnChicken extends MovableObjekt {
    y = 400;
    width = 30;
    height = 50;
    x = world.lvl.endboss[0].x;

    offsetRight = 5;
    offsetLeft = 5;
    offsetTop = 10;
    offsetBottom = 0;
    isDead = false;
    speed = 5 + Math.random() * 0.25;
    isSplicing = false;

    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    IMG_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    /**
     * Initializes the jump-Chicken class.
     * 
     * @param {string} this.IMG_WALKIN - Loads the walking animation.
     */
    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/3_w.png');
        this.loadImgS(this.IMG_WALKIN);
        this.loadImgS(this.IMG_DEAD);
        this.animation();
        this.moving();
    }


    /**
     * This function defines the setInterval for the movement functions.
     */
    moving() {
        if (!this.isSplicing) {
            super.moveLeft(50, this.speed);
        }
    }


    /**
     * This function defines the setInterval for the walking animation.
     */
    animation() {
        if (world.spawnChickens.length >= 0) {
            setStoppebleInterval(() => {
                if (!this.isSplicing) {
                    this.playAnimation(this.IMG_WALKIN);
                } else {
                    this.playAnimation(this.IMG_DEAD);
                }
            }, 1000 / 60);
        }
    }
}