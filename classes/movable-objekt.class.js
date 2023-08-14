class MovableObjekt extends DrawableObjekt {

    speedY = 0;
    acceleration = 2.5;

    offsetY = 10;
    offsetX = 20;

    //------ move automatic for objects--------------------

    moveRight(speed) {
        setStoppebleInterval(() => {
            this.x += this.speed;
        }, speed / 60)
    }


    moveLeft(milliseconds, speed) {
        setInterval(() => {
            this.x -= speed;
        }, milliseconds)
    }


    jump() {
        if (!this.isAboveGround()) {
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
            return this.y < 240;
        }
    }


    soundPlay(sound, volume) {
        sound.play();
        sound.volume = volume;
    }


    soundStop(sound) {
        sound.pause();
    }


    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.heigth) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.heigth);
    }


    //Bottle engery Calc--------------------------------------------------


    bossSpotCharacter(mo, i) {
        const distanceX = Math.abs(this.x - mo.x);
        const distanceY = Math.abs(this.y + this.offsetY - mo.y);

        // Berechne die Entfernung zwischen dem Boss und dem Charakter
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Überprüfe, ob der Charakter innerhalb der Spottentfernung ist
        if (distance <= this.world.lvl.endboss[i].spotDistance) {
            this.world.lvl.endboss[i].isSpotted = true;
            // console.log('gefunden');
        } else {
            this.world.lvl.endboss[i].isSpotted = false;
        }
    }


    jumpingChickenSpotCharacter(mo, i) {
        const distanceX = Math.abs(this.x - mo.x);
        const distanceY = Math.abs(this.y + this.offsetY - mo.y);

        // Berechne die Entfernung zwischen dem Boss und dem Charakter
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        // Überprüfe, ob der Charakter innerhalb der Spottentfernung ist
        if (distance <= this.world.lvl.jumpChickens[i].spotDistance) {
            this.world.lvl.jumpChickens[i].isSpotted = true;
        } else {
            this.world.lvl.jumpChickens[i].isSpotted = false;
        }
    }


    bottleEngeryNegativCalc() {
        this.bottleEnergy -= 20;;
    }


    bottleEngeryPositivCalc() {
        this.bottleEnergy += 20;;
    }


    hitpointsPositivCalc() {
        this.hitpoints += 20;;
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
        // console.log(this.hitpoints);
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