class MidCloud extends MovableObjekt {
    y = 60;
    width = 200;
    heigth = 150;
    x = 350;
    speed = 0.1;
    millisecond = 1000;

    constructor(x) {
        super().loadImg('img/5_background/layers/4_clouds/2.png');
        this.x = x;
        this.animateMoveCloud();
        this.y = 60 + Math.random() * 10;
    }


    animateMoveCloud() {
        this.moveLeft(this.millisecond, this.speed);
    }

}