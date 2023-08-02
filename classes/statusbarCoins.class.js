class StatusBarCoin extends DrawableObjekt {
    img_statusBar_coin = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]

    percentet = 0;
    x = 0;
    y = 90;
    width = 300;
    heigth = 60;

    constructor() {
        super();
        this.loadImgS(this.img_statusBar_coin);
        this.setPercentet(0);
    }


    setPercentet(percentet) {
        this.percentet = percentet
        let path = this.img_statusBar_coin[this.resolveStatusBarImageIndex()];
        this.img = this.imgCach[path];

    }


    resolveStatusBarImageIndex() {
        if (this.percentet >= 0 && this.percentet < 20) {
            this.coins = this.percentet;
            return 0;
        } else if (this.percentet >= 20 && this.percentet < 40) {
            this.coins = this.percentet;
            return 1;
        } else if (this.percentet >= 40 && this.percentet < 60) {
            this.coins = this.percentet;
            return 2;
        } else if (this.percentet >= 60 && this.percentet < 80) {
            this.coins = this.percentet;
            return 3;
        } else if (this.percentet >= 80 && this.percentet < 100) {
            this.coins = this.percentet;
            return 4;
        } else if (this.percentet == 100) {
            this.coins = this.percentet;
            return 5;
        } else {
            console.log('Errow in resolveStatusBarImageIndex()', this.percentet)
            return null;
        }
    }


}