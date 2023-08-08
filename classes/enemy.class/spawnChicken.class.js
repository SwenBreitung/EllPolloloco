class SpawnChicken extends MovableObjekt {
    y = 390;
    width = 30;
    heigth = 30;
    x = world.lvl.endboss[0].x;
    speed = 0.80 + Math.random() * 0.25;
    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]


    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/3_w.png');
        this.loadImgS(this.IMG_WALKIN)
        this.animation();
        this.x = world.lvl.endboss[0].x;
        this.y = 390;
        this.width = 30;
        this.heigth = 30;
    }


    animation() {
        // if (world.spawnChickens.length > 1) {
        this.moveLeft(500, this.speed);
        setInterval(() => {
            this.playAnimation(this.IMG_WALKIN);
        }, 50);
        // }
    }

}