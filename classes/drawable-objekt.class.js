class DrawableObjekt {
    x = 50;
    img;
    currentImg = 0;
    imgCach = {};
    otherDiscption = false;
    //===================
    //Is in the Objects
    y;
    //  width;
    // heigth;
    // speed;
    //===================

    loadImg(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
    }
    loadImgS(arry) {
        arry.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCach[path] = img;
        }, 1000);

    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.heigth);
    }


    drawBorder(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SalsaBottle || this instanceof ThrowableObjekt) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.heigth);
            ctx.stroke();
        }
    }

}