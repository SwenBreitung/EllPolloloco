/**
 * this class is the health item class
 * @class
 */
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
        this.spliceEnemy()
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
        if (!configAUDIO.music && configAUDIO.isGameStart) {
            soundStop(this.configAUDIO.start_backgroundSound);
            soundStop(this.configAUDIO.BACKGROUND_AUDIO_FIGHT);
            soundStop(configAUDIO.BACKGROUND_AUDIO_GAME);
        }
    }


    //---------------------Desing the Wolrd---------------------------------

    /**
     * This function ensures that 'this' inherits all information from the Character object.
     */
    setWorld() { this.character.world = this; }


    /**
     * This function clears the canvas and repaints the canvas.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0)
        let self = this
        requestAnimationFrame(this.draw.bind(this));
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
        this.addToMapTextCoinStatusbar(this.statusBarCoin)
    }


    /**
     * This function adds text to the map for the coin status bar, considering camera position.
     * @param {object} e - The object that contains the necessary data and methods for drawing text.
     */
    addToMapTextCoinStatusbar(e) {
        this.ctx.translate(-this.camera_x, 0)
        e.drawText(this.ctx)
        this.ctx.translate(this.camera_x, 0)
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
        e.otherDiscption && this.flippImg(e);
        e.draw(this.ctx);
        // e.drawBorder(this.ctx);
        e.otherDiscption && this.flippImgBack(e);
    }


    /**
     * This function splits all arrays into individual images.
     * 
     * @param {string} arry - Arrays of animation sequences.
     */
    addToMapForEach(arry) { arry.forEach(e => this.addToMap(e)); }


    /**
     * This function generates static objects.
     * @param {objekt} obj - These are the images of the static objects.
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
            this.playBackgroundMusic();
            isLose(this);
            isWin(this);
        }, 500);

        setInterval(() => {
            this.checkThrowObject();
            this.checkColision();
        }, 1000 / 60);
        this.handleEnemyCollisions();
        this.character.spottingEnemys();
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
            let throwright = this.character.throwToRigh;
            let bottle = new ThrowableObject(this.character.x, this.character.y, throwright);
            this.throwableObjects.push(bottle);
            this.throwableObjects.justThrewBottle = true;
            setTimeout(() => this.throwableObjects.justThrewBottle = false, 1000)
        }
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
        setInterval(() => {
            this.lvl.endboss.forEach((endboss) => {
                if (this.character.isColliding(endboss)) {
                    this.character.dmgCollisionCalc(100);
                    this.statusBar.setPercentet(this.character.hitpoints);
                }
            });
        }, 1000 / 60);
    }


    /**
     * This function checks which enemies collide with the character at a setInterval of 50.
     */
    killEnemy() {
        setInterval(() => {
            this.lvl.enemies.forEach((enemy, i) => this.killWithCollidingEnemy(enemy, i, this.lvl.enemies));
            this.spawnChickens.forEach((spawnChicken, i) => this.killWithCollidingEnemy(spawnChicken, i, this.spawnChickens));
            this.lvl.infiniteChickens.forEach((infiniteChicken, i) => this.killWithCollidingEnemy(infiniteChicken, i, this.lvl.infiniteChickens));
            this.lvl.jumpChickens.forEach((jumpChicken, i) => this.killWithCollidingEnemy(jumpChicken, i, this.lvl.jumpChickens));
        }, 1000 / 60);
    }

    /**
     * This function periodically removes elements from different arrays containing enemy-related objects.
     */
    spliceEnemy() {
        setInterval(() => {
            this.lvl.enemies.forEach((enemy, i) => this.splicing(i, this.lvl.enemies));
            this.spawnChickens.forEach((spawnChicken, i) => this.splicing(i, this.spawnChickens));
            this.lvl.infiniteChickens.forEach((infiniteChicken, i) => this.splicing(i, this.lvl.infiniteChickens));
            this.lvl.jumpChickens.forEach((jumpChicken, i) => this.splicing(i, this.lvl.jumpChickens));
        }, 1000);
    }


    /**
     * This function removes an element from the given array at the specified index if the 'isSplicing' property of the element is true.
     * @param {number} i - The index of the element to be checked and removed.
     * @param {Array} arry - The array from which the element should be removed.
     */
    splicing(i, arry) {
        if (arry[i].isSplicing) {
            arry.splice(i, 1)
        }
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
    killWithCollidingEnemy(enemy, i, arry) {
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && !arry[i].isSplicing && this.character.y - this.character.last_y > 0) {
            soundPlay(configAUDIO.chicken_audio, 0.4, 1);
            arry[i].isSplicing = true;
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
        if (this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isSplicing) {
            this.character.dmgCollisionCalc(20);
            this.statusBar.setPercentet(this.character.hitpoints);
        }
    }


    /**
     * This function checks for collisions between the throwable object and other objects as well as the ground.
     */
    checkColision() {
        this.checkThrowableObjectEnemysCollisions()
        this.checkCharacterObjectsCollisions();
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
        checkCharacterItemCollisions(this, this.lvl.coin, null, this.character.coinsPositivCalc.bind(this), configAUDIO.pic_up_item_audio, 0.5, 0.5, null);
        checkCharacterItemCollisions(this, this.lvl.healthItem, this.maxHitpoints(), this.character.hitpointsPositivCalc.bind(this), configAUDIO.eating_health_item_audio, 0.5, 0.5, this.statusBar.setPercentet(world.character.hitpoints));
        checkCharacterItemCollisions(this, this.lvl.salsaBottle, this.max100EnergyBottle(), this.character.bottleEngeryPositivCalc.bind(this.character), configAUDIO.drink_bottle_audio, 1, 0, this.statusBarEnergyBottle.setPercentet(world.character.bottleEnergy));
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
    maxHitpoints = () => this.character.hitpoints < 100;


    /**
     * Checks if the character's coin count is less than 100.
     * Returns `true` if coins are below 100, otherwise `false`.
     * This indicates whether the character has room for an increase in coins.
     * 
     * @returns {boolean} `true` if coins are less than 100, otherwise `false`.
     */
    max100EnergyCoins = () => this.character.coins < 100;


    /**
     * Checks if the character's bottle energy is less than 100.
     * Returns `true` if bottle energy is below 100, otherwise `false`.
     * This indicates whether the character has room for an increase in bottle energy.
     * 
     * @returns {boolean} `true` if bottle energy is less than 100, otherwise `false`.
     */
    max100EnergyBottle = () => this.character.bottleEnergy < 100;


    //-----------------------------------Flipp the Objekt and return----------------------------

    /**
     * This function horizontally mirrors an image to create a rotation or animation in the opposite direction.
     * 
     * @param {Image} e - The image to be mirrored.
     */
    flippImg(e) {
        this.ctx.save();
        this.ctx.translate(e.width, 0);
        this.ctx.scale(-1, 1);
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