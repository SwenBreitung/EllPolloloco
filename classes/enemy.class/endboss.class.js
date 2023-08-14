class Endboss extends MovableObjekt {
    y = 255;
    x = 1700;
    originalX = 1700;
    maxMoveDistance = 500;
    maxBossCharacterDistance = 300;

    speed = 5;
    lastHit = 0;
    width = 150;
    heigth = 200;
    hitpoints = 200;

    dmgHit = false;
    isSpotted = false;
    isMovingBack = false;
    spotDistance = 500;

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


    constructor() {
        super().loadImg('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImgArrys()
        this.animation();
        this.moving();
        this.startSpawningChickens();
    }


    loadImgArrys() {
        this.loadImgS(this.IMG_WALKIN)
        this.loadImgS(this.IMG_HURT)
        this.loadImgS(this.IMG_ALERT)
        this.loadImgS(this.IMG_ATTACK)
        this.loadImgS(this.IMG_DEAD)
    }


    moving() {
        setInterval(() => {
            this.spottingAndMoveble();
        }, 50);
    }

    spottingAndMoveble() {
        if (this.hitpoints > 0) {
            if (this.isSpotted) {
                this.BossSpottingCharacter();
            } else if (!this.isSpotted) {
                this.returnToOriginalPosition()
            }
        }
    }


    returnToOriginalPosition() {
        // Wenn der Charakter nicht gespottet wird, kehre zum Ausgangspunkt zurück
        const distanceToOriginalX = this.calculateDistanceFromOriginalX();
        if (Math.abs(distanceToOriginalX) >= 5) {
            // Hier kannst du eine Schrittweite angeben, um die Bewegungsgeschwindigkeit anzupassen
            this.x += distanceToOriginalX > 2 ? 5 : -5;
        } else {
            // Wenn die Entfernung zum Ausgangspunkt klein ist, setze die Position auf den Ausgangswert zurück
            this.x = this.originalX;
        }
    }


    BossSpottingCharacter() {
        // Wenn der Charakter gespottet wird
        const distanceToCharacter = this.distanceBossToCharacter();


        if (this.isWithinMaxMoveDistance) {
            // Wenn die Distanz zum Charakter kleiner oder gleich der maximalen Entfernung ist,
            // bewege den Boss direkt auf den Charakter zu
            this.x += distanceToCharacter > 0 ? -this.speed : this.speed;
        } else {
            // Wenn die maximale Entfernung erreicht wurde, ändere die Bewegungsrichtung, um zurückzukehren
            this.x += this.speed * 5; // Hier kannst du die Geschwindigkeit anpassen (z. B. 5 Pixel pro Schritt)
            if (this.maxMovementRange()) {
                this.speed *= -1;
            }
        }
    }


    maxMovementRange() {
        return Math.abs(this.x - this.originalX) >= this.maxMoveDistance
    }


    isWithinMaxMoveDistance(distance, maxDistance) {
        return Math.abs(distance) <= maxDistance;
    }


    startSpawningChickens() {
        setInterval(() => {
            this.spawnChickenIfConditionsMet();
        }, 3000);
    }


    distanceBossToCharacter() {
        return this.x - world.character.x;
    }


    calculateDistanceFromOriginalX() {
        return this.originalX - this.x;
    }


    spawnChickenIfConditionsMet() {
        if (this.hitpoints <= 100 && this.isSpotted) {
            world.spawnChickens.push(
                new SpawnChicken(),
                new SpawnChicken(),
                new SpawnChicken()
            );
        }
    }


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
                this.isWin();
            }
        }, 400);
    }

}