class HighCloud extends MovableObjekt {
    y = -30;
    width = 400;
    heigth = 300;
    x = 0;
    speed = 1;
    millisecond = 10000000;

    constructor(x) {
        super().loadImg('img/5_background/layers/4_clouds/2.png');
        this.x = x + Math.random() * 100;
        this.animateMoveCloud();
        this.y = -30 + Math.random() * 20
    }


    animateMoveCloud() {
        this.moveLeft(this.millisecond, this.speed);
    }

}