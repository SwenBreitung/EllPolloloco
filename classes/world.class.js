class World {
    canvas;
    ctx;
    character = new Character('img/2_character_pepe/1_idle/idle/I-1.png');
    keyboard;
    camera_x = 0;
    lvl = level1;
    statusBar = new StatusBar();
    statusBarEnergyBottle = new StatusBarEnergyBottle();
    statusBarCoin = new StatusBarCoin();
    throwableObjekt = [new ThrowableObjekt()];
    spawnChickens = [];
    justTrewBottle = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d')
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    //---------------------Desing the Wolrd---------------------------------

    setWorld() {
        this.character.world = this;
    }


    draw() {
        //löscht die alten Bilder so wie z.b. beim pokedex die cards wenn man sie neu lädt
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // generiert die map 
        this.ctx.translate(this.camera_x, 0)
            //Dies ist für die Animation, bzw fürs neuladen der Bilder (FPS)
        let self = this
        requestAnimationFrame(function() {
            self.draw();
        });
        //Läd die elemente der Map
        this.addToMapForEach(this.lvl.backgroundObjekts);
        //Läd die elemente der objekte 
        this.addToMapForEachAllObjekts();
        //beeinflusst die kamera und sorgt dafür das diese auf den char bleibt
        this.ctx.translate(-this.camera_x, 0)
    }


    addToMapForEachAllObjekts() {
        this.addToMapForEachLoadClouds();
        this.addToMapForEachLoadStatusBars();
        this.addToMap(this.character);
        this.addToMapForEachThrowableObjekt()
        this.addToMapForEachObjekts();
        this.addToMapForEachEnemys();
        this.addToMapForEach(this.lvl.endboss);
    }


    addToMapForEachLoadClouds() {
        this.addToMapForEach(this.lvl.clouds);
        this.addToMapForEach(this.lvl.midClouds);
        this.addToMapForEach(this.lvl.highClouds);
    }


    addToMapForEachLoadStatusBars() {
        this.addToMapForStaticObjekt(this.statusBar)
        this.addToMapForStaticObjekt(this.statusBarEnergyBottle)
        this.addToMapForStaticObjekt(this.statusBarCoin)
    }


    addToMapForEachThrowableObjekt() {
        if (this.keyboard.SHIFT) {
            this.addToMapForEach(this.throwableObjekt);
        }
    }


    addToMapForEachObjekts() {
        this.addToMapForEach(this.lvl.coin);
        this.addToMapForEach(this.lvl.healthItem);
        this.addToMapForEach(this.lvl.salsaBottle);
    }


    addToMapForEachEnemys() {
        this.addToMapForEach(this.lvl.enemies);
        this.addToMapForEach(this.spawnChickens);
        this.addToMapForEach(this.lvl.jumpChickens);
        this.addToMapForEach(this.lvl.infiniteChickens);
    }


    addToMap(e) {
        if (e.otherDiscption) {
            this.flippImg(e);
        }
        e.draw(this.ctx);
        e.drawBorder(this.ctx);
        if (e.otherDiscption) {
            this.flippImgBack(e);
        }
    }


    addToMapForEach(arry) {
        arry.forEach(e => {
            this.addToMap(e)
        });
    }


    addToMapForStaticObjekt(obj) {
        this.ctx.translate(-this.camera_x, 0)
        this.addToMap(obj);
        this.ctx.translate(this.camera_x, 0)
    }

    //=========================Desing the Wolrd END=======================================

    run() {
        setStoppebleInterval(() => {
            this.checkThrowObject();
        }, 500);

        setStoppebleInterval(() => {
            this.checkColision();
        }, 50);
        this.handleEnemyCollisions();
        this.spottingEnemys();
    }


    spottingEnemys() {
        setStoppebleInterval(() => {
            this.isCharacterSpottedByBoss();
            this.isCharacterSpottedByJumpingChicken();
        }, 500);
    }


    checkThrowObject() {
        if (this.keyboard.SHIFT && this.character.bottleEnergy >= 20 && !this.justTrewBottle) {
            this.character.bottleEngeryNegativCalc();
            this.statusBarEnergyBottle.setPercentet(this.character.bottleEnergy);
            let bottle = new ThrowableObjekt(this.character.x, this.character.y);
            this.throwableObjekt.push(bottle);

            this.justTrewBottle = true;
            setTimeout(() => {
                this.justTrewBottle = false;
            }, 1000)
        }
    }


    isCharacterSpottedByJumpingChicken() {

        this.lvl.jumpChickens.forEach((jumpChicken, i) => {
            this.character.jumpingChickenSpotCharacter(jumpChicken, i);
        });

    }


    isCharacterSpottedByBoss() {

        this.lvl.endboss.forEach((endboss, i) => {
            this.character.bossSpotCharacter(endboss, i);
        });

    }


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


    handleEnemyCollisions() {
        this.dmgFromEnemys();
        this.killEnemy();
        this.handleCollisionWithEndboss();
    }


    killEnemy() {
        setStoppebleInterval(() => {
            this.lvl.enemies.forEach((enemy, i) => this.killWithCollidingEnemy(enemy, i, this.lvl.enemies));
            this.spawnChickens.forEach((spawnChicken, i) => this.killWithCollidingEnemy(spawnChicken, i, this.spawnChickens));
            this.lvl.infiniteChickens.forEach((infiniteChicken, i) => this.killWithCollidingEnemy(infiniteChicken, i, this.lvl.infiniteChickens));
        }, 50);
    }

    killWithCollidingEnemy(infiniteChicken, i, arry) {
        if (this.character.isColliding(infiniteChicken) && this.character.isAboveGround()) {
            arry.splice(i, 1);
        }
    }


    dmgFromEnemys() {
        setStoppebleInterval(() => {
            this.lvl.enemies.forEach((enemy) => this.dmgFromEnemy(enemy));
            this.spawnChickens.forEach((spawnChicken) => this.dmgFromEnemy(spawnChicken));
            this.lvl.jumpChickens.forEach((jumpChicken) => this.dmgFromEnemy(jumpChicken));
            this.lvl.infiniteChickens.forEach((infiniteChicken) => this.dmgFromEnemy(infiniteChicken));
        }, 1000);
    }


    dmgFromEnemy(enemy) {
        if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
            this.character.dmgCollisionCalc();
            this.statusBar.setPercentet(this.character.hitpoints);
        }
    }


    checkColision() {
        this.checkThrowableObjectEnemysCollisions()
        this.checkCharacterObjectsCollisions();
    }


    checkThrowableObjectEnemysCollisions() {
        this.checkThrowableObjectEnemyCollisions();
        this.checkThrowableObjectEndbossCollisions();
    }


    checkCharacterObjectsCollisions() {
        this.checkCharacterCoinCollisions();
        this.checkCharacterHealthItemCollisions();
        this.checkCharacterSalsaBottleCollisions();
    }


    checkCharacterSalsaBottleCollisions(mo) {
        this.lvl.salsaBottle.forEach((salsaBottle, i) => {
            if (this.character.isColliding(salsaBottle) && this.max100EnergyBottle()) {
                this.character.bottleEngeryPositivCalc();
                this.statusBarEnergyBottle.setPercentet(this.character.bottleEnergy);
                this.lvl.salsaBottle.splice(i, 1);
            }
        });
    }


    checkCharacterHealthItemCollisions() {
        this.lvl.healthItem.forEach((healthItem, i) => {
            if (this.character.isColliding(healthItem) && this.maxHitpoints()) {
                this.statusBarCoin.setPercentet(this.character.hitpoints);
                this.lvl.healthItem.splice(i, 1);
                this.character.hitpointsPositivCalc();
                this.statusBar.setPercentet(this.character.hitpoints);
            }
        });
    }


    checkCharacterCoinCollisions() {
        this.lvl.coin.forEach((coin, i) => {
            if (this.character.isColliding(coin) && this.max100EnergyCoins()) {
                this.statusBarCoin.setPercentet(this.character.coins);
                this.lvl.coin.splice(i, 1);
                this.character.coinsPositivCalc();
                this.statusBarCoin.setPercentet(this.character.coins);
            }
        });
    }


    checkThrowableObjectEndbossCollisions() {
        this.throwableObjekt.forEach((throwableObjekt, i) => {
            this.lvl.endboss.forEach((endboss, j) => {
                if (throwableObjekt.isColliding(endboss)) {
                    this.lvl.endboss[j].dmgCollisionCalc();
                    this.throwableObjekt[i].collisionBottle = true;
                    this.throwableObjekt.splice(i, 1);
                    setTimeout(() => {
                        this.ThrowableObjekt = false;
                    }, 500)
                }
            })
        });
    }


    checkThrowableObjectEnemyCollisions() {
        this.throwableObjekt.forEach((throwableObjekt, i) => {
            this.lvl.enemies.forEach((enemy) => {
                if (throwableObjekt.isColliding(enemy)) {
                    this.throwableObjekt[i].collisionBottle = true;
                    setTimeout(() => {
                        this.throwableObjekt.splice(i, 1);
                        this.ThrowableObjekt = false;
                    }, 500)

                }
            })
        });
    }


    maxHitpoints() {
        return this.character.hitpoints < 100;
    }


    max100EnergyCoins() {
        return this.character.coins < 100;
    }


    max100EnergyBottle() {
        return this.character.bottleEnergy < 100;
    }


    //-----------------------------------Flipp the Objekt and return----------------------------

    flippImg(e) {
        this.ctx.save();
        this.ctx.translate(e.width, 0); // Setze den Ursprungspunkt auf die Mitte des Charakters
        this.ctx.scale(-1, 1); // Horizontal spiegeln
        // Zeichne das gespiegelte Bild
        e.x = e.x * -1;
    }


    flippImgBack(e) {
        e.x = e.x * -1;
        this.ctx.restore();
    }

    isLose() {
        if (world.character.hitpoints === 0) {
            resumeGame();
            const endScreen = document.getElementById('end-screen');
            const body = document.getElementById('body');
            const h1 = document.getElementById('h1');
            endScreen.innerHTML = '<img src="img/9_intro_outro_screens/game_over/you lost.png" alt="End Screen">';
            endScreen.classList.remove('d-none');
            body.classList.remove('column');
            h1.classList.add('d-none');

        }
    }

    isWin() {
            if (world.endboss.hitpoints === 0) {
                clearAllIntervals();
                const endScreen = document.getElementById('end-screen');
                endScreen.innerHTML = '<img src="img/9_intro_outro_screens/game_over/you lost.png" alt="End Screen">';

            }
        }
        //===================================Flipp the Objekt and return END================================


}