let canvas;
let world;
let keyboard = new Keyboard();
let endboss = new Endboss();
let isMenuOpen = false;
let isGameOpen = false;
let intervalIds = [];
let intervalTime = [];
let i = 1
let start_backgroundSound = new Audio('audio/background_musik/beautiful-memories-123086.mp3');
let sound = false;


function init() {
    document.addEventListener("keyup", openeMenuWithESC);
    bindBtnsPressEventsTouch();

}


function loadControls() {
    let element = document.getElementById('menu-screen');
    isMenuOpen = true;
    element.innerHTML = /*html*/ `
 <div>
    <div class="justify-center">
        <h2 >Steuerung</h2>
        </div>
        <div style="display: flex;    width: 720px;
        justify-content: center;">
            <div >
                <div class="buttons-Controls">
                <div> "W" / Pfeiltaste Rechts</div> <div class="padding5">|</div><div>Nach vorne Laufen</div>
                </div>
                <div class="buttons-Controls">
                <div>"A" / Pfeiltaste Links</div><div class="padding5">|</div><div>Zurück laufen</div>
                </div>
                <div class="buttons-Controls">
                <div>Space</div><div class="padding5">|</div><div>Springen</div>
                </div>
                <div class="buttons-Controls">
                <div>SHIFT</div><div class="padding5">|</div><div>Flasche werfen</div>
                </div>
            </div>
        </div>
    </div>
`;
}


function startGame() {
    let element = document.getElementById('start-screen');
    element.classList.add('d-none');

    canvas = document.getElementById('canvas')
    world = new World(canvas, keyboard);

}


function closeMenu() {
    document.getElementById('menu-screen').classList.add('d-none');
    document.getElementById('menu-text').classList.remove('d-none');
    isMenuOpen = false;
}


function openMenu() {
    document.getElementById('menu-text').classList.add('d-none');
    document.getElementById('menu-screen').classList.remove('d-none');
    isMenuOpen = true;
    let element = document.getElementById('menu-screen');
    element.innerHTML = /*html*/ `
    <div class="justify-center dirction-column" onclick="event.stopPropagation()">
      <button id="menu-musik" onclick="musicOnOff()" class="buttons-menu justify-center ">music on/off</button>
      <button id="menu-sound" class="buttons-menu justify-center ">Sounds on/off</button>
      <button id="menu-fullscreen" class="buttons-menu justify-center ">Vollbild on/off</button>
      <button id="menu-Controls" onclick="loadControls()" class="buttons-menu justify-center ">Steuerung</button>
      </div>
    `;
}


function musicOnOff() {
    if (!sound) {
        soundPlay(start_backgroundSound, 0.4)
        sound = true;
    } else if (sound) {
        start_backgroundSound.pause();
        sound = false;
    }
}


function soundPlay(sound, volume) {
    sound.play(start_backgroundSound);
    sound.volume = volume;
}


function openeMenuWithESC() {

    if (keyboard.ESC == true) {
        if (!isMenuOpen) {
            openMenu();
        } else {
            closeMenu();
        }
    }
}


function setStoppebleInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    intervalTime.push(time);
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


function resumeGame() {
    for (let i = 0; i < intervalIds.length; i++) {
        intervalIds[i] = setInterval(() => {}, intervalTime[i]);
    }
}


function stopGame() {
    intervalIds.forEach(clearInterval);
}


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


//ARROW and WASD steering
window.addEventListener("keydown", (e) => {
    if (e.keyCode === 39 || e.keyCode === 68) {
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