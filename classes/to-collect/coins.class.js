class Coin extends MovableObjekt {
    y = 200;
    width = 100;
    heigth = 100;
    x = 0;
    coins = 0;

    constructor(imgPath, x) {
        super().loadImg(imgPath, x);
        this.x = x + Math.random() * 250;;
        this.y = 200 + Math.random() * 150; // Zufällige Zahl zwischen 250 und 400
    }


    animation() {
        setStoppebleInterval(() => {
            this.playAnimation(level.healthItem);
        }, 50);
    }
}