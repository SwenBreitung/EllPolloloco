class HealthItem extends MovableObjekt {
    y = 200;
    width = 50;
    heigth = 50;
    x = 50;


    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.x = x + Math.random() * 250;;
        this.y = 100; // Zufällige Zahl zwischen 250 und 400
        this.spawn();
    }

    spawn() {
        this.speedY = 150;
        this.applyGravaty();
    }

}