class HealthItem extends MovableObjekt {
    y = 0;
    width = 50;
    heigth = 50;
    x = 50;


    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.x = x + Math.random() * 250;;
        this.y = 100;
        this.spawn();
    }

    spawn() {
        this.speedY = 280;
        this.applyGravaty();
    }

}