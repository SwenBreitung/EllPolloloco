class StatusBar extends DrawableObjekt {
    img_live_green = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]
    percentet = 100;
    x = 0;
    y = 0;
    width = 300;
    height = 60;

    /**
     * Initializes the HP status bar.
     */
    constructor() {
        super();
        this.loadImgS(this.img_live_green);
        this.setPercentet(100);
    }


    /**
     * Updates the status bar to the specified percentage and updates the corresponding image based on the percentage.
     * 
     * @param {number} percentage - The percentage value to update the status bar.
     */
    setPercentet(percentet) {
        this.percentet = percentet
        let path = this.img_live_green[this.resolveStatusBarImageIndex()];
        this.img = this.imgCach[path];

    }


    /**
     * Determines the index of the image for the status bar based on the current percentage value.
     * 
     * @returns {number|null} The index of the image for the status bar, or null if the percentage is invalid.
     */
    resolveStatusBarImageIndex() {
        if (this.percentet >= 0 && this.percentet < 20) {
            return 0;
        } else if (this.percentet >= 20 && this.percentet < 40) {
            return 1;
        } else if (this.percentet >= 40 && this.percentet < 60) {
            return 2;
        } else if (this.percentet >= 60 && this.percentet < 80) {
            return 3;
        } else if (this.percentet >= 80 && this.percentet < 100) {
            return 4;
        } else if (this.percentet == 100) {
            return 5;
        } else {
            console.log('Errow in resolveStatusBarImageIndex()', this.percentet)
            return null;
        }
    }
}