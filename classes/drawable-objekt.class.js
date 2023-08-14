class DrawableObjekt {
    x = 50;
    y;
    img;
    currentImg = 0;
    imgCach = {};

    isBossTurned = false;
    //===================
    //Is in the Objects
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
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SalsaBottle || this instanceof ThrowableObjekt || this instanceof HealthItem || this instanceof JumpChicken || this instanceof InfiniteChicken) {
            ctx.beginPath();
            this.drawBlueBorder(ctx);

            if (this.offsetX !== 0 || this.offsetY !== 0) {
                ctx.beginPath(ctx);
                this.drawRedBorder(ctx);
            }
        }
    }


    drawBlueBorder(ctx) {
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.heigth);
        ctx.stroke();
    }

    drawRedBorder(ctx) {
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offsetX, this.y + this.offsetY, this.width - 2 * this.offsetX, this.heigth - 2 * this.offsetY);
        ctx.stroke();
    }

}