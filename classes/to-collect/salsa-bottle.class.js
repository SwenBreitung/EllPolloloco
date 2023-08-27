 /**
  * this class is the salsa bottle class
  * @class
  */
 class SalsaBottle extends MovableObjekt {
     y = 200;
     width = 50;
     height = 50;
     x = 0;

     /**
      * Initializes a salt bottle at a specific X-coordinate.
      * 
      * @param {string} imgPath - The path to the salt bottle's image.
      * @param {number} x - The X-coordinate where the salt bottle should be placed.
      */
     constructor(imgPath, x) {
         super().loadImg(imgPath, x);
         this.x = x;
         this.y = 390;
         this.spawn();
     }


     animation() {
         setStoppebleInterval(() => {
             this.playAnimation(level.salsaBottle);
         }, 50);
     }
 }