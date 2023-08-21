class Character extends MovableObjekt {

    y = 80;
    last_y;
    width = 100;
    height = 200;
    world;
    speed = 3;

    hitpoints = 100;
    bottleEnergy = 0;
    lastHit = 0;
    coins = 0;
    otherDiscption = false;
    inactivityTimer = 0;

    IMG_WALKIN = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ]

    IMG_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ]

    IMG_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    IMG_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMG_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',

    ]

    IMG_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',

    ]

    /**
     * Initializes the character class.
     *
     * @param {string} imgPath - The path to the character's image.
     * @param {string} this.IMG_WALKIN - The path to the character's walking animation.
     * @param {string} this.IMG_JUMPING - The path to the character's jumping animation.
     * @param {string} this.IMG_DEAD - The path to the character's death animation.
     * @param {string} this.IMG_HURT - The path to the character's hurt animation.
     * @param {string} this.IMG_IDLE - The path to the character's idle animation.
     * @param {string} this.IMG_IDLE_LONG - The path to the character's long idle animation.
     */
    constructor(imgPath) {
        super().loadImg(imgPath);
        this.loadImgS(this.IMG_WALKIN);
        this.loadImgS(this.IMG_JUMPING);
        this.loadImgS(this.IMG_DEAD);
        this.loadImgS(this.IMG_HURT);
        this.loadImgS(this.IMG_IDLE);
        this.loadImgS(this.IMG_IDLE_LONG);
        this.moving();
        this.applyGravity();
        this.animation();
    }


    /**
     * This function defines the control of the character.
     * 
     * @param {string} this.hitpoints - Defines the character's hitpoints.
     * @param {string} this.world.camera_x - Defines the world view.
     */
    moving() {
        setStoppebleInterval(() => {
            this.movementSoundStopped();

            if (this.hitpoints > 0) {
                this.moveRight();
                this.moveLeft();
                this.jump();
            } else {
                this.isDead();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)
    }


    /**
     * This function ensures that the sound is paused.
     * 
     * 
     */
    movementSoundStopped() {
        soundStop(configAUDIO.walking_audio);
        soundStop(configAUDIO.jump_audio);
    }


    /**
     * This function makes the character jump.
     * 
     * 
     */
    jump() {
        if (this.world.keyboard.SPACE) {
            this.soundPlayCharacter(configAUDIO.jump_audio, 0.4, 0)
            super.jump();
        }
    }


    /**
     * This function defines how the character moves to the left.
     */
    moveLeft() {
        this.moveLeftPressKey();
    }


    /**
     * This function defines how the character moves to the right.
     */
    moveRight() {
        this.moveRightPressKey();

    }


    /**
     * Defines a function that makes the character move left upon key press.
     */
    moveLeftPressKey() {
        if (this.world.keyboard.LEFT && this.x > -719) {
            this.otherDiscption = true;
            this.soundPlayCharacter(configAUDIO.walking_audio, 0.2)
            this.x -= this.speed;
        }
    }


    /**
     * Defines a function that makes the character move right upon key press.
     */
    moveRightPressKey() {
        if (this.world.keyboard.RIGHT && this.x < this.world.lvl.lvl_end_x) {
            this.otherDiscption = false;
            this.soundPlayCharacter(configAUDIO.walking_audio, 0.2)
            this.x += this.speed;
        }
    }


    /**
     * Initiates the animation of the character.
     */
    animation() {
        setStoppebleInterval(() => {
            if (!this.isPlayerInactive()) {
                this.inactivityTimer += 50;
                this.idleAnimation();
            } else {
                this.inactivityTimer = 0
                this.moveAnimation()
            }
        }, 50);
    }



    /**
     * Executes the movement animation of the character based on its state and key inputs.
     * If the character is dead, the corresponding death animation will be played.
     * If the character is injured, the injury animation will be played.
     * If the character is in the air, the jump animation will be played.
     * If the character is moving left or right, the running animation will be played.
     */
    moveAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMG_DEAD);
            isLose(this);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMG_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMG_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMG_WALKIN);
        }
    }


    /**
     * Executes the animation logic for the character in idle state.
     * If the character is asleep for a short duration, the corresponding short sleep animation sequence will be played.
     * If the character is asleep for a long duration, the corresponding long sleep animation sequence will be played.
     */
    idleAnimation() {
        if (this.isCharacterSleepShort()) {
            this.playAnimation(this.IMG_IDLE);

        } else if (this.isCharacterSleepLong()) {
            this.playAnimation(this.IMG_IDLE_LONG);
        }
    }


    /**
     * 
     * @returns Returns the timer time indicating when the character is in deep sleep.
     */
    isCharacterSleepLong() {
        return this.inactivityTimer >= 8000
    }


    /**
     * 
     * @returns Returns the timer time indicating when the character starts sleeping.
     */
    isCharacterSleepShort() {
        return this.inactivityTimer >= 3000 && this.inactivityTimer < 8000
    }


    /**
     * 
     * @returns Returns the conditions to determine if the character is sleeping.
     */
    isPlayerInactive() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE || this.world.keyboard.TOP || this.world.keyboard.SHIFT || this.world.keyboard.DOWN || this.world.keyboard.UP
    }


    /**
     * This function plays the sound at a specific volume.
     * 
     * @param {number} sound - The sound data.
     * @param {number} volume - The variable determining the volume level.
     */
    soundPlayCharacter(sound, volume) {
        sound.play();
        sound.volume = volume;
    }
}