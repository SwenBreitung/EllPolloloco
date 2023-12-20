/**
 * this class is the health item class
 * @class
 */
class MovableObjekt extends DrawableObjekt {

    speedY = 0;
    acceleration = 2.5;
    x = 0;

    offsetY = 10;
    offsetX = 20;

    //------ Move automatic for objects --------------------
    /**
     * This function moves objects to the right.
     * 
     * @param {number} speed - The speed at which the objects should move.
     */
    moveRight(speed) {
        setInterval(() => {
            this.x += this.speed;
        }, speed / 60)
    }


    /**
     * This function makes an object move to the left.
     * 
     * @param {number} milliseconds - The milliseconds in which the setInterval is executed.
     * @param {number} speed - The x-speed defined for the object.
     */
    moveLeft(milliseconds, speed) {
        setInterval(() => {
            if (!this.isSplicing) {
                this.x -= speed;
            }
        }, milliseconds)
    }


    /**
     * This function makes objects jump.
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = 30;
        }
    }

    //================== move automatic for objects END=================

    /**
     * This function creates an animation by repeatedly cycling through an array of images using the modulo operator.
     * 
     * @param {string[]} imgs - An array of image paths that will be cycled through using the modulo operator to create an animation.
     */
    playAnimation(imgs) {
        let i = this.currentImg % imgs.length;
        let path = imgs[i];
        this.img = this.imgCach[path];
        this.currentImg++;
    }

    //--------------------Gravaty---------------------

    /**
     * Creates gravity by pulling objects downward.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.last_y = this.y;
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }


    /** 
     * @returns Returns the y-coordinate to simulate the ground.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return this.y < 360;
        } else if (this instanceof InfiniteChicken || this instanceof JumpChicken) {
            return this.y < 390;
        } else {
            return this.y < 240;
        }
    }


    /**
     * This function performs collision calculation with other objects.
     * 
     * @param {string} obj - The object with which collision is being checked.
     * @returns Returns whether a collision is happening or not.
     */
    isColliding(obj) {
        return this.x + this.width - this.offsetRight >= obj.x + obj.offsetLeft &&
            this.y + this.offsetTop <= obj.y + obj.height - obj.offsetBottom &&
            this.x + this.offsetLeft <= obj.x + obj.width - obj.offsetRight &&
            this.y + this.height - this.offsetBottom > obj.y + obj.offsetTop;
    }

    //Bottle engery Calc--------------------------------------------------

    /**
     * This function checks if the character has been spotted by an object.
     * 
     * @param {string} mo - The object used to determine if spotting has occurred.
     */
    enemySpotCharacter(mo) {
        const distanceX = Math.abs(this.x - mo.x);
        const distanceY = Math.abs(this.y + this.offsetY - mo.y);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        mo.isSpotted = distance <= mo.spotDistance ? true : false;
    }


    /**
     * Here, 20% of energy is deducted from the character's bottle energy.
     */
    bottleEngeryNegativCalc() { this.bottleEnergy -= 20; }


    /**
     * Here, 20% is added to the character's bottle energy.
     */
    bottleEngeryPositivCalc() { this.bottleEnergy += 20; }


    /**
     * Here, 20% is added to the character's HP (health points).
     */
    hitpointsPositivCalc() { this.character.hitpoints += 20;; }

    coinsPositivCalc() { this.statusBarCoin.coinCount++; }

    //Bottle engery Calc END==============================================


    //dmg calc------------------------------------------------------------

    /**
     * This function performs calculations after a collision with damage. It reduces the character's hit points by a certain value
     * and ensures that the hit points do not fall below a certain value.
     */
    dmgCollisionCalc(dmg) {
        this.dmgHit(dmg);
        this.clampHitpointsNULL();
    }


    /**
     * This function subtracts 20 hit points (HP).
     */
    dmgHit(dmg) { this.hitpoints -= dmg; }

    //dmg calc END===========================================================

    /**
     * This function ensures that the hit points do not fall below zero. If the hit points are less than zero,
     * they are set to zero. Otherwise, the time of the last hit is updated.
     */
    clampHitpointsNULL() {
        this.hitpoints = Math.max(0, this.hitpoints);
        this.lastHit = this.hitpoints === 0 ? new Date().getTime() : this.lastHit;
    }


    /**
     * 
     * @returns Returns whether the HP have fallen to 0.
     */
    isDead() { return this.hitpoints == 0; }


    /**
     * Checks if the character was recently injured.
     * 
     * @returns {boolean} Returns true if less than 1 second has passed since the last hit, otherwise false.
     */
    isHurt() {
        let timePassed = new Date() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * This function defines the movement of the cloud and its speed.
     * 
     * @param {number} millisecond - Die Anzahl der Millisekunden, in denen die Animation abläuft.
     * @param {number} speed - Die Geschwindigkeit der Wolke, die an die nächste Funktion übergeben wird.
     */
    animateMoveCloud() { this.moveLeft(this.millisecond, this.speed); }


    spawn() {
        this.speedY = 280;
        this.applyGravity();
    }


    /**
     * This function lists the enemies that can detect the character.
     */
    spottingEnemys() {
        setInterval(() => {
            this.isCharacterSpottedByEnemy(this.world.lvl.endboss);
            this.isCharacterSpottedByEnemy(this.world.lvl.jumpChickens);
        }, 500);
    }


    /**
     * This function checks if enemies have spotted the character.
     * 
     * @param {Array} enemy - All enemies equipped with a spotting function.
     */
    isCharacterSpottedByEnemy(enemys) {
        enemys.forEach((enemy, i) => this.enemySpotCharacter(enemy, i));
    }
}