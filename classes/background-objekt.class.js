class backgroundObjekt extends MovableObjekt {
    y = 300;
    heigth = 480;
    width = 720;

    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.x = x;
        this.y = 480 - this.heigth;

    }


}