let enemy;
class Enemy {
    constructor(enemyType, health, strength, defence, agility, exp,coins) {
        this.enemyType = enemyType;
        this.health = health;
        this.maxHealth = health;
        this.strength = strength;
        this.defence = defence;
        this.agility = agility;
        this.exp = exp+randomNum(10);
        this.coins = coins+randomNum(20);
    }
}
// SLASH ATACK ACTION-------------------------------------------ENEMY
let enemySlash = () => {

    //----------------PLAYER DEFENCE
    let playerDefenceCalc = Math.ceil(player.defence / 10);
    //
    let staticDamage = Math.floor((enemy.strength) / 10);
    let baseDamage = staticDamage - playerDefenceCalc + randomNum(10);
    // NUMBER OF HITS
    let numberOfHits = Math.ceil(enemy.agility / 5 * randomNum(3) / 15);

    //check if damage is not 0 or in minus-
    if (baseDamage < 1) baseDamage = 1;

    //WHOLE DAMAGE OUTPUT
    let totalDamage = baseDamage * numberOfHits;

    //HEALTH CHANGE
    let getPlayerHealth = document.querySelector(".health-player");
    player.health -= totalDamage;


    // SET Player HEALTH
    if (player.health <= 0) {
        player.health = 0;
    }
    // SET Player HEALTH
        getPlayerHealth.innerHTML = 'Health: ' + player.health;
        setActions();

   let enemyAtackMessage= '<div class="atack-message-enemy">' + enemy.enemyType + ' hit <span>' + baseDamage + ' </span>damage <span>' + numberOfHits + '</span> times for total damage of: <h3>' + totalDamage+'</h3></div>';
    battleMessage(enemyAtackMessage);
}