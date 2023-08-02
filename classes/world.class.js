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


        this.addToMapForStaticObjekt(this.statusBar)
        this.addToMapForStaticObjekt(this.statusBarEnergyBottle)
        this.addToMapForStaticObjekt(this.statusBarCoin)
        this.addToMap(this.character);


        if (this.keyboard.SHIFT) {
            this.addToMapForEach(this.throwableObjekt);
        }

        this.addToMapForEach(this.lvl.salsaBottle);
        this.addToMapForEach(this.lvl.clouds);
        this.addToMapForEach(this.lvl.enemies);
        this.addToMapForEach(this.lvl.coin);
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
            this.checkColision();
        }, 500);
    }


    checkThrowObject() {
        if (this.keyboard.SHIFT && this.character.bottleEnergy >= 20) {
            this.character.bottleEngeryNegativCalc();
            this.statusBarEnergyBottle.setPercentet(this.character.bottleEnergy);
            let bottle = new ThrowableObjekt(this.character.x, this.character.y);
            this.throwableObjekt.push(bottle);


        }
    }

    isColliding2(obj, obj2) {
        return (obj2.x + obj2.width) >= obj.x && obj2.x <= (obj.x + obj.width) &&
            (obj2.y + obj2.heigth) >= obj.y &&
            (obj2.y) <= (obj.y + obj.heigth);
        // obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    }

    checkColision() {

        this.throwableObjekt.forEach((throwableObjekt) => {
            this.lvl.enemies.forEach((enemy) => {
                if (this.isColliding2(throwableObjekt, enemy)) {
                    this.throwableObjekt.dmgCollisionCalc();
                    this.statusBar.setPercentet(this.character.hitpoints);
                    console.log('treffer', enemy)
                }
            });
        });


        this.lvl.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.dmgCollisionCalc();
                this.statusBar.setPercentet(this.character.hitpoints);
            }
        });

        this.lvl.coin.forEach((coin, i) => {
            if (this.character.isColliding(coin) && this.max100EnergyCoins()) {
                this.statusBar.setPercentet(this.character.coins);
                this.lvl.coin.splice(i, 1);
                this.character.coinsPositivCalc();

                this.statusBarCoin.setPercentet(this.character.coins);
                console.log('coins');
            }
        });



        this.lvl.salsaBottle.forEach((salsaBottle, i) => {
            if (this.character.isColliding(salsaBottle) && this.max100EnergyBottle()) {
                this.character.bottleEngeryPositivCalc();
                console.log(`Collision with bottle at index`, i);
                this.statusBarEnergyBottle.setPercentet(this.character.bottleEnergy);
                this.lvl.salsaBottle.splice(i, 1);
            }
        });
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