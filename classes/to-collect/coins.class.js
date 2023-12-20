/**loadImg
 * this class is the coin class
 * @class
 */
class Coin extends MovableObjekt {
    y = 200;
    width = 100;
    height = 100;
    x = 0;


    offsetRight = 30;
    offsetLeft = 30;
    offsetTop = 30;
    offsetBottom = 30;

    /**
     * Initializes the coin.
     */
    constructor(imgPath, x) {
        super().loadImg(imgPath, x);
        this.x = x + Math.random() * 250;;
        this.y = 200 + Math.random() * 150;
    }
}