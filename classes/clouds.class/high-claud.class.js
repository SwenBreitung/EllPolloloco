class HighCloud extends MovableObjekt {
    y = -30;
    width = 400;
    height = 300;
    x = 0.003;
    speed = 1;
    millisecond = 100000;

    /**
     * Creates an instance of the Cloud class.
     * 
     * @param {number} x - This is the variable to use the x-coordinate from the level.
     * @param {number} y - This is the variable of the y-axis, defined in the global variables.
     */

    constructor(x) {
        super().loadImg('img/5_background/layers/4_clouds/2.png');
        this.x = x + Math.random() * 100;
        this.animateMoveCloud();
        this.y = -30 + Math.random() * 20
    }


    /**
     * This function defines the movement of the cloud and its speed.
     * 
     * @param {number} millisecond - Die Anzahl der Millisekunden, in denen die Animation abläuft.
     * @param {number} speed - Die Geschwindigkeit der Wolke, die an die nächste Funktion übergeben wird.
     */
    animateMoveCloud() {
        this.moveLeft(this.millisecond, this.speed);
    }

}