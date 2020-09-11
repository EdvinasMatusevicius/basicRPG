let combatInProgress;
let timeOutsList = []; //time outs array for after battle clear timeouts

let battlefieldContainer = () => {
    let wraper = document.createElement('div');
    wraper.idName
    wraper.className = "battlefield-container";

    wraper.appendChild(getWarrior);
    wraper.appendChild(getBattleActions);
    wraper.appendChild(getEnemy);
    getContainer.appendChild(wraper);
}
let battlefieldContainerRemove = () => {
    getContainer.appendChild(getWarrior);
    getContainer.appendChild(getBattleActions);
    getContainer.appendChild(getEnemy);
    document.querySelector('.battlefield-container').remove();
}
// CHARACTER INFO SECTION --------------------------
let setWarrior = () => {
    getWarrior.innerHTML = '<div class="battle-char-info"><img src="img/Characters/' + player.classType + '.png" class="img-avatar"><div class="battle-stats"><h3>' + player.classType +
        '</h3><p class="health-player">Health:' + player.health + '</p><p>Strength:' + player.strength + '</p><p>Defence:' + player.defence + '</p><p>Agility:'
        + player.agility + '</p> </div></div>'
}
//ACTIONS SECTION---------------
let setActions = () => {

    getBattleActions.innerHTML = '<div class="arena"><div class="atack-message" id="js-atack-message"></div><div class="player-health-bar-outline">' +
        '<img src="img/healthBar.png" height="100%" width="' + healthBar(player) + '%"></div><div class="enemy-health-bar-outline">' +
        '<img src="img/healthBar.png" height="100%" width="' + healthBar(enemy) + '%"></div></div>' +
        '<div class="battle-buttons"><button onclick="atackCycle()"class="btn btn-atack" id="js-atack-disable">Atack</button>' +
        '<button onclick="flee()" class="btn btn-flee" id="js-flee-disable">Flee</button></div>';
    checkBtnDisable();
}
//ENEMY GENERATOR-----------------------
let generateEnemyLvl1 = () => {
    switch (randomNum(3)) {
        case 1:
            enemy = new Enemy("UltraMegaChicken", 80, 30, 40, 100, 20, 10);
            break;
        case 2:
            enemy = new Enemy("Ghoul", 90, 50, 30, 40, 40, 30);
            break;
        case 3:
            enemy = new Enemy("Warewolf", 100, 60, 40, 60, 80, 50);
            break;
    }
}
let generateEnemyLvl2 = () => {
    switch (randomNum(4)) {
        case 1:
            enemy = new Enemy("Bride Apparition", 150, 60, 60, 60, 110, 60);
            break;
        case 2:
            enemy = new Enemy("Vampire", 180, 70, 60, 70,140, 70);
            break;
        case 3:
            enemy = new Enemy("Witch", 170, 90, 70, 60,160,80);
            break;
        case 4:
            enemy = new Enemy("Forest Spirit", 200,100, 80, 70,190, 90);
            break;
    }
}
let generateEnemyLvl3 = () => {
    switch (randomNum(4)) {
        case 1:
            enemy = new Enemy("Grifin",210, 90, 100, 120, 210,110);
            break;
        case 2:
            enemy = new Enemy("Giant", 250, 120, 100, 80, 250, 120);
            break;
        case 3:
            enemy = new Enemy("Dragon", 250, 110, 130, 130, 300, 150);
            break;
        case 4:
            enemy = new Enemy("Death", 300, 130, 150, 130, 350, 200);
            break;
    }
}
let generateEnemy =(lvl)=>{
    if(lvl==1){
        generateEnemyLvl1();
    }else if (lvl==2) {
        generateEnemyLvl2();
    }else if (lvl==3){
        generateEnemyLvl3();
    }
}
// ENEMY INFO SECTION--------------------------------
let setEnemy = () => {
    getEnemy.innerHTML = '<div class="battle-enemy-info"><img src="img/Enemys/' + enemy.enemyType + '.png" class="img-avatar"><div class="battle-stats"><h3>' + enemy.enemyType +
        '</h3><p class="health-enemy">Health:' + enemy.health + '</p><p>Strength:' + enemy.strength + '</p><p>Defence:' + enemy.defence + '</p><p>Agility:'
        + enemy.agility + '</p></div></div>'
}

