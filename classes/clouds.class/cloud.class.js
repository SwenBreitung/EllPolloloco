/**
 * this class is the low cloud
 * @class
 */
class Cloud extends MovableObjekt {
    y = 80;
    width = 100;
    height = 50;
    x = 0;
    speed = 0.05;
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
        this.y = 100 + Math.random() * 100
    }


    /**
     * This function defines the movement of the cloud and its speed.
     * 
     * @param {number} millisecond - The number of milliseconds the animation takes place in.
     * @param {number} speed - The speed of the cloud, passed to the next function.
     */
    animateMoveCloud() {
        this.moveLeft(this.millisecond, this.speed);
    }

}