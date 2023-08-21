 class SalsaBottle extends MovableObjekt {
     y = 200;
     width = 100;
     height = 100;
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
         this.y = 340;
         this.spawn();
     }


     animation() {
         setStoppebleInterval(() => {
             this.playAnimation(level.salsaBottle);
         }, 50);
     }


     spawn() {
         this.speedY = 280;
         this.applyGravity();
     }
 }