/**
 * this class is the character coin statusbar
 * @class
 */
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
    y = 110;
    width = 50;
    height = 50;
    textSize = 30;
    coinCount = 0;
    widthText = 100;
    heightText = 100;
    xText = 50;
    yText = 148;

    /**
     * Initializes the coin status bar.
     */
    constructor() {
        super().loadImg('img/7_statusbars/3_icons/icon_coin.png');
        this.coinCount = 0;
    }
}