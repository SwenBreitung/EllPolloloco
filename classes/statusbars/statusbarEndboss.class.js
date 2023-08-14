class StatusBar extends DrawableObjekt {
    img_live_blue = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]

    img_live_green = []

    percentet = 100;
    x = 0;
    y = 0;
    width = 300;
    heigth = 60;
    lastHitboss = 0;
    constructor() {
        super();
        this.loadImgS(this.img_live_green);
        this.setPercentet(100);
    }


    setPercentet(percentet) {
        this.percentet = percentet
        let path = this.img_live_green[this.resolveStatusBarImageIndex()];
        this.img = this.imgCach[path];

    }


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