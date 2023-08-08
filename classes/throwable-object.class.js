class ThrowableObjekt extends MovableObjekt {

    constructor(x, y) {
        super().loadImg('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 150;
        this.heigth = 100;
        this.trow();
    }


    trow() {
        this.speedY = 30;
        this.applyGravaty();
        setInterval(function() {
            this.x += 30;
        }.bind(this), 50);
    }
}