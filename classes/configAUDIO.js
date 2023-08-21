class ConfigAUDIO {
    music = false;
    sound = false;
    isGameStart = false;
    playMusic = false

    // backgroundgame sounds

    BACKGROUND_AUDIO_GAME = new Audio('audio/background_musik/emotive-film-music-28052.mp3');
    BACKGROUND_AUDIO_FIGHT = new Audio('audio/fight_musik/cinematic-music-sketches-11-cinematic-percussion-sketch-116186.mp3');

    //background Startscreen

    start_backgroundSound = new Audio('audio/background_musik/beautiful-memories-123086.mp3');

    //character sounds

    walking_audio = new Audio('./audio/running.mp3');
    jump_audio = new Audio('audio/jumping_1-6452.mp3');


    //lose Win sounds
    losing_audio = new Audio('audio/losing-sound.mp3')
    win_audio = new Audio('audio/win_sound.mp3')

    //chicken sounds
    chicken_audio = new Audio('audio/chicken.mp3')

    //bottle sound
    broken_bottle_audio = new Audio('audio/broken_bottle.mp3')


    //eating health item
    eating_health_item_audio = new Audio('audio/eating.mp3')

    //drinking Bottle
    drink_bottle_audio = new Audio('audio/drink_sound.mp3')

    //pic up item
    pic_up_item_audio = new Audio('audio/pick_up_item.mp3')

    constructor() {}
}


/**
 * Pauses the soundtrack.
 * 
 * @param {string} sound - This is the soundtrack to be stopped.
 */
function soundStop(sound) {
    sound.pause();
}


/**
 * Resumes the sound.
 * 
 * @param {string} sound - This is the soundtrack to be resumed.
 */
function restartSound(sound) {
    sound.currentTime = 0;
    sound.play();
}


/**
 * Starts the sound using the provided variables for time, sound, and volume.
 * 
 * @param {string} sound - This is the sound file.
 * @param {number} volume - This is the volume level.
 * @param {number} time - This is the time at which the track should start playing.
 */
function soundPlay(sound, volume, time) {
    if (time > 0) {
        sound.currentTime = time;
    }
    sound.play();
    sound.volume = volume;
}


/**
 * Toggles music on and off.
 */
function musicOnOff() {
    if (configAUDIO.music) {
        configAUDIO.music = false;
    } else {
        configAUDIO.music = true;
        configAUDIO.playMusic = true;
        startMusic();
    }
}


/**
 * Starts playing background music based on configuration settings.
 */
function startMusic() {
    setInterval(() => {
        if (configAUDIO.music && !configAUDIO.isGameStart && configAUDIO.playMusic) {
            soundPlay(configAUDIO.start_backgroundSound, 0.4);
        } else if (!configAUDIO.music) {
            configAUDIO.start_backgroundSound.pause();
            configAUDIO.playMusic = false;
        }
    }, 500);
}