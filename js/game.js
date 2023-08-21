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
    world = new World(canvas, keyboard);
    configAUDIO.isGameStart = true;
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
        clearAllIntervals();
        loadEndScreen('<img src="img/9_intro_outro_screens/game_over/you lost.png" alt="End Screen">');
        world.character.soundPlayCharacter(world.configAUDIO.win_audio, 0.4, 0);
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
    if (world.character.hitpoints == 0) {
        clearAllIntervals();
        loadEndScreen('<img src="img/9_intro_outro_screens/game_over/you lost.png" alt="End Screen">');
        world.character.soundPlayCharacter(world.configAUDIO.losing_audio, 0.4, 0);
    }
}


/**
 * Loads and displays an end screen on the web page.
 * 
 * @param {string} img - The image HTML content to be displayed as the end screen.
 */
function loadEndScreen(img) {
    const endScreen = document.getElementById('end-screen');
    endScreen.classList.remove('d-none');
    body.classList.remove('column');
    h1.classList.add('d-none');
    endScreen.innerHTML = img;
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
        exitFullscreen();
        fullScreen = false;
    } else {
        enterFullscreen();
        fullScreen = true;
    }
}


/**
 * Attempts to enter fullscreen mode for the web page using browser-specific methods.
 */
function enterFullscreen() {
    var element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
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
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
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