
let ctx;

class MapPlayer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class ViewPort {
    constructor(x, y, w, h) {
        this.x = x; this.y = y; this.w = w; this.h = h;
        this.scrollTo = function (x, y) {
            this.x = x;
            this.y = y;
            if (this.x < 0) this.x = 0;
            if (this.y < 0) this.y = 0;
            if (this.x > columns * scaledSize - w) this.x = columns * scaledSize - w;
            if (this.y > rows * scaledSize - h) this.y = rows * scaledSize - h;

        }
    }
}


const scaledSize = 50;// The size I want my sprites to be if decided to increase overall tile size px;
const spriteSize = 50;// The actual size of sprites / tiles in the tile_sheet image
const columns = 24;// columns and rows in map below
const rows = 24;

let gameMap = [
    59,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,37,
    34,40,40,40,40,40,31,32,50,33,31,30,32,33,31,33,30,31,33,30,31,33,58,37,
    34,40,43,43,42,40,33,30,33,31,33,31, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2,33,37,
    34,40,43,43,43,40,33,33,31,33,33,33,10,23,53, 3,21,21, 4,11,54,12,51,37,
    34,40,43,43,41,40,30,58,33,32,30,32,10, 3,21,22,32,33,20,21, 4,13, 2,37,
    34,40,43,43,40,40,33,33,32,33,33,50,10,12,33,33,33,30,33,51,20, 4,12,37,
    34,33, 0, 1, 1, 1, 1, 1, 1, 2,33,58,10,12,33,30, 5, 6, 6, 7,51,10,12,37,
    34,33,20,21,21,21,21,21, 4,13, 1,1 ,14,12, 5, 6,19,16,16,18, 7,10,12,37,
    34,30,30,32,30,33,33,33,20,21,21,21,21,22,15,16,16,16,16,16,17,10,12,37,
    34,32,50,33,33,31,30,30,33,30,33,32,33,33,15,16,16, 8,26,26,27,20,22,37,
    34,31,32,32,31,33,33,33,32,30,31,33,32,33,15,16,16,17,31,33,33, 0, 2,37,
    34,33,30,31,33,30,58,33,33,33,32,31,33,50,15,16,16,17,31,33,30,20,22,37,
    34,30,32,58,30,32,30,33,31,33, 5, 6, 6, 6,19,16,16,17,51,31,32,30,33,37,
    34,33,31,33,50, 5, 6, 6, 6, 6,19,16,16,16,16,16,16,17,33,51,31,33,33,37,
    34, 5, 6, 6, 6,19,16,16,16,16,16,16,16,16,16, 8,26,27,32,30,33,33,31,37,
    16,16,16,16,16,16,16,16,16,16,16, 8,26,26,26,27, 0, 1, 1, 2,30,33,33,37,
    16,16,16,16,16,16,16, 8,26,26,26,27, 0, 1, 1, 1,14,24,24,12,31,30,33,37,
    36,25,26,26,26,26,26,27, 0, 1, 1, 1,14,23,24,11,24,23,23,12,32,33,51,37,
    36, 0, 1, 1, 1, 1, 2,33,10,24,23,24,23,24,23,23,23,11,11,13, 1, 2,33,37,
    36,20,21,21, 4,11,13, 1,14,23,24,23,24,23,11,24,11,23,23,11,23,12,33,37,
    36,33,32,33,10,11,24,11,23,55,23,11,23,11,23,23,23, 3,21,21,21,22,33,37,
    36,52, 0, 1,14, 3,21, 4,11,11, 3, 4,55,24,11,11,11,12,33,32,30,33,51,37,
    36,30,20,21,21,22,52,20,21,21,22,20,21,21,21,21,21,22,33,33,31,33,31,37,
    38,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,39
];
//COLLISION TILES// EVENT TILES LIST
let collisionTiles = [49,48,40,39,38,37,36,35,34,16,58];
let collisionTilesForCenter =[15,5,6,7,17,8,9,19,18];
let enemyTiles = [50,51,52,53,54,55];

