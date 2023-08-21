/**
 * this class is the background
 * @class
 */
class backgroundObjekt extends MovableObjekt {
    y = 300;
    height = 480;
    width = 720;

    /**
     * Initializes the background.
     * 
     * @param {string} imgPath - The path to the background image.
     * @param {number} x - The X-coordinate where the background should be placed.
     */
    constructor(imgPath, x) {
        super().loadImg(imgPath);
        this.x = x;
        this.y = 480 - this.height;

    }
}