class Cloud extends MovableObjekt {
    y = 80;
    width = 100;
    heigth = 50;
    x = 0;
    speed = 0.05;
    millisecond = 1000;

    constructor(x) {
        super().loadImg('img/5_background/layers/4_clouds/2.png');
        this.x = x;
        this.animateMoveCloud();
        this.y = 100 + Math.random() * 100
    }


    animateMoveCloud() {
        this.moveLeft(this.millisecond, this.speed);
    }

}