//PABEGIMO IS KOVOS LOGIKA------------
let flee = () => {
    btnDisable = true;
    setActions();
    let fleeNum = randomNum(20 - (player.agility / 10) + (enemy.agility / 10));
    switch (fleeNum) {
        case fleeNum < 1:
            fleeNum = 1;
            break;
    }
    if (fleeNum <= 10) {
        battleMessage('<span class="flee-succsess">Successfully fled the enemy</span>');
        setTimeout(() => {
            btnDisable = false;
            afterBattleMaptoggle();
        }, 1500);
    } else {
        battleMessage('<span class="flee-fail">Atempt failed</span>');
        setTimeout(() => {
            enemySlash();
            let timeOut5 = setTimeout(() => { btnDisable = false; setActions(); }, 2000);
            timeOutsList.push(timeOut5);
            setEndBattleScreen();
        }, 1500);
    }

}

//KOVOS CIKLAS-----------------------
let atackCycle = () => {
    btnDisable = true;
    combatInProgress = true;
    if (player.agility >= enemy.agility) {
        playerSlash();
        setEndBattleScreen();
        //tikrina ar combat tesiasi kad negyvas priesas nepultu
        switch (combatInProgress) {
            case true:

                let timeOut1 = setTimeout(() => {
                    console.log('1');
                    let timeOut2 = setTimeout(() => { console.log('2'); btnDisable = false; setActions(); checkBtnDisable(); }, 2000);
                    timeOutsList.push(timeOut2);
                    enemySlash();
                    setEndBattleScreen();
                }, 2000);
                timeOutsList.push(timeOut1);
                break;
            case false: return;
        }
    } else {
        enemySlash();
        setEndBattleScreen();

        switch (combatInProgress) {
            case true:
                let timeOut3 = setTimeout(() => {
                    console.log('3');
                    let timeOut4 = setTimeout(() => { console.log('4'); btnDisable = false; setActions(); checkBtnDisable(); }, 2000);
                    timeOutsList.push(timeOut4);
                    playerSlash();
                    setEndBattleScreen();
                }, 2000);
                timeOutsList.push(timeOut3);
                break;
            case false: return;
        }

    }
}
// GAME OVER SCREEN------------
let gameOver = () => {
    getWarrior.innerHTML = '<div class="GameOverScreen"><h2>Game Over</h2><button class="btn btn btn-restart" onClick="window.location.reload();">Back to start screen</button>';
}
//VICTORY SCREEN---------------
let victoryScreen = () => {
    getWarrior.innerHTML = '<div class="victory-container"><div class="victory"><h2>Victory</h2><img src="img/Characters/' + player.classType + '.png" class="img-avatar"><h4 class="exp-lvl">Experiance gained:' + enemy.exp + '<br><h4>Coins looted: ' + enemy.coins + '</h4>' +
        '<button class="btn btn-continue" onclick="afterBattleMaptoggle()">Continue</button></div></div>';
    playerExpGain();
    playerCoinGain();
}
//END BATTLE SCREEN-------------
let setEndBattleScreen = () => {
    if (player.health <= 0) {
        timeOutsClear(timeOutsList);
        clearField.clearWholeField();
        btnDisable = false;
        combatInProgress = false;
        gameOver();
    } else if (enemy.health <= 0) {
        timeOutsClear(timeOutsList);
        clearField.clearWholeField();
        btnDisable = false;
        combatInProgress = false;
        combatWon = true;
        victoryScreen();
    } else { }
}
let timeOutsClear = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        clearTimeout(arr[i]);

    }
    arr.length = 0;
}