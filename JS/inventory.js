let invOpen = false;
let shopOpen = false;
let inventory=[];
let inventoryCoins = 1000;
const inventoryTh = '<div class="table-container"><table> <thead>' +
        '<tr> <th>Item</th> <th>Amount</th> <th></th> </tr> </thead> <tbody class="table-content"></tbody> </table><div class="inv-quit"><a href="#" onclick="quitInvBtn()"><img src="img/quitImg.png"></a></div><div class="inv-coins">Coins: ' + inventoryCoins + '</div>';
let inventoryCoinsUpdate = () => {
        document.querySelector('.inv-coins').innerHTML = 'Coins: ' + inventoryCoins;
}
let charInfoInventory = () => {

        shopOpen = false
        gameShouldPause = true;
        clearField.clearAboveMap();
        getAboveMap.innerHTML = '<div class="char-info-container"><div class="char-stats-container"><img src="img/Characters/' + player.classType + '.png" class="img-avatar"><div class="char-stats"><h3>LVL: ' + player.lvl + ' ' + player.classType +
                '</h3><p class="health-player">Health:' + player.health + '/' + player.maxHealth + '</p><p>Strength:' + player.strength + '</p><p>Defence:' + player.defence + '</p><p>Agility:'
                + player.agility + '</p><p>Exp: ' + player.exp + '/' + nextLvlExp() + '</div></div><div class="char-inv-container">' + inventoryTh + '</div>';

        renderInventory();
        inventoryCoinsUpdate();

}
let shop = () => {
        shopOpen = true;
        gameShouldPause = true;
        clearField.clearAboveMap();
        let shopContainer = document.createElement('div');
        shopContainer.className = 'shop-container';
        let smallPotion = () => {

                let btnBuy = document.createElement('button');
                btnBuy.innerHTML = '<img src="img/potionS.png"> Order small potion Coins: 50';
                btnBuy.className = 'btn btn-buy';
                btnBuy.addEventListener('click', function (event) {
                        event.preventDefault();
                        playerInventory.addItem("potionS", 1, 50);
                })
                shopContainer.appendChild(btnBuy);
        }
        let mediumPotion = () => {
                let btnBuy = document.createElement('button');
                btnBuy.innerHTML = '<img src="img/potionM.png"> Order medium potion Coins: 100';
                btnBuy.className = 'btn btn-buy';
                btnBuy.addEventListener('click', function (event) {
                        event.preventDefault();
                        playerInventory.addItem("potionM", 1, 100);
                })
                shopContainer.appendChild(btnBuy);
        }
        let largePotion = () => {
                let btnBuy = document.createElement('button');
                btnBuy.innerHTML = '<img src="img/potionL.png"> Order large potion Coins: 150';
                btnBuy.className = 'btn btn-buy';
                btnBuy.addEventListener('click', function (event) {
                        event.preventDefault();
                        playerInventory.addItem("potionL", 1, 150);
                })
                shopContainer.appendChild(btnBuy);
        }
        let shopPlayerInv = document.createElement('div');
        shopPlayerInv.innerHTML = inventoryTh;
        shopPlayerInv.className = 'shop-table-container'

        smallPotion();
        mediumPotion();
        largePotion();
        shopContainer.appendChild(shopPlayerInv);
        getAboveMap.appendChild(shopContainer);
        renderInventory();
        inventoryCoinsUpdate();

}
let quitInvBtn = () => {
        clearField.clearAboveMap();
        shopOpen = false;
        gameShouldPause = false;
        renderCharInfoBtn();
}
let renderCharInfoBtn = () => {
        let box = document.createElement('div');
        box.className = 'char-info-icon-container';
        box.innerHTML = '<a class="char-info-icon" href="#" onclick="charInfoInventory()"><img src="img/inventoryIcon.png"></a>';
        getAboveMap.appendChild(box);
}
class Inventory {
        constructor() {
                this.addItem = function (id, amount, price) {
                        if (inventoryCoins - (amount * price) >= 0) {
                                let itemExists = false;
                                for (let i = 0; i < inventory.length; i++) {
                                        if (inventory[i].id === id) {
                                                inventoryCoins -= amount * price;
                                                inventory[i].amount += amount;
                                                itemExists = true;
                                        }
                                }
                                if (!itemExists) {
                                        inventoryCoins -= amount * price;
                                        inventory.push({ id: id, amount: amount });
                                }
                                document.querySelector('.inv-coins').innerHTML = 'Coins: ' + inventoryCoins
                                renderInventory();
                        }
                }
                this.fillInventory = function (items) {
                        if (items.length > 0) {
                                inventory.push(items);
                        };
                        renderInventory();
                }
                this.removeItem = function (id) {
                        for (let i = 0; i < inventory.length; i++) {
                                if (inventory[i].id === id) {
                                        this.findAndUseItem(id);
                                        inventory[i].amount -= 1;
                                        if (inventory[i].amount <= 0)
                                                inventory.splice(i, 1);
                                }
                        }
                        renderInventory();
                }
                this.hasItem = function (id) {
                        inventory.some(function (item, index) {
                                if (item.id === id) {
                                        return true;
                                }
                        });
                }
                this.findAndUseItem = function (id) {
                        let found = false;
                        for (let i = 0; i < itemList.length || found === false; i++) {
                                if (itemList[i].id === id) {
                                        found = true;
                                        return itemList[i].event();
                                }
                        }
                }
        }
}



