let canvas;
let world;
let keyboard = new Keyboard();
let endboss = new Endboss();
let configAUDIO = new ConfigAUDIO();
let isMenuOpen = false;
let isGameOpen = false;
let intervalIds = [];
let intervalTime = [];
let i = 1
let fullScreen = false;
let soundOnOffIcon = false;


/**
 * Initializes the application or game by adding event listeners and bindings.
 */
function init() {
    document.addEventListener("keyup", openeMenuWithESC);
    bindBtnsPressEventsTouch();
}


/**
 * Loads controls information into a menu screen element on the web page.
 * This function sets the inner HTML of the specified element to the content returned by the loadControlTemplate() function.
 */
function loadControls() {
    let element = document.getElementById('menu-screen');
    isMenuOpen = true;
    element.innerHTML = loadControlTamplate();
}


/**
 * Starts the game by hiding the start screen element, initializing the game world, and updating audio configuration.
 */
function startGame() {
    let element = document.getElementById('start-screen');
    element.classList.add('d-none');
    canvas = document.getElementById('canvas')
    startLevel();
    world = new World(canvas, keyboard);
    configAUDIO.isGameStart = true;
}


/**
 * hard reset from the page
 */
function restartGame() {
    let element = document.getElementById('end-screen');
    element.classList.add('d-none');
    startGame();
}


/**
 * Closes the menu screen by adding and removing CSS classes.
 */
function closeMenu() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('menu-text').classList.remove('d-none');
    isMenuOpen = false;
}


/**
 * Opens the menu by adding and removing CSS classes and loading menu content.
 */
function openMenu() {
    document.getElementById('menu-text').classList.add('d-none');
    document.getElementById('menu-screen').classList.remove('d-none');
    isMenuOpen = true;
    let element = document.getElementById('menu-screen');
    element.innerHTML = loadMenuTamplate();
    loadMusicIcon();
    loadSoundIcon();
}


/**
 * Opens or closes the menu based on the state of the ESC key.
 */
function openeMenuWithESC() {
    if (keyboard.ESC == true) {
        if (!isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
}


function loadMusicIcon() {
    let soundIcon = document.getElementById('sound-icon');
    if (!soundOnOffIcon) {
        soundIcon.innerHTML = `<img src="img/icons/stop.png" alt="">`;
    } else {
        soundIcon.innerHTML = `<img src="img/icons/play.png" alt="">`;
    }
}


function switchMusicIcon() {
    if (!soundOnOffIcon) {
        soundOnOffIcon = true;
    } else {
        soundOnOffIcon = false;
    }
    loadMusicIcon();
}


function loadSoundIcon() {
    let soundIcon = document.getElementById('sound-music-icon');
    if (!configAUDIO.soundOnOff) {
        soundIcon.innerHTML = `<img src="img/icons/stop.png" alt="">`;
    } else {
        soundIcon.innerHTML = `<img src="img/icons/play.png" alt="">`;
    }
}


function switchSoundIcon() {
    if (!configAUDIO.soundOnOff) {
        configAUDIO.soundOnOff = true;
    } else {
        configAUDIO.soundOnOff = false;
    }
    loadSoundIcon();
}


/**
 * Creates a custom interval using setInterval and stores interval IDs and times.
 * 
 * @param {function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval in milliseconds.
 */
function setStoppebleInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    intervalTime.push(time);
}


/**
 * Resumes previously paused intervals using stored interval IDs and times.
 */
function resumeGame() {
    for (let i = 0; i < intervalIds.length; i++) {
        intervalIds[i] = setInterval(() => {}, intervalTime[i]);
    }
}


/**
 * Checks if the player has won the game by defeating the end boss.
 * If the boss's hitpoints reach zero, the function clears all intervals, loads the end screen,
 * and plays a sound indicating a victory.
 * 
 * @param {object} world - The game world object containing information about the game state.
 */
function isWin(world) {
    if (world.lvl.endboss[0].hitpoints == 0) {
        setTimeout(() => {
            const endScreen = document.getElementById('end-screen');
            endScreen.classList.remove('you-lose');
            configAUDIO.music = false;
            configAUDIO.playMusic = false;
            world.playBackgroundMusic();
            clearAllIntervals();
            loadEndScreen('you-win');
            world.character.soundPlayCharacter(world.configAUDIO.win_audio, 0.4, 0);
        }, 500);
    }
}


/**
 * Checks if the player has lost the game due to running out of hitpoints.
 * If the character's hitpoints reach zero, the function clears all intervals,
 * loads the end screen, and plays a sound indicating a loss.
 * 
 * @param {object} world - The game world object containing information about the game state.
 */
function isLose(world) {
    if (world.hitpoints == 0) {
        setTimeout(() => {
            const endScreen = document.getElementById('end-screen');
            endScreen.classList.remove('you-lose');
            configAUDIO.music = false;
            configAUDIO.playMusic = false;
            world.world.playBackgroundMusic();
            clearAllIntervals();
            loadEndScreen('you-lose');
            world.soundPlayCharacter(world.world.configAUDIO.losing_audio, 0.4, 0);
        }, 500);

    }
}


/**
 * Loads and displays an end screen on the web page.
 * 
 * @param {string} img - The image HTML content to be displayed as the end screen.
 */
function loadEndScreen(isWin) {
    const endScreen = document.getElementById('end-screen');
    configAUDIO.music = false;
    configAUDIO.playMusic = false;
    clearAllIntervals();
    endScreen.classList.add(isWin);
    endScreen.classList.remove('d-none');
    body.classList.remove('column');
    h1.classList.add('d-none');
}


/**
 * Binds touch events to specific buttons to simulate keyboard input for game controls.
 */
function bindBtnsPressEventsTouch() {
    document.getElementById('btnLeft').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById('btnLeft').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    });

    //--------------------

    document.getElementById('btnRight').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById('btnRight').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });

    //---------------------

    document.getElementById('btnJump').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SPACE = true;
    });

    document.getElementById('btnJump').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SPACE = false;
    });

    //---------------------

    document.getElementById('btnThrow').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.SHIFT = true;
    });

    document.getElementById('btnThrow').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.SHIFT = false;
    });

    // ---------------------

    document.getElementById('menu-btn').addEventListener('touchstart', (event) => {
        event.preventDefault();
        keyboard.ESC = true;
        openeMenuWithESC();
    });

    document.getElementById('menu-btn').addEventListener('touchend', (event) => {
        event.preventDefault();
        keyboard.ESC = false;
    });
}

