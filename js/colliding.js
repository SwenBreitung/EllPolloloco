// class Colliding {

/**
 * Checks for collisions between the character and salsa bottles in the game world.
 * If a collision is detected and the character has less than 100 energy bottles, 
 * the character's bottle energy is increased, the energy bar status is updated, 
 * and the collided salsa bottle is removed from the level.
 * 
 * @param {object} world - The game world object containing level and character information.
 */
function checkCharacterSalsaBottleCollisions(world) {
    world.lvl.salsaBottle.forEach((salsaBottle, i) => {
        if (world.character.isColliding(salsaBottle) && world.max100EnergyBottle()) {
            world.character.bottleEngeryPositivCalc();
            soundPlay(configAUDIO.drink_bottle_audio, 1, 0)
            world.statusBarEnergyBottle.setPercentet(world.character.bottleEnergy);
            world.lvl.salsaBottle.splice(i, 1);

        }
    });
}


/**
 * Checks for collisions between the character and health items in the game world.
 * If a collision is detected and the character's hitpoints are not at the maximum,
 * the character's hitpoints are increased, the health bar status is updated,
 * and the collided health item is removed from the level.
 * 
 * @param {object} world - The game world object containing level and character information.
 */
function checkCharacterHealthItemCollisions(world) {
    world.lvl.healthItem.forEach((healthItem, i) => {
        if (world.character.isColliding(healthItem) && world.maxHitpoints()) {
            world.statusBarCoin.setPercentet(world.character.hitpoints);
            world.lvl.healthItem.splice(i, 1);
            world.character.hitpointsPositivCalc();
            soundPlay(configAUDIO.eating_health_item_audio, 0.5, 0.5)
            world.statusBar.setPercentet(world.character.hitpoints);
        }
    });
}


/**
 * Checks for collisions between the character and coins in the game world.
 * If a collision is detected and the character's coins are not at their maximum,
 * the character's coins are increased, the coin bar status is updated,
 * and the collided coin is removed from the level.
 * 
 * @param {object} world - The game world object containing level and character information.
 */
function checkCharacterCoinCollisions(world) {
    world.lvl.coin.forEach((coin, i) => {
        if (world.character.isColliding(coin) && world.max100EnergyCoins()) {
            world.statusBarCoin.setPercentet(world.character.coins);
            world.lvl.coin.splice(i, 1);
            world.character.coinsPositivCalc();
            soundPlay(configAUDIO.pic_up_item_audio, 0.5, 0.5)
            world.statusBarCoin.setPercentet(world.character.coins);
        }
    });
}


/**
 * Checks for collisions between throwable objects and the end boss in the game world.
 * If a collision is detected and the throwable object has not already hit the boss,
 * the throwable object is marked as already hit, the boss's damage from collision is calculated,
 * collision-related properties are updated, sounds are played, and the throwable object is removed.
 * 
 * @param {object} world - The game world object containing throwable objects and end boss information.
 */
function checkThrowableObjectEndbossCollisions(world) {
    world.throwableObjects.forEach((throwableObject, i) => {
        world.lvl.endboss.forEach((endboss, j) => {
            if (throwableObject.isColliding(endboss) && !throwableObject.alreadyHit) {
                throwableObject.alreadyHit = true;
                world.lvl.endboss[j].dmgCollisionCalc();
                world.throwableObjects[i].collisionBottle = true;
                soundPlay(configAUDIO.broken_bottle_audio, 0.5, 0.5)
                soundPlay(configAUDIO.chicken_audio, 0.4, 1);
                world.spliceThrowableObject(i)
            }
        })
    });
}


/**
 * Checks for collisions between throwable objects and enemies in the game world.
 * If a collision is detected and the throwable object has not already hit the enemy,
 * the throwable object is marked as already hit, collision-related properties are updated,
 * sound effects are played, and the throwable object is removed.
 * 
 * @param {object} world - The game world object containing throwable objects and enemy information.
 */
function checkThrowableObjectEnemyCollisions(world) {
    world.throwableObjects.forEach((throwableObject, i) => {
        world.lvl.enemies.forEach((enemy) => {
            if (throwableObject.isColliding(enemy) && !throwableObject.alreadyHit) {
                throwableObject.alreadyHit = true;
                soundPlay(configAUDIO.broken_bottle_audio, 0.4, 0.5)
                world.throwableObjects[i].collisionBottle = true;
                soundPlay(configAUDIO.chicken_audio, 0.4, 1);
                world.spliceThrowableObject()
            }
        })
    });
}


/**
 * Checks for collisions between throwable objects and the ground in the game world.
 * If a throwable object's y-coordinate is greater than or equal to 360 (indicating it's on or below the ground)
 * and the object has not already hit, the object is marked as already hit,
 * collision-related properties are updated, sound effects are played, and the object is removed.
 * 
 * @param {object} world - The game world object containing throwable objects information.
 */
function checkThrowableObjecGround(world) {
    world.throwableObjects.forEach((throwableObject, i) => {
        if (throwableObject.y >= 360 && !throwableObject.alreadyHit) {
            throwableObject.alreadyHit = true;
            throwableObject.collisionBottle = true;
            soundPlay(configAUDIO.broken_bottle_audio, 0.4, 0.5);
            world.spliceThrowableObject(i)
        }
    });
}