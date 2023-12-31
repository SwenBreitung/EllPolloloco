/**
 * this class is the mid cloud
 * @class
 */
class MidCloud extends MovableObjekt {
    y = 60;
    width = 200;
    height = 150;
    x = 350;
    speed = 0.1;
    millisecond = 1000;

    /**
     * Creates an instance of the Cloud class.
     * 
     * @param {number} x - This is the variable to use the x-coordinate from the level.
     * @param {number} y - This is the variable of the y-axis, defined in the global variables.
     */
    constructor(x) {
        super().loadImg('img/5_background/layers/4_clouds/2.png');
        this.x = x;
        this.animateMoveCloud();
        this.y = 60 + Math.random() * 10;
    }
}