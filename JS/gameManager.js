const getContainer = document.querySelector('#container');
const getCharacterSelect = document.querySelector('#character-select');
const getWarrior = document.querySelector('#warrior-section');
const getActions = document.querySelector("#actions");
const getBattleActions = document.querySelector("#battle-actions");
const getEnemy = document.querySelector("#enemy-section");
const getMap = document.querySelector("#map-section");
const getAboveMap = document.querySelector("#above-map");
const getBody= document.querySelector('body');

//REUSABLE FUNCTIONS--------------------------------------
function randomNum(num) {
    let random = Math.ceil(Math.random() * num);
    return random;
}
let clearField = {
    clearWholeField: function () { //isskyrus MAP
        this.clearCharSelect();
        this.clearWarrior();
        this.clearActions();
        this.clearBattleActions();
        this.clearEnemy();
        this.clearAboveMap();

    },clearCharSelect: function() {
        getCharacterSelect.innerHTML = '';
    },
    clearWarrior: function() {
        getWarrior.innerHTML = '';
    },
    clearActions: function() {
        getActions.innerHTML = '';
    },
    clearBattleActions: function() {
        getBattleActions.innerHTML = '';
    },
    clearEnemy: function() {
        getEnemy.innerHTML = '';
    },
    clearAboveMap: function() {
        getAboveMap.innerHTML = '';
    },
    clearMap: function() {
        getMap.innerHTML = '';
    }
}
//--------------------------------------------------------
//RENDER NEW GAME OR LOAD GAME
let startingScreen = ()=>{
    getActions.innerHTML= '<div class="starting-screen-container"><div class="starting-screen-box">'+
    '<button class="btn btn-new-game" onclick="charSelect()">New game</button><button class="btn btn-load-game" onclick="load()">Load saved game</button>'+
    '</div></div>'
}
// RENDER CHARACTER SELECTION----------------------------
let charSelect = ()=>{
    getContainer.classList.toggle("d-none");
    clearField.clearWholeField();
getCharacterSelect.innerHTML= '<div class="char-select"><div class="char-list">' +
'<a href="#" onclick="afterCharSelect(\'Barbarian\')">'+
    '<img src="img/Characters/Barbarian.png" alt="Barbarian"><div><h3>Barbarian</h3>'+
        '<p>Barbarian SMASH! High strenghth medium defence but due to his huge mass and heavy weapon hisagility is low.</p></div></a>' +

'<a href="#" onclick="afterCharSelect(\'Knight\')">'+
    '<img src="img/Characters/Knight.png" alt="Knight"><div><h3>Knight</h3>' +
        '<p>Equipt in full plate armour, one-handed sword and shield in hand. Medium strenght with high defence but due to heavy armour agility is low.</p></div></a>' +

'<a href="#" onclick="afterCharSelect(\'Mercenary\')">' +
    '<img src="img/Characters/Mercenary.png" alt="Mercenary"><div><h3>Mercenary</h3>' +
        '<p>Averagedly armored carrying one-handed sword. Strenght, defence and agility are medium.</p></div></a>' +

'<a href="#" onclick="afterCharSelect(\'Ranger\')">'+
   ' <img src="img/Characters/Ranger.png" alt="Ranger"><div><h3>Ranger</h3>'+
       ' <p>Lightly armored and quick on his feet, equipt with bow and short sword. Atack and defence are lowbut agility is high.</p></div></a></div></div>';
}
let afterCharSelect =(classType)=>{
    getContainer.classList.toggle("d-none");
    gameManager.startGame(classType);
}
//LANGO UZKROVIMO METU PALEDZIAMA CHAR SELECT FUNCTION---
window.onload = function() {
    startingScreen();
  };
//AFTER CHARACTER SELECTION RENDER GAME-----------------
let gameManager = {
    startGame: function (classType) {
        this.createPlayer(classType);
        afterBattleContinue();
        playerInventory = new Inventory;
        addCanvas();
    },
    setBattlefield: function(lvl){
        hideMap();
        clearField.clearWholeField();
        battlefieldContainer();
        generateEnemy(lvl);
        setWarrior();
        setActions();
        setEnemy();
    },
    createPlayer: function (classType) {
        switch (classType) {
            case "Barbarian":
                player = new Player(classType, 100, 100, 60, 40)
                break;
            case "Knight":
                player = new Player(classType, 100, 70, 100, 30)
                break;
            case "Mercenary":
                player = new Player(classType, 100, 70, 70, 60)
                break;
            case "Ranger":
                player = new Player(classType, 100, 50, 50, 100)
                break;
        }   
    }
    

}

let afterBattleContinue = ()=>{
    clearField.clearWholeField(); //lyg mapui nieko ji isvalius
    gameShouldPause=false;
    renderCharInfoBtn();
    getActions.innerHTML = '<div class="zoom-box"><div><button class="btn" onclick="screenSize(1)">zoom1</button><button class="btn" onclick="screenSize(2)">zoom2</button>'+
    '<button class="btn" onclick="screenSize(3)">zoom3</button></div>';
    // <a href="#" onclick="gameManager.setBattlefield()">Look for enemy!</a></div><br>'
    //  + 
    // '<div><a href="#" onclick="hideMap()">hide map</a></div><br>';
}
let screenSize = (num)=>{
getBody.className="";
if(num==1){
    getBody.className="zoom1";
}else if(num==2){
    getBody.className="zoom2";
}else if(num==3){
    getBody.className="zoom3";
}
}
let afterBattleMaptoggle =()=>{
hideMap();
battlefieldContainerRemove();
afterBattleContinue();
}
let restOrSave = ()=>{
    clearField.clearAboveMap();
    let container = document.createElement('div');
    container.className = 'rest-or-save-container';
    let box = document.createElement('div');
    box.className = 'rest-or-save-box';
    let restBtn = document.createElement('button');   //Box yra matomas backgroundas uz mygtuku o container nematomas mapo dydzio containeris boxo centravimui
    restBtn.className = 'btn btn-rest';
    restBtn.innerHTML='Rest';
    restBtn.setAttribute("onclick","playerFullRest();");
    let saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-rest';
    saveBtn.innerHTML='Save#';
    saveBtn.setAttribute("onclick","save();");
    let cancelBtn = document.createElement('button');      
    cancelBtn.className = 'btn btn-rest';
    cancelBtn.innerHTML='Cancel';
    cancelBtn.setAttribute("onclick","quitInvBtn();");

    box.appendChild(restBtn);
    box.appendChild(saveBtn);
    box.appendChild(cancelBtn);
    container.appendChild(box);
    getAboveMap.appendChild(container);
}