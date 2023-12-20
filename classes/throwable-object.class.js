/**
 * this class is the health item class
 * @class
 */
class ThrowableObject extends MovableObjekt {

    collisionBottle = false;
    justThrewBottle = false;
    speedY = 30;
    alreadyHit = false
    throwRight;

    IMG_THROW = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMG_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]


    /**
     * Initializes the ThrowableObject class.
     * 
     * @param {number} x - The x-coordinate.
     * @param {number} y - The y-coordinate.
     */
    constructor(x, y, throwRight) {
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.throwRight = throwRight;
        this.width = 100;
        this.height = 40;
        this.loadImgS(this.IMG_THROW);
        this.loadImgS(this.IMG_SPLASH);
        this.throw();
        this.animation();
    }


    /**
     * This function throws an object downward with Y-gravity.
     */
    throw () {
        this.speedY30();
        this.applyGravity();
        this.speedX30();
    }


    /**
     * this function animiert die animationen mit einem setintervall von 100
     */
    animation() {
        setInterval(() => {
            this.throwAnimation();
            this.splashAnimation();
        }, 100);
    }


    /**
     * This function animates the throw animation.
     */
    throwAnimation() {
        if (world.keyboard.SHIFT && world.character.bottleEnergy >= 20 && !this.collisionBottle)
            this.playAnimation(this.IMG_THROW);
    }


    /**
     * This function animates the splash animation.
     */
    splashAnimation() {
        if (this.collisionBottle) {
            this.width = 50;
            this.height = 50;
            this.playAnimation(this.IMG_SPLASH);
            requestAnimationFrame(() => this.collisionBottle = false);
        }
    }


    /**
     * In this function, the Throwable Object is split.
     * 
     * @param {number} i - The array position from which the object will be spliced.
     */
    spliceThrowableObject(i) {
        const currentThrowableObject = this.throwableObjects;
        setTimeout(() => {
            currentThrowableObject.splice(i, 1);
            this.ThrowableObjekt = false;
        }, 100);
    }


    /**
     * This function sets the y speed to 30.
     */
    speedY30 = () => this.speedY = 30;


    /**
     * This function sets the x speed to 30.
     */
    speedX30() {
        setStoppebleInterval(function() {
            if (this.throwRight) {
                this.x += 30;
            } else {
                this.x -= 30;
            }
        }.bind(this), 50);
    }
}