//---------Fullscreen------------

/**
 * Toggles between entering and exiting fullscreen mode for the web page.
 */
function isFullscreen() {
    if (fullScreen) {
        setFixedDimensions();
        exitFullscreen();
    } else {
        setFullscreenDimensions();
        enterFullscreen();
    }
}


function setFixedDimensions() {
    h1Dnone();
    let canvas = document.getElementById('canvas');
    canvas.style.width = '720px';
    canvas.style.height = '480px';
    let startScreen = document.getElementById('start-screen');
    startScreen.style.width = '720px';
    startScreen.style.height = '480px';
    let menuScreen = document.getElementById('menu-screen');
    menuScreen.style.width = '720px';
    menuScreen.style.height = '480px';
    let canvasContain = document.getElementById('canvas-container')
    canvasContain.style.width = '720px';
    canvasContain.style.height = '480px';
}


function h1Dnone() {
    if (!configAUDIO.isGameStart) {
        let h1Element = document.querySelector('h1');
        h1Element.style.display = 'none';
    }
}

function setFullscreenDimensions() {
    let h1Element = document.querySelector('h1');
    h1Element.style.display = 'none';
    let canvas = document.getElementById('canvas');
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    let startScreen = document.getElementById('start-screen');
    startScreen.style.width = '100vw';
    startScreen.style.height = '100vh';
    let menuScreen = document.getElementById('menu-screen');
    menuScreen.style.width = '100vw';
    menuScreen.style.height = '100vh';
}
/**
 * Attempts to enter fullscreen mode for the web page using browser-specific methods.
 */
function enterFullscreen() {
    fullScreen = true;
    let element = document.getElementById('canvas-container');
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}


/**
 * Attempts to exit fullscreen mode for the web page using browser-specific methods.
 */
function exitFullscreen() {
    fullScreen = false;
    if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {

        if (document.exitFullscreen) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        } else if (document.mozCancelFullScreen) {
            if (!document.fullscreenElement) {
                document.mozCancelFullScreen();
            }
        } else if (document.webkitExitFullscreen) {
            if (!document.fullscreenElement) {
                document.webkitExitFullscreen();
            }
        } else if (document.msExitFullscreen) {
            if (!document.fullscreenElement) {
                document.msExitFullscreen();
            }
        }
    }
}


/**
 * Attempts to clear all intervals that have been set using the setInterval() function.
 * Note: This approach is not reliable and may not work as intended.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
//==============Fullscreen END===========


//ARROW and WASD steering
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 39 || e.keyCode == 68) {
        keyboard.RIGHT = true;
    } else if (e.keyCode == 37 || e.keyCode === 65) {
        keyboard.LEFT = true;
    } else if (e.keyCode == 38 || e.keyCode === 87) {
        keyboard.TOP = true;
    } else if (e.keyCode == 40 || e.keyCode === 83) {
        keyboard.DOWN = true;
    } else if (e.keyCode == 32) {
        keyboard.SPACE = true;
    } else if (e.keyCode == 16) {
        keyboard.SHIFT = true;
    } else if (e.keyCode == 27) {
        keyboard.ESC = true;
    }
    console.log()
});


window.addEventListener("keyup", (e) => {
    if (e.keyCode === 39 || e.keyCode === 68) {
        keyboard.RIGHT = false;
    } else if (e.keyCode == 37 || e.keyCode === 65) {
        keyboard.LEFT = false;
    } else if (e.keyCode == 38 || e.keyCode === 87) {
        keyboard.TOP = false;
    } else if (e.keyCode == 40 || e.keyCode === 83) {
        keyboard.DOWN = false;
    } else if (e.keyCode == 32) {
        keyboard.SPACE = false;
    } else if (e.keyCode == 16) {
        keyboard.SHIFT = false;
    } else if (e.keyCode == 27) {
        keyboard.ESC = false;
    }
});



document.addEventListener('keydown', function(event) {
    if (fullScreen) {
        event.key === 'Escape' && window.innerWidth > 420 && isFullscreen();
    }
});