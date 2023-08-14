 class SalsaBottle extends MovableObjekt {
     y = 200;
     width = 100;
     heigth = 100;
     x = 0;


     constructor(imgPath, x) {
         super().loadImg(imgPath, x);
         this.x = x + Math.random() * 250;;
         this.y = 200 + Math.random() * 150;
     }


     animation() {
         setStoppebleInterval(() => {
             this.playAnimation(level.salsaBottle);
         }, 50);
     }
 }