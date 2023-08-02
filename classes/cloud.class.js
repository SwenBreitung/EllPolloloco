class Cloud extends MovableObjekt {
    y = 20;
    width = 100;
    heigth = 50;
    x = 350;
    speed = 1;
    millisecond = 1000;

    constructor() {
        super().loadImg('img/5_background/layers/4_clouds/2.png');
        this.x = Math.random() * 350;
        this.animateMoveCloud();
    }


    animateMoveCloud() {
        this.moveLeft(this.millisecond, this.speed);
    }

}