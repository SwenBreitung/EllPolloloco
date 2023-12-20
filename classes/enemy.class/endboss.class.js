/**
 * this class is the boss Chicken
 * @class
 */
class Endboss extends MovableObjekt {
    y = 255;
    x = 1700;
    originalX = 1700;

    offsetRight = 10;
    offsetLeft = 10;
    offsetTop = 10;
    offsetBottom = 15;

    maxMoveDistance = 500;
    maxBossCharacterDistance = 300;

    speed = 4;
    lastHit = 0;
    width = 150;
    height = 200;
    hitpoints = 120;

    isdmgHit = false;
    isSpotted = false;
    isMovingBack = false;
    spotDistance = 500;


    otherDiscption = false;
    IMG_WALKIN = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

    ];

    IMG_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMG_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    IMG_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',

    ]

    IMG_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    /**
     * Initializes the Endboss class.
     */
    constructor() {
        super().loadImg('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImgArrys()
        this.animation();
        this.moving();
        this.startSpawningChickens();
    }


    /**
     * Initializes all animations.
     * 
     * @param {string} this.IMG_WALKIN - The walking animation.
     * @param {string} this.IMG_HURT - The hurt animation.
     * @param {string} this.IMG_ALERT - The spotting animation.
     * @param {string} this.IMG_ATTACK - The attack animation.
     * @param {string} this.IMG_DEAD - The animation when the boss's hitpoints are 0.
     */
    loadImgArrys() {
        this.loadImgS(this.IMG_WALKIN)
        this.loadImgS(this.IMG_HURT)
        this.loadImgS(this.IMG_ALERT)
        this.loadImgS(this.IMG_ATTACK)
        this.loadImgS(this.IMG_DEAD)
    }


    /**
     * This is the moving function.
     */
    moving() {
        setInterval(() => {
            this.spottingAndMoveble();
        }, 50);
    }


    /**
     * Monitors and controls the behavior of the Endboss regarding detection and movement.
     * 
     * If the Endboss's hit points are greater than 0, it checks whether it has spotted the player.
     * If it has spotted the player, the method 'BossSpottingCharacter()' is called.
     * If it has not spotted the player, it returns to its original position by calling the method 'returnToOriginalPosition()'.
     */
    spottingAndMoveble() {
        if (this.hitpoints > 0) {
            if (this.isSpotted) {
                this.BossSpottingCharacter();
            } else if (!this.isSpotted) {
                this.returnToOriginalPosition();
            }
        }
    }


    /**
     * Returns the Endboss to its original position.
     * 
     * Calculates the distance from the current x-coordinate to the original x-coordinate.
     * If the absolute distance is greater than or equal to 5, the Boss is moved towards its original position.
     * Otherwise, the x-coordinate is set to the original x-coordinate to bring the Boss back to the original position.
     * The 'otherDescription' is set accordingly to indicate whether the Boss is moving right or at the original position.
     * 
     * @param {number} distanceToOriginalX - The original x-coordinate for the Boss.
     * @param {number} this.x - The current x-coordinate.
     */
    returnToOriginalPosition() {
        const distanceToOriginalX = this.calculateDistanceFromOriginalX();
        if (Math.abs(distanceToOriginalX) >= 5) {
            this.x += distanceToOriginalX > 2 ? 5 : -5;
            this.otherDiscption = distanceToOriginalX > 2;
            if (this.characterX < this.bossX) {
                this.otherDiscption = true;
            }
            this.otherDiscption = true;
        } else {
            this.x = this.originalX;
            this.otherDiscption = false;
        }
    }


    /**
     * Checks if the boss has spotted the character.
     * 
     * @param {number} this.x - The current x-coordinate of the boss.
     * @param {number} this.speed - The current speed of the boss.
     * @param {number} distanceToCharacter - The distance between the boss and the character.
     */
    BossSpottingCharacter() {
        const distanceToCharacter = this.distanceBossToCharacter();

        if (this.isWithinMaxMoveDistance) {
            this.x += distanceToCharacter > 0 ? -this.speed : this.speed;
            if (this.speed) {
                this.otherDiscption = false;
            }

        } else {
            this.x += this.speed * 5;
            if (this.maxMovementRange()) {
                this.otherDiscption = true;
                this.speed *= -1;
            }
        }
    }


    /**
     * Checks if the maximum movement range has been reached.
     * 
     * @returns {boolean} Returns true if the maximum movement range has been reached, otherwise false.
     */
    maxMovementRange() {
        return Math.abs(this.x - this.originalX) >= this.maxMoveDistance
    }


    /**
     * Checks if the maximum distance has been exceeded.
     * 
     * @param {number} distance - The current distance.
     * @param {number} maxDistance - The maximum distance.
     * @returns {boolean} Returns true if the maximum distance has been exceeded, otherwise false.
     */
    isWithinMaxMoveDistance(distance, maxDistance) {
        return Math.abs(distance) <= maxDistance;
    }


    /**
     * Defines the function that sets the spawn speed of the spawn chickens.
     */
    startSpawningChickens() {
        setInterval(() => {
            this.spawnChickenIfConditionsMet();
        }, 3000);
    }


    /**
     * Calculates the distance between the character and the end boss.
     * 
     * @returns The distance between the character and the boss.
     */
    distanceBossToCharacter() {
        return this.x - world.character.x;
    }


    /**
     * Calculates the distance between the initial position and the current position of the end boss.
     * 
     * @returns The distance between the initial position and the current position.
     */
    calculateDistanceFromOriginalX() {
        return this.originalX - this.x;
    }


    /**
     * Spawns 3 chickens when the boss's hitpoints are below 100.
     * 
     * @param {number} hitpoints - The hitpoints of the end boss.
     */
    spawnChickenIfConditionsMet() {
        if (this.hitpoints <= 100 && this.isSpotted) {
            world.spawnChickens.push(
                new SpawnChicken(),
                new SpawnChicken(),
                new SpawnChicken()
            );
        }
    }


    /**
     * Determines different animations based on the situation.
     * 
     */
    animation() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMG_HURT);
            } else if (this.isSpotted == false && this.hitpoints > 100) {
                this.playAnimation(this.IMG_WALKIN);
            } else if (this.isSpotted == true && this.hitpoints > 0 && this.hitpoints <= 100) {
                this.playAnimation(this.IMG_WALKIN);
            } else if (this.isSpotted == true && this.hitpoints > 0 && this.hitpoints > 100) {
                this.playAnimation(this.IMG_WALKIN);
            } else if (this.isSpotted == false && this.hitpoints > 0 && this.hitpoints <= 100) {
                this.playAnimation(this.IMG_WALKIN);
            } else if (this.hitpoints == 0) {
                this.playAnimation(this.IMG_DEAD);
            }
        }, 400);
    }
}