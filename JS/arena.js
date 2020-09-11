let btnDisable=false;
let atackMessageContainer;
let healthBar = (dude) => {
    let onePercent = dude.maxHealth / 100;
    let healthPercentage = Math.round(dude.health / onePercent);
    return healthPercentage;
}
let checkBtnDisable = () => {
    if (btnDisable === true) {
        let btnDisable = () => {
            let btnAtack = document.querySelector('#js-atack-disable');
            let btnFlee = document.querySelector('#js-flee-disable');
            btnAtack.disabled = true;
            btnFlee.disabled = true;
        }
        btnDisable();
    } else if (btnDisable === false) {
        let btnEnable = () => {
            let btnAtack = document.querySelector('#js-atack-disable');
            let btnFlee = document.querySelector('#js-flee-disable');
            btnAtack.disabled = false;
            btnFlee.disabled = false;
        }
        btnEnable();
    }
}
let battleMessage =(text)=>{
    document.querySelector("#js-atack-message").innerHTML = text;
}