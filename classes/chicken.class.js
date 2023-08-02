class Chicken extends MovableObjekt {
    y = 390;
    width = 50;
    heigth = 60;
    x;
    speed = 0.35 + Math.random() * 0.25;

    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];


    constructor(imgPath) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN)
        this.x = 400 + Math.random() * 1500;
        this.animation();
    }


    animation() {
        this.moveLeft(500, this.speed);
        setInterval(() => {
            this.playAnimation(this.IMG_WALKIN);
        }, 50);
    }



}