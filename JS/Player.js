let player;
let playerInventory;

class Player {
    constructor(classType, health, strength, defence, agility) {
        this.classType = classType;
        this.health = health;
        this.maxHealth = health;
        this.strength = strength;
        this.defence = defence;
        this.agility = agility;
        this.exp = 0;
        this.lvl = 1;
    }
}
//PLAYER LVL UP LOGIC-------------------------------
//X = 25 * L** - 25 * L
let nextLvlExp = () => {
    if (player.lvl == 1) {
        return 50;
    } else {
        return 50 * player.lvl ** 2 - 50 * player.lvl
    };
}
let playerExpGain = () => {
    player.exp += enemy.exp;
    while (player.exp >= nextLvlExp()) {
        player.lvl++;
        player.strength += Math.ceil(player.strength / 10);
        player.defence += Math.ceil(player.defence / 10);
        player.agility += Math.ceil(player.agility / 10);
        player.maxHealth += Math.ceil(player.maxHealth / 10);
        document.querySelector('.exp-lvl').innerHTML += 'LVL UP! Lvl: ' + player.lvl + '  Next lvl at ' + nextLvlExp() + 'exp<br>'
    }
}
let playerCoinGain = () =>{
    inventoryCoins += enemy.coins;
}


// SLASH ATACK ACTION-------------------------------------------PLAYER
let playerSlash = () => {
    //-----------------placeholder FOR WEAPON
    let weaponDamage = 10;//ginklu itemai neimplementuoti 
    let enemyDefenceCalc = Math.ceil(enemy.defence / 10);
    //
    let staticDamage = Math.floor((player.strength + weaponDamage) / 10);
    let baseDamage = staticDamage - enemyDefenceCalc + randomNum(10);
    // NUMBER OF HITS
    let numberOfHits = Math.ceil(player.agility / 5 * randomNum(3) / 15);

    //check if damage is not 0 or in minus
    if (baseDamage < 1) baseDamage = 1;

    //WHOLE DAMAGE OUTPUT
    let totalDamage = baseDamage * numberOfHits;

    //HEALTH CHANGE
    let getEnemyHealth = document.querySelector(".health-enemy")
    enemy.health -= totalDamage;

    if (enemy.health <= 0) {
        enemy.health = 0;
    }
    // SET ENEMY HEALTH
    getEnemyHealth.innerHTML = 'Health: ' + enemy.health;
    setActions();
  
let playerAtackMessage = '<div class="atack-message-player">You hit <span>' + baseDamage + '</span> damage <span>' + numberOfHits + '</span> times for total damage of: <h3>' + totalDamage+'</h3></div>';
battleMessage(playerAtackMessage);
}
let playerHeal = function(healAmount) {
    player.health += healAmount;
    if (player.health > player.maxHealth) {
        player.health = player.maxHealth;
    };
    if (document.querySelector(".health-player") !== null) {
        document.querySelector(".health-player").innerHTML = 'Health:' + player.health + '/' + player.maxHealth;
    }
}
let playerFullRest = ()=>{
    playerHeal(player.maxHealth);
    clearField.clearAboveMap();
    gameShouldPause = false;
    renderCharInfoBtn();
}