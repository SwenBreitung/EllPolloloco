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
        this.addToMapForEach(this.lvl.clouds);

        this.addToMapForEach(this.lvl.midClouds);
        this.addToMapForEach(this.lvl.highClouds);
        this.addToMapForStaticObjekt(this.statusBar)
        this.addToMapForStaticObjekt(this.statusBarEnergyBottle)
        this.addToMapForStaticObjekt(this.statusBarCoin)
        this.addToMap(this.character);

        if (this.keyboard.SHIFT) {
            this.addToMapForEach(this.throwableObjekt);
        }
        this.addToMapForEach(this.lvl.enemies);
        this.addToMapForEach(this.spawnChickens);
        this.addToMapForEach(this.lvl.salsaBottle);


        this.addToMapForEach(this.lvl.jumpChickens);
        this.addToMapForEach(this.lvl.coin);
        this.addToMapForEach(this.lvl.healthItem);
        this.addToMapForEach(this.lvl.infiniteChickens);
        this.addToMapForEach(this.lvl.endboss);

        //beeinflusst die kamera und sorgt dafür das diese auf den char bleibt
        this.ctx.translate(-this.camera_x, 0)
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
        setInterval(() => {
            this.checkThrowObject();
        }, 400);

        setInterval(() => {
            this.checkColision();
        }, 50);
        this.handleEnemyCollisions();
        this.handleCollisionWithEndboss();
        this.isCharacterSpottedByBoss();
        this.isCharacterSpottedByJumpingChicken();
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
        setInterval(() => {
            this.lvl.jumpChickens.forEach((jumpChicken, i) => {
                // console.log(endboss);
                this.character.jumpingChickenSpotCharacter(jumpChicken, i);
                // if (this.lvl.endboss[i].isSpotted == true) {
                // console.log(`gefunden`);
                // } else {
                //     console.log('nicht gefunden')
                // }
            });
        }, 500);
    }


    isCharacterSpottedByBoss() {
        setInterval(() => {
            this.lvl.endboss.forEach((endboss, i) => {
                // console.log(endboss);
                this.character.bossSpotCharacter(endboss, i);
                // if (this.lvl.endboss[i].isSpotted == true) {
                //     console.log(`gefunden`);
                // } else {
                //     console.log('nicht gefunden')
                // }
            });
        }, 500);
    }


    handleCollisionWithEndboss() {
        setInterval(() => {
            this.lvl.endboss.forEach((endboss) => {
                if (this.character.isColliding(endboss)) {
                    this.character.dmgCollisionCalc();
                    this.statusBar.setPercentet(this.character.hitpoints);
                }
            });
        }, 500);
    }


    handleEnemyCollisions() {
        this.dmgFromEnemy();
        this.killEnemy();
    }


    killEnemy() {
        setInterval(() => {
            this.lvl.enemies.forEach((enemy, i) => {
                if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                    this.lvl.enemies.splice(i, 1);
                }
            });
            this.spawnChickens.forEach((spawnChicken, i) => {
                if (this.character.isColliding(spawnChicken) && this.character.isAboveGround()) {
                    this.spawnChickens.splice(i, 1);
                }
            });
            this.lvl.infiniteChickens.forEach((infiniteChicken, i) => {
                if (this.character.isColliding(infiniteChicken) && this.character.isAboveGround()) {
                    this.lvl.infiniteChickens.splice(i, 1);
                }
            });
        }, 50);
    }


    dmgFromEnemy() {
        setInterval(() => {
            this.lvl.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) && !this.character.isAboveGround()) {
                    this.character.dmgCollisionCalc();
                    this.statusBar.setPercentet(this.character.hitpoints);
                }
            });

            this.spawnChickens.forEach((spawnChicken) => {
                if (this.character.isColliding(spawnChicken) && !this.character.isAboveGround()) {
                    this.character.dmgCollisionCalc();
                    this.statusBar.setPercentet(this.character.hitpoints);
                }
            });

            this.lvl.jumpChickens.forEach((jumpChicken) => {
                if (this.character.isColliding(jumpChicken) && !this.character.isAboveGround()) {
                    this.character.dmgCollisionCalc();
                    this.statusBar.setPercentet(this.character.hitpoints);
                }
            });

            this.lvl.infiniteChickens.forEach((infiniteChicken) => {
                if (this.character.isColliding(infiniteChicken) && !this.character.isAboveGround()) {
                    this.character.dmgCollisionCalc();
                    this.statusBar.setPercentet(this.character.hitpoints);
                }
            });
        }, 1000);
    }


    checkColision() {
        this.throwableObjekt.forEach((throwableObjekt, i) => {
            this.lvl.enemies.forEach((enemy) => {
                if (throwableObjekt.isColliding(enemy)) {
                    this.throwableObjekt.splice(i, 1);
                    // console.log('treffer', enemy, throwableObjekt)
                }
            })
        });

        this.throwableObjekt.forEach((throwableObjekt, i) => {
            this.lvl.endboss.forEach((endboss, j) => {
                if (throwableObjekt.isColliding(endboss)) {
                    // this.character.bottleAttackOnBoss(i);
                    this.throwableObjekt.splice(i, 1);
                    this.lvl.endboss[j].dmgCollisionCalc();
                    console.log('treffer', endboss, throwableObjekt)
                }
            })
        });


        this.lvl.coin.forEach((coin, i) => {
            if (this.character.isColliding(coin) && this.max100EnergyCoins()) {
                this.statusBarCoin.setPercentet(this.character.coins);
                this.lvl.coin.splice(i, 1);
                this.character.coinsPositivCalc();
                this.statusBarCoin.setPercentet(this.character.coins);
            }
        });


        this.lvl.healthItem.forEach((healthItem, i) => {
            if (this.character.isColliding(healthItem) && this.maxHitpoints()) {
                this.statusBarCoin.setPercentet(this.character.hitpoints);
                this.lvl.healthItem.splice(i, 1);
                this.character.hitpointsPositivCalc();
                this.statusBar.setPercentet(this.character.hitpoints);
            }
        });


        this.lvl.salsaBottle.forEach((salsaBottle, i) => {

            if (this.character.isColliding(salsaBottle) && this.max100EnergyBottle()) {
                this.character.bottleEngeryPositivCalc();
                // console.log(`Collision with bottle at index`, i);
                this.statusBarEnergyBottle.setPercentet(this.character.bottleEnergy);
                this.lvl.salsaBottle.splice(i, 1);
            }


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


    //===================================Flipp the Objekt and return END================================


}