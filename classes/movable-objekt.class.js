class MovableObjekt extends DrawableObjekt {


    speedY = 0;
    acceleration = 2.5;
    hitpoints = 100;
    lastHit = 0;
    bottleEnergy = 0;
    coins = 0;


    //------ move automatic for objects--------------------
    moveRight(speed) {
        setInterval(() => {
            this.x += this.speed;
        }, speed / 60)
    }

    moveLeft(fps, speed) {
        setInterval(() => {
            this.x -= speed;
        }, fps / 60)
    }


    jump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.speedY = 30;
        }
    }

    //================== move automatic for objects END=================

    playAnimation(img) {
        let i = this.currentImg % img.length;
        let path = img[i];
        this.img = this.imgCach[path];
        this.currentImg++;
    }


    //--------------------Gravaty---------------------

    applyGravaty() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }

    isAboveGround() {
        if (this instanceof ThrowableObjekt) {
            return true;
        } else {
            return this.y < 290;
        }


    }

    soundPlay(sound, volume) {
        sound.play();
        sound.volume = volume;
    }

    soundStop(sound) {
        sound.pause();
    }



    // Bessere Formel zur Kollisionsberechnung (Genauer)
    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.heigth) >= obj.y &&
            (this.y) <= (obj.y + obj.heigth);
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }


    //Bottle engery Calc--------------------------------------------------

    bottleEngeryNegativCalc() {
        this.bottleEnergy -= 20;;
        console.log('energy', this.bottleEnergy);
    }



    bottleEngeryPositivCalc() {
        this.bottleEnergy += 20;;
        console.log('energy', this.bottleEnergy);
    }

    coinsPositivCalc() {
        this.coins += 20;;

    }

    addition20Engery() {
        this.bottleEnergy += 20;
    }

    //Bottle engery Calc END==============================================


    //dmg calc------------------------------------------------------------

    dmgCollisionCalc() {
        this.dmgHit20HP();
        this.clampHitpointsNULL();
        console.log(this.hitpoints);
    }


    dmgHit20HP() {
        this.hitpoints -= 20;
    }

    //dmg calc END===========================================================


    clampHitpointsNULL() {
        if (this.hitpoints < 0) {
            this.hitpoints = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    isDead() {
        return this.hitpoints == 0;
    }


    isHurt() {
        let timePassed = new Date() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

}