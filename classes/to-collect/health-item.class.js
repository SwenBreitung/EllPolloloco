class HealthItem extends MovableObjekt {
    y = 0;
    width = 50;
    height = 50;
    x = 50;

    /**
     * Initializes a health item at a specific X-coordinate.
     * 
     * @param {string} imgPath - The path to the health item's image.
     * @param {number} x - The X-coordinate where the health item should be placed.
     */
    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.x = x + Math.random() * 250;;
        this.y = 100;
        this.spawn();
    }


    /**
     * Makes the coin appear and initially fall downwards.
     * Sets the vertical speed and applies gravity.
     */
    spawn() {
        this.speedY = 280;
        this.applyGravity();
    }
}