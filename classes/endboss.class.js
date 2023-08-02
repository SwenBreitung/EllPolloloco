class Endboss extends MovableObjekt {
    y = 255;
    width = 150;
    heigth = 200;


    IMG_WALKIN = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',

    ];


    constructor() {
        super().loadImg('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImgS(this.IMG_WALKIN)
        this.x = 1700;
        this.animation();

    }


    animation() {
        setInterval(() => {
            this.playAnimation(this.IMG_WALKIN);
        }, 400);
    }
}