function loadControlTamplate() {
    return /*html*/ `
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


function loadMenuTamplate() {
    return /*html*/ `
    <div class="justify-center dirction-column" onclick="event.stopPropagation()">
    <button id="menu-musik" onclick="musicOnOff()" class="buttons-menu justify-center ">
       <div class="sound-icon" id="sound-icon"></div> 
      <div>music on/off</div></button>
     <button id="menu-musik" onclick="switchSoundIcon()" class="buttons-menu justify-center ">
       <div class="sound-icon" id="sound-music-icon"></div> <div>sound on/off</div>
    </button> 
      <button id="menu-fullscreen" onclick="isFullscreen()" class="buttons-menu justify-center ">Vollbild on/off</button>
      <button id="menu-Controls" onclick="loadControls()" class="buttons-menu justify-center ">Steuerung</button>
      </div>
    `;
}