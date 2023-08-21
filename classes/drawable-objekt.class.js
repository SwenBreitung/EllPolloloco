/**
 * this class is the health item class
 * @class
 */
class DrawableObjekt {
    x = 50;
    y;
    img;
    currentImg = 0;
    imgCach = {};

    isBossTurned = false;
    width;
    height;
    speed;

    /**
     * This function loads individual images.
     * 
     * @param {string} imgPath - The path to the image to be loaded.
     */
    loadImg(imgPath) {
        this.img = new Image();
        this.img.src = imgPath;
    }


    /**
     * Extracts images from an array and stores them in the image cache.
     * 
     * @param {string[]} imageArray - An array of image paths from which images should be extracted.
     */
    loadImgS(arry) {
        arry.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imgCach[path] = img;
        }, 1000);
    }


    /**
     * Draws the images onto the canvas.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which the image is to be drawn.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * This function modifies the borders of the images to visualize collision sizes.
     * This is only required for optimization purposes.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which the image is to be drawn.
     */
    drawBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof SalsaBottle || this instanceof HealthItem || this instanceof JumpChicken || this instanceof InfiniteChicken) {
            ctx.beginPath();
            this.drawBlueBorder(ctx);

            if (this.offsetX !== 0 || this.offsetY !== 0) {
                ctx.beginPath(ctx);
                this.drawRedBorder(ctx);
            }
        }
    }


    /**
     * This function draws the outer borders in blue.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which the image is to be drawn.
     */
    drawBlueBorder(ctx) {
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * This function draws the inner borders in red.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context on which the image is to be drawn.
     */
    drawRedBorder(ctx) {
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offsetX, this.y + this.offsetY, this.width - 2 * this.offsetX, this.height - 2 * this.offsetY);
        ctx.stroke();
    }
}