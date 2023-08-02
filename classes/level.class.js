class Level {
    enemies;
    clouds;
    backgroundObjekts;
    salsaBottle;
    coin;
    lvl_end_x = 719 * 3;
    constructor(enemies, clouds, backgroundObjekts, salsaBottle, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjekts = backgroundObjekts;
        this.salsaBottle = salsaBottle;
        this.coin = coin;
    }
}