class Item {
        constructor(id, name, event) {
                this.id = id;
                this.name = name;
                this.event = event;
        }
};

let itemList = [
        new Item("potionS", '<div class="item-square"><img src="img/potionS.png" class="potion-img"><h3>Small potion</h3></div>', function () { playerHeal(40) }),
        new Item("potionM", '<div class="item-square"><img src="img/potionM.png" class="potion-img"><h3>Medium potion</h3></div>', function () { playerHeal(100) }),
        new Item("potionL", '<div class="item-square"><img src="img/potionL.png" class="potion-img"><h3>Large potion</h3></div>', function () { playerHeal(200) })
];

let renderInventory = () => {
        let inventoryTableContent = document.querySelector(".table-content");
        inventoryTableContent.innerHTML = '';
        if (inventory.length === 0) {
                inventoryTableContent.innerHTML = '<h2 class="empty-inv">Inventory is empty</h2>';
        } 
        // else if (typeof inventory === "string") {
        //         inventoryTableContent.innerHTML = '<h2 class="empty-inv">Inventory is stttriing</h2>';
        //                 inventory=new Array(inventory);
        //                 console.log(inventory);
        //                 inventory.forEach(element => {
        //                         element[1]='';
        //                         element[element.length-2]='';
        //                 });
        //                 console.log(inventory);
        // }
        //  else 
         {
                inventory.forEach(inventoryItem => {
                        console.log(inventoryItem);
                        let row = document.createElement('tr');
                        itemList.forEach(item => {
                                if (inventoryItem.id === item.id) {
                                        let col = document.createElement('td');
                                        col.innerHTML = item.name;
                                        row.appendChild(col);
                                }
                        })
                        function amount() {
                                let col = document.createElement('td');
                                col.innerHTML = inventoryItem.amount;
                                row.appendChild(col);
                        };
                        function useBtn() {
                                let col = document.createElement('td');
                                let btnUse = document.createElement('button');
                                btnUse.innerHTML = 'Use';
                                btnUse.className = 'btn btn-use';
                                btnUse.addEventListener('click', function (event) {
                                        event.preventDefault();
                                        playerInventory.removeItem(inventoryItem.id)
                                })
                                col.appendChild(btnUse);
                                row.appendChild(col);
                        }
                        amount();
                        if (shopOpen == false) {
                                useBtn();
                        }
                        inventoryTableContent.appendChild(row);
                });
        }
}
