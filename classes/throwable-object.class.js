class ThrowableObjekt extends MovableObjekt {

    collisionBottle = false;

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


    constructor(x, y) {
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 150;
        this.heigth = 100;
        this.loadImgS(this.IMG_THROW);
        this.loadImgS(this.IMG_SPLASH);
        this.throw();
        this.animation();
    }


    throw () {
        this.speedY30()
        this.applyGravaty();
        this.speedX30()
    }


    animation() {
        setStoppebleInterval(() => {
            this.throwAnimation();
            this.splashAnimation();
        }, 1000 / 5);
    }


    throwAnimation() {
        if (world.keyboard.SHIFT && world.character.bottleEnergy >= 20 && !this.justTrewBottle) {
            this.playAnimation(this.IMG_THROW);
        }
    }


    splashAnimation() {

        if (this.collisionBottle) {
            console.log('treffer')
            this.playAnimation(this.IMG_SPLASH);
            this.collisionBottle = false;
        };

    }

    speedY30() {
        this.speedY = 30;
    }

    speedX30() {
        setStoppebleInterval(function() {
            this.x += 30;
        }.bind(this), 50);
    }
}