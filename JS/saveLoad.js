// var list player. (classType, health, maxHealth, strength, defence, agility ,exp, lvl) inventoryCoins , inventory
let saves;
let noSaves;
function save() {
    
  let classType = player.classType;
  let health = player.health;
  let maxHealth = player.maxHealth;
  let strength = player.strength;
  let defence = player.defence;
  let agility = player.agility;
  let exp = player.exp;
  let lvl = player.lvl;
  let coins = inventoryCoins;
  let inventory1 = JSON.stringify(inventory);
  console.log(classType, health, maxHealth, strength, defence, agility, exp, lvl, coins, inventory);
  
  $.ajax({
    type: "POST",
    url: "includes/gameSave.php",
    data: {
      classType: classType, health: health, maxhealth: maxHealth, strength: strength, defence: defence, agility: agility,
      exp: exp, lvl: lvl, coins: coins, inventory: inventory1
    },
    success: function () {
      quitInvBtn();
    }
  }
  );
};
let load = () => {
  $.ajax({
    url: "includes/gameLoad.php",
    data: { saves: 'get saves array' },
    success: function (data) {
      console.log(data);
      if (data ==="There are no saves.") {
        noSaves = true;
        prepareSave(saves);
      } else {
        noSaves=false;
        saves = JSON.parse(data);
        console.log(data);
        console.log(saves);
        prepareSave(saves);
      }
    }
  })
}
let prepareSave = (array) => {
  clearField.clearWholeField();
  getActions.innerHTML = '<div class="saves-container"></div>';
  getSavesContainer = document.querySelector('.saves-container');
  if (noSaves === true) {
    getSavesContainer.innerHTML = 'No saves present<br><button class="btn" onclick="startingScreen()">back</button>'
  } else {
    getSavesContainer.innerHTML='<button class="btn" onclick="startingScreen()">back</button>'
    for (let i = 0; i < array.length; i++) {
      getSavesContainer.innerHTML += '<div class="save-row"><div class="save-nr">Save : ' + array[i][0] + '</div><div class="save-class">&nbsp;Class : ' + array[i][2] +
      '</div><div class="save-lvl">&nbsp; Lvl : ' + array[i][9] + '</div>' +
      '<button class="btn btn-load-save" onClick="loadSave(' + i + ')">load save</button></div><br>';
    }
  }
}

let loadSave = (num) => {
  gameShouldPause=false;
  gameManager.startGame(saves[num][2]);
  player.health = JSON.parse(saves[num][3]);
  player.maxHealth = JSON.parse(saves[num][4]);
  player.strength = JSON.parse(saves[num][5]);
  player.defence = JSON.parse(saves[num][6]);
  player.agility = JSON.parse(saves[num][7]);
  player.exp = JSON.parse(saves[num][8]);
  player.lvl = JSON.parse(saves[num][9]);
  inventoryCoins = JSON.parse(saves[num][10]);
  let jason = JSON.parse(saves[num][11]);
  inventory=jason;
  console.log(inventory);
}



