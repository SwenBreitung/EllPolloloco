class Level {
    enemies;
    clouds;
    backgroundObjekts;
    salsaBottle;
    coin;
    endboss;
    healthItem;
    jumpChickens;
    infiniteChickens;
    midClouds;
    lvl_end_x = 719 * 3;
    constructor(enemies, clouds, backgroundObjekts, salsaBottle, coin, endboss, healthItem, jumpChickens, infiniteChickens, midClouds, highClouds) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjekts = backgroundObjekts;
        this.salsaBottle = salsaBottle;
        this.coin = coin;

        this.endboss = endboss;
        this.healthItem = healthItem;
        this.jumpChickens = jumpChickens
        this.infiniteChickens = infiniteChickens;
        this.midClouds = midClouds;
        this.highClouds = highClouds;
    }


    getAllVariables() {
        return [
            enemies,
            clouds,
            backgroundObjects,
            salsaBottle,
            coin,
            endboss,
            healthItem,
            jumpChickens,
            infiniteChickens,
            midClouds,
            highClouds
        ];
    }

}