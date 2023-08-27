/**
 * Checks collisions between the character and collectible objects in the array and performs actions.
 *
 * @param {object} world - The game world object.
 * @param {array} arry - An array of collectible objects to check for collision.
 * @param {boolean|null} energyfull - A value indicating whether energy is present.
 * @param {function} calculator - A function to be called when the collision occurs.
 * @param {string} audio - The audio path for sound playback.
 * @param {number} sound - The volume for sound playback.
 * @param {number} volume - The volume for sound playback.
 * @param {boolean|null} energybar - A value indicating whether the energy bar should be used.
 */
function checkCharacterItemCollisions(world, arry, energyfull, calculator, audio, sound, volume, energybar) {
    arry.forEach((item, i) => {
        if (world.character.isColliding(item) && (energyfull || energyfull == null)) {
            arry.splice(i, 1);
            calculator();
            soundPlay(audio, sound, volume);
            energybar;
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
                world.lvl.endboss[j].dmgCollisionCalc(20);
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