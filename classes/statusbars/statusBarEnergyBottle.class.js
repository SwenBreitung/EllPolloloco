/**
 * this class is the character energy statusbar
 * @class
 */
class StatusBarEnergyBottle extends DrawableObjekt {
    img_engery_bottle_orange = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ]

    percentet = 0;
    x = 0;
    y = 50;
    width = 300;
    height = 60;

    /**
     * Initializes the energy bottle status bar.
     */
    constructor() {
        super();
        this.loadImgS(this.img_engery_bottle_orange);
        this.setPercentet(0);
    }


    /**
     * Updates the status bar to the specified percentage and updates the corresponding image based on the percentage.
     * 
     * @param {number} percentage - The percentage value to update the status bar.
     */
    setPercentet(percentet) {
        this.percentet = percentet
        let path = this.img_engery_bottle_orange[this.resolveStatusBarImageIndex()];
        this.img = this.imgCach[path];
    }


    /**
     * Determines the index of the image for the status bar based on the current percentage value.
     * 
     * @returns {number|null} The index of the image for the status bar, or null if the percentage is invalid.
     */
    resolveStatusBarImageIndex() {
        this.bottleEnergy = this.percentet;
        if (this.percentet >= 0 && this.percentet <= 100) {
            return Math.floor(this.percentet / 20);
        } else {
            console.log('Error in resolveStatusBarImageIndex()', this.percentet);
            return null;
        }
    }
}