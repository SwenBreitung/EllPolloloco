class SpawnChicken extends MovableObjekt {
    y = 390;
    width = 30;
    height = 30;
    x = world.lvl.endboss[0].x;
    speed = 5 + Math.random() * 0.25;
    IMG_WALKIN = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]

    /**
     * Initializes the jump-Chicken class.
     * 
     * @param {string} this.IMG_WALKIN - Loads the walking animation.
     */
    constructor() {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/3_w.png');
        this.loadImgS(this.IMG_WALKIN)
        this.animation();
    }


    /**
     * This function defines the setInterval for the walking animation.
     */
    animation() {
        if (world.spawnChickens.length > 1) {
            super.moveLeft(50, this.speed);
            setStoppebleInterval(() => {
                this.playAnimation(this.IMG_WALKIN);
            }, 50);
        }
    }
}