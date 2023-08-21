class World {

    canvas;
    ctx;
    character = new Character('img/2_character_pepe/1_idle/idle/I-1.png');
    configAUDIO = new ConfigAUDIO();
    keyboard;
    camera_x = 0;
    lvl = level1;
    statusBar = new StatusBar();
    statusBarEnergyBottle = new StatusBarEnergyBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjects = [new ThrowableObject()];
    spawnChickens = [];

    /**
     * This function initializes the World class.
     * 
     * @param {CanvasRenderingContext2D} canvas - The canvas context.
     * @param {class} keyboard - The keyboard class.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }


    /**
     * This function starts the different background music tracks.
     */
    playBackgroundMusic() {
        if (!this.lvl.endboss[0].isSpotted && configAUDIO.music && configAUDIO.isGameStart) {
            soundStop(configAUDIO.start_backgroundSound);
            soundStop(this.configAUDIO.BACKGROUND_AUDIO_FIGHT);
            this.character.soundPlayCharacter(configAUDIO.BACKGROUND_AUDIO_GAME, 0.4, 0)
        } else if (this.lvl.endboss[0].isSpotted && configAUDIO.music && configAUDIO.isGameStart) {
            soundStop(configAUDIO.BACKGROUND_AUDIO_GAME);
            this.character.soundPlayCharacter(this.configAUDIO.BACKGROUND_AUDIO_FIGHT, 0.4, 0)
        }
    }


    //---------------------Desing the Wolrd---------------------------------

    /**
     * This function ensures that 'this' inherits all information from the Character object.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * This function clears the canvas and repaints the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        let self = this
        requestAnimationFrame(function() {
            self.draw();
        });
        this.addToMapForEach(this.lvl.backgroundObjekts);
        this.addToMapForEachAllObjekts();
        this.ctx.translate(-this.camera_x, 0)
    }


    /**
     * This function contains all arrays of objects to be painted.
     */
    addToMapForEachAllObjekts() {
        this.addToMapForEachLoadClouds();
        this.addToMapForEachLoadStatusBars();
        this.addToMapForEachThrowableObject();
        this.addToMapForEachObjekts();
        this.addToMap(this.character);
        this.addToMapForEachEnemys();
        this.addToMapForEach(this.lvl.endboss);
    }


    /**
     * This function contains all arrays of clouds to be painted.
     */
    addToMapForEachLoadClouds() {
        this.addToMapForEach(this.lvl.clouds);
        this.addToMapForEach(this.lvl.midClouds);
        this.addToMapForEach(this.lvl.highClouds);
    }


    /**
     * This function contains all stat bars to be painted.
     */
    addToMapForEachLoadStatusBars() {
        this.addToMapForStaticObjekt(this.statusBar)
        this.addToMapForStaticObjekt(this.statusBarEnergyBottle)
        this.addToMapForStaticObjekt(this.statusBarCoin)
    }


    /**
     * This function paints all throwable objects.
     */
    addToMapForEachThrowableObject() {
        this.addToMapForEach(this.throwableObjects);
    }


    /**
     * This function paints all collectible items.
     */
    addToMapForEachObjekts() {
        this.addToMapForEach(this.lvl.coin);
        this.addToMapForEach(this.lvl.healthItem);
        this.addToMapForEach(this.lvl.salsaBottle);
    }


    /**
     * This function paints all enemies.
     */
    addToMapForEachEnemys() {
        this.addToMapForEach(this.lvl.enemies);
        this.addToMapForEach(this.spawnChickens);
        this.addToMapForEach(this.lvl.jumpChickens);
        this.addToMapForEach(this.lvl.infiniteChickens);
    }


    /**
     * This function directly paints the images.
     * @param {string} e - Individual images from the arrays.
     */
    addToMap(e) {
        if (e.otherDiscption) {
            this.flippImg(e);
        }
        e.draw(this.ctx);
        // e.drawBorder(this.ctx);
        if (e.otherDiscption) {
            this.flippImgBack(e);
        }
    }


    /**
     * This function splits all arrays into individual images.
     * 
     * @param {string} arry - Arrays of animation sequences.
     */
    addToMapForEach(arry) {
        arry.forEach(e => {
            this.addToMap(e)
        });
    }


    /**
     * This function generates static objects.
     * @param {*} obj - These are the images of the static objects.
     */
    addToMapForStaticObjekt(obj) {
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(obj);
        this.ctx.translate(this.camera_x, 0)
    }

    //=========================Desing the Wolrd END=======================================

    /**
     * This lists all relevant functions.
     */
    run() {
        setInterval(() => {
            this.checkThrowObject();
            this.playBackgroundMusic();
            isWin(this);
            isLose(this);
        }, 500);

        setInterval(() => {
            this.checkColision();
        }, 50);
        this.handleEnemyCollisions();
        this.spottingEnemys();
    }


    /**
     * Checks if a bottle can be thrown based on key inputs and energy state.
     * Conditions: Shift key pressed, bottle energy >= 20, no previous bottle thrown.
     * If conditions are met, a bottle is created, energy is deducted, status is updated,
     * and a throw cooldown of 1 second is activated.
     */
    checkThrowObject() {
        if (this.keyboard.SHIFT && this.character.bottleEnergy >= 20 && !this.throwableObjects.justThrewBottle) {
            this.character.bottleEngeryNegativCalc();
            this.statusBarEnergyBottle.setPercentet(this.character.bottleEnergy);
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.throwableObjects.justThrewBottle = true;
            setTimeout(() => {
                this.throwableObjects.justThrewBottle = false;
            }, 1000)
        }
    }


    /**
     * This function lists the enemies that can detect the character.
     */
    spottingEnemys() {
        setInterval(() => {
            this.isCharacterSpottedByEnemy(this.lvl.endboss);
            this.isCharacterSpottedByEnemy(this.lvl.jumpChickens);
        }, 500);
    }


    /**
     * This function checks if enemies have spotted the character.
     * 
     * @param {Array} enemy - All enemies equipped with a spotting function.
     */
    isCharacterSpottedByEnemy(enemys) {
        enemys.forEach((enemy, i) => {
            this.character.enemySpotCharacter(enemy, i);
        });
    }


    /**
     * Handles collisions with foes and enemies.
     * This method handles damage calculation to the player character,
     * eliminating enemies, and reacting to collisions with a boss.
     */
    handleEnemyCollisions() {
        this.dmgFromEnemys();
        this.killEnemy();
        this.handleCollisionWithEndboss();
    }


    /**
     * Checks if the character collides with the end boss.
     * Additionally, it calculates the amount of HP to deduct from the character upon collision.
     */
    handleCollisionWithEndboss() {
        setStoppebleInterval(() => {
            this.lvl.endboss.forEach((endboss) => {
                if (this.character.isColliding(endboss)) {
                    this.character.dmgCollisionCalc();
                    this.statusBar.setPercentet(this.character.hitpoints);
                }
            });
        }, 500);
    }


    /**
     * This function checks which enemies collide with the character at a setInterval of 50.
     */
    killEnemy() {
        setStoppebleInterval(() => {
            this.lvl.enemies.forEach((enemy, i) => this.killWithCollidingEnemy(enemy, i, this.lvl.enemies));
            this.spawnChickens.forEach((spawnChicken, i) => this.killWithCollidingEnemy(spawnChicken, i, this.spawnChickens));
            this.lvl.infiniteChickens.forEach((infiniteChicken, i) => this.killWithCollidingEnemy(infiniteChicken, i, this.lvl.infiniteChickens));
        }, 50);
    }


    /**
     * Removes an element from an array (such as enemies) based on collision and position.
     * If the player character collides with an element from the array and is above the ground,
     * the element is removed from the array. Suitable for collisions with enemies.
     * 
     * @param {Array} enemys - The array containing the elements (e.g., enemies).
     * @param {number} i - The position of the element in the array used for collision calculation.
     * @param {Array} arry - The array from which the element should be removed.
     */
    killWithCollidingEnemy(enemys, i, arry) {
        if (this.character.isColliding(enemys) && this.character.isAboveGround() && this.character.y - this.character.last_y > 0) {
            soundPlay(configAUDIO.chicken_audio, 0.4, 1);
            arry.splice(i, 1);
        }
    }


    /**
     * This function calculates if a collision with damage occurs to the character.
     */
    dmgFromEnemys() {
        setStoppebleInterval(() => {
            this.lvl.enemies.forEach((enemy) => this.dmgFromEnemy(enemy));
            this.spawnChickens.forEach((spawnChicken) => this.dmgFromEnemy(spawnChicken));
            this.lvl.jumpChickens.forEach((jumpChicken) => this.dmgFromEnemy(jumpChicken));
            this.lvl.infiniteChickens.forEach((infiniteChicken) => this.dmgFromEnemy(infiniteChicken));
        }, 1000);
    }


    /**
     * This function calculates if a collision has occurred.
     * Additionally, it calculates the damage from the collision and deducts hit points from the character.
     * @param {string} enemy - This is the individual enemy object.
     */
    dmgFromEnemy(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
            this.character.dmgCollisionCalc();
            this.statusBar.setPercentet(this.character.hitpoints);
        }
    }


    /**
     * This function checks for collisions between the throwable object and other objects as well as the ground.
     */
    checkColision() {
        this.checkThrowableObjectEnemysCollisions(this)
        this.checkCharacterObjectsCollisions(this);
    }


    /**
     * This function checks if the bottle collides with the main objects.
     */
    checkThrowableObjectEnemysCollisions() {
        checkThrowableObjectEnemyCollisions(this);
        checkThrowableObjectEndbossCollisions(this);
        checkThrowableObjecGround(this);
    }


    /**
     * This function checks if the character collides with the static positive objects.
     */
    checkCharacterObjectsCollisions() {
        checkCharacterCoinCollisions(this);
        checkCharacterHealthItemCollisions(this);
        checkCharacterSalsaBottleCollisions(this);
    }


    /**
     * This function splits the Throwable Object.
     * 
     * @param {number} i - The position of the array for splicing the object.
     */
    spliceThrowableObject(i) {
        const currentThrowableObject = this.throwableObjects;
        setTimeout(() => {
            currentThrowableObject.splice(i, 1);
            this.ThrowableObjekt = false;
        }, 100);
    }


    /**
     * Checks if the character's hit points are less than 100.
     * Returns `true` if hit points are below 100, otherwise `false`.
     * This indicates whether the character has room for an increase in hit points.
     * 
     * @returns {boolean} `true` if hit points are less than 100, otherwise `false`.
     */
    maxHitpoints() {
        return this.character.hitpoints < 100;
    }


    /**
     * Checks if the character's coin count is less than 100.
     * Returns `true` if coins are below 100, otherwise `false`.
     * This indicates whether the character has room for an increase in coins.
     * 
     * @returns {boolean} `true` if coins are less than 100, otherwise `false`.
     */
    max100EnergyCoins() {
        return this.character.coins < 100;
    }


    /**
     * Checks if the character's bottle energy is less than 100.
     * Returns `true` if bottle energy is below 100, otherwise `false`.
     * This indicates whether the character has room for an increase in bottle energy.
     * 
     * @returns {boolean} `true` if bottle energy is less than 100, otherwise `false`.
     */
    max100EnergyBottle() {
        return this.character.bottleEnergy < 100;
    }


    //-----------------------------------Flipp the Objekt and return----------------------------

    /**
     * This function horizontally mirrors an image to create a rotation or animation in the opposite direction.
     * 
     * @param {Image} e - The image to be mirrored.
     */
    flippImg(e) {
        this.ctx.save();
        this.ctx.translate(e.width, 0); // Setze den Ursprungspunkt auf die Mitte des Charakters
        this.ctx.scale(-1, 1); // Horizontal spiegeln
        // Zeichne das gespiegelte Bild
        e.x = e.x * -1;
    }


    /**
     * Rotates the image back to its original orientation after mirroring.
     * 
     * @param {Image} e - The image to be rotated back.
     */
    flippImgBack(e) {
        e.x = e.x * -1;
        this.ctx.restore();
    }

    //===================================Flipp the Objekt and return END================================
}