//KINTAMIEJI
let gameShouldPause = false; //pauze game rendering if true in pauze function
let enemySriteType; //to save sprite type before combat to know to what type replace it with
let combatWon = false; //if true replace  enemy sprite
let oldPlayerX;
let oldPlayerY;
let oldMapPlayerIndex;
let playerImgIndex = 47;
//mygtuku names
let keysDown = {
    65: false,//-----A
    87: false,//-----W
    68: false,//-----D
    83: false,//-----S
    80: false//------P (PAUSE for later implementation)
};
//TOGGLE MAP VISIBILITY
let hideMap =()=>{
    getMap.classList.toggle("d-none");
    getAboveMap.classList.toggle("d-none");
}
let addCanvas = () => {
    getMap.innerHTML = '<canvas id="map" width="800" height="500"></canvas>';
    let canvas = document.querySelector('#map');
    ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    //MAPO OBJECTAI
    let mapPlayer = new MapPlayer(-300, -100);
    let viewPort = new ViewPort(0, 0, canvas.width, canvas.height);
    //CONTROLS LISTENER
    window.addEventListener("keydown", function (event) { //WINDOW prilipina event listeneri ant puslapio ir visalaika klauso / laukia evento
        if (event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 68 || event.keyCode == 83) { keysDown[event.keyCode] = true; } //KEY PASPAUSTAS TRUE
        if (event.keyCode == 80) {
            keysDown[event.keyCode] = !keysDown[event.keyCode];
        };
    });
    window.addEventListener("keyup", function (event) {
        if (event.keyCode == 65 || event.keyCode == 87 || event.keyCode == 68 || event.keyCode == 83) { keysDown[event.keyCode] = false; } //KEY PASPAUSTAS FALSE
    });
    let trueMapPlayerX = () => { return mapPlayer.x + (viewPort.w / 2) };//kadangi player sucentruotas viewPort centre.Player x0 y0 cordinates taipogi viewport centre eidamas kairen/i virsu cordinates eina minusan
    let trueMapPlayerY = () => { return mapPlayer.y + (viewPort.h / 2) };// tai kad kairaime sone ir virsuj butu 0 reik prie player x pridet puse wiewporto plocio
    //MOVEMENT /ZEMELAPIO KRASTU COLISION
    let updatePlayerPosition = () => {
        oldPlayerX = mapPlayer.x; oldPlayerY = mapPlayer.y;
        if (keysDown[65] && trueMapPlayerX() >= 0) {
            mapPlayer.x -= 3;//KAIRE
            playerImgIndex=45;
        } else if (keysDown[68] && trueMapPlayerX() <= (scaledSize * columns) - scaledSize) { // zaidejox + viewport/2 maziau arba lygu tiles plotis * tiles kiekis(viso mapo pixeliu kiekis) - tile plotis(player plotis)
            mapPlayer.x += 3;//DESNE
            playerImgIndex=44;
        } else if (keysDown[87] && trueMapPlayerY() >= 0) {
            mapPlayer.y -= 3;//VIRSUN
            playerImgIndex=46;
        } else if (keysDown[83] && trueMapPlayerY() <= (scaledSize * rows) - scaledSize) {//identiska x funkcijoms tik su eilem
            mapPlayer.y += 3;//ZEMYN
            playerImgIndex=47;
        }
    }
    //MAP PLAYER CENTER INDEX AND SIDE BUMPERS
    let mapPlayerIndex = () => { return Math.floor(((mapPlayer.y + (viewPort.h / 2)) + scaledSize * 0.5) / scaledSize) * columns + Math.floor(((mapPlayer.x + (viewPort.w / 2)) + scaledSize * 0.5) / scaledSize) };
    let mapPlayerIndexTopLeft = () => { return Math.floor(((mapPlayer.y + (viewPort.h / 2)) + scaledSize * 0.1) / scaledSize) * columns + Math.floor(((mapPlayer.x + (viewPort.w / 2)) + scaledSize * 0.1) / scaledSize) };
    let mapPlayerIndexTopRight = () => { return Math.floor(((mapPlayer.y + (viewPort.h / 2)) + scaledSize * 0.1) / scaledSize) * columns + Math.floor(((mapPlayer.x + (viewPort.w / 2)) + scaledSize * 0.7) / scaledSize) };
    let mapPlayerIndexBottomLeft = () => { return Math.floor(((mapPlayer.y + (viewPort.h / 2)) + scaledSize * 0.9) / scaledSize) * columns + Math.floor(((mapPlayer.x + (viewPort.w / 2)) + scaledSize * 0.1) / scaledSize) };
    let mapPlayerIndexBottomRight = () => { return Math.floor(((mapPlayer.y + (viewPort.h / 2)) + scaledSize * 0.9) / scaledSize) * columns + Math.floor(((mapPlayer.x + (viewPort.w / 2)) + scaledSize * 0.7) / scaledSize) };

    let oneStepBack = () => {
        mapPlayer.x = oldPlayerX; mapPlayer.y = oldPlayerY;
    }
    // COALLISION LOGIC iterates per visas colision tiles ir patikrina pries zaidejo soninius bumpers (buferius)
    let collisionListener = () => {
        for (let i = 0; i < collisionTiles.length; i++) {
            if (gameMap[mapPlayerIndexTopLeft()] == collisionTiles[i] || gameMap[mapPlayerIndexTopRight()] == collisionTiles[i] || gameMap[mapPlayerIndexBottomLeft()] == collisionTiles[i] || gameMap[mapPlayerIndexBottomRight()] == collisionTiles[i]) {
                oneStepBack();

            }
        }
        for (let i = 0; i < collisionTilesForCenter.length; i++) {
            if(gameMap[mapPlayerIndex()]==collisionTilesForCenter[i]){
                oneStepBack();
            }
            
        }
    }
    let enemyTilesListener = () => {
        for (let i = 0; i < enemyTiles.length; i++) {
            if (gameMap[mapPlayerIndex()] == enemyTiles[i]) {
                enemySriteType = enemyTiles[i];
                oldMapPlayerIndex = mapPlayerIndex();
                oneStepBack();
                if(enemySriteType==50 || enemySriteType==53){
                    gameManager.setBattlefield(1);
                }else if(enemySriteType==51 || enemySriteType==54){
                    gameManager.setBattlefield(2);
                }else if(enemySriteType==52 || enemySriteType==55){
                    gameManager.setBattlefield(3);
                }
                gameShouldPause = true;
            }
        }
    }
    let endBattleResolutionListener = () => {
        
        if (combatWon==true) {
            if(enemySriteType <= 52){
                gameMap[oldMapPlayerIndex] = 57;
                    combatWon = false;
            } else { 
                gameMap[oldMapPlayerIndex] = 56;
                combatWon = false;
            }
            
        }
    }
    let orderItemsListener = () => {
        if(gameMap[mapPlayerIndex()]==41){
            oneStepBack();
            gameShouldPause = true;
                shop();
        }
    }
    let restListener = () => {
        if(gameMap[mapPlayerIndex()]==42){
            oneStepBack();
            gameShouldPause = true;
            restOrSave();
        }
    }
    // OBJEKTU IPIESIMO FUNKCIJOS
    let medis1 = (x,y)=>{
        ctx.drawImage(medziai,0,0,100,100,x-viewPort.x/* x-map */,y-viewPort.y/* y-map */,100/* width mape */,100/*height mape */)
    }
    let medis2 = (x,y)=>{
        ctx.drawImage(medziai,100,0,100,100,x-viewPort.x/* x-map */,y-viewPort.y/* y-map */,100/* width mape */,100/*height mape */)
    }
    //RENDERINIMO FUNKCIJA--------------------------------------------------------------------------------------------------------------------------------------

    function loop() {
        window.requestAnimationFrame(loop);
        if (gameShouldPause) { return };//PAUSE
        ctx.imageSmoothingEnabled = false; //kas pixeliai atrodytu sharper
        ctx.clearRect(0, 0, viewPort.w, viewPort.h);
        endBattleResolutionListener(enemySriteType);
        updatePlayerPosition();
        collisionListener();
        viewPort.scrollTo(mapPlayer.x, mapPlayer.y);
        let xMin = Math.floor(viewPort.x / scaledSize);    //skaiciuoja kurios tiles turetu but renderinamos po viewporto viduje
        let yMin = Math.floor(viewPort.y / scaledSize);
        let xMax = Math.ceil((viewPort.x + viewPort.w) / scaledSize);
        let yMax = Math.ceil((viewPort.y + viewPort.h) / scaledSize);

        if (xMin < 0) xMin = 0;
        if (yMin < 0) yMin = 0;
        if (xMax > columns) xMax = columns;
        if (yMax > rows) yMax = rows;

        for (let x = xMin; x < xMax; x++) {  //iteruoja per visas row ir column tiles ir jom priskiria grafika
            for (let y = yMin; y < yMax; y++) {
                let value = gameMap[y * columns + x];
                let tileX = Math.floor(x * scaledSize - viewPort.x);
                let tileY = Math.floor(y * scaledSize - viewPort.y);
                ctx.drawImage(tileSheet, (value % 10) * spriteSize, Math.floor(value / 10) * 50, spriteSize, spriteSize, tileX, tileY, scaledSize, scaledSize);//ZEMELAPIO TILE IMG IPIESIMAS
            }
        }
        //ACTION TRIGERS
        enemyTilesListener();
        orderItemsListener();
        restListener();

        //PLAYER IMG IPIESIMAS
        ctx.drawImage(tileSheet, (playerImgIndex % 10) * spriteSize, Math.floor(playerImgIndex / 10) * 50, spriteSize, spriteSize, Math.round(mapPlayer.x - viewPort.x + (viewPort.w / 2)), Math.round(mapPlayer.y - viewPort.y + (viewPort.h / 2)), scaledSize, scaledSize);
        //MAP OBJEKTU IPIESIMAS
       medis1(530,245);
       medis1(280,495);
       medis2(327,145);
       medis2(127,545);
       medis1(1080,-5);
    }//--------------------------------------------------------------------------------------------------------------------------------------------------RENDER END
    //GRAFIKOS ITRAUKIMAS IS IMG FOLDERIO
    let tileSheet = new Image()

    tileSheet.addEventListener("load", (event) => { loop(); });
    tileSheet.src = "img/MAINimg.png";

    let medziai = new Image()

    medziai.addEventListener("load", (event) => { loop(); });
    medziai.src = "img/medziai.png";
}

