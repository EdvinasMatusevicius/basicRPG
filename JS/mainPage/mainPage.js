const getContent = document.querySelector('#content-box');
const getStatBtn= document.querySelector('.btn-stats');
const getGraphicsBtn=document.querySelector('.btn-graphics');
let statsInfo =()=>{
 getContent.innerHTML=' <div calss="content">'+
 '<div class="stats-box"><h4 class="health">Health</h4><br><p>Health is a simple stat but the most important,if you run out of it and its game over. All classes get the same amount of health.</p></div>'+
 '<div class="stats-box"><h4 class="strength">Strength</h4><br><p>Strength stat determines how much damage is done with one strike</p></div>'+
' <div class="stats-box"><h4 class="defence">Defence</h4><br><p>Defence stat determines how much damage of incoming strike is negated.</p></div>'+
' <div class="stats-box"><h4 class="agility">Agility</h4><br><p>Agility stat determines how many strikes can character hit during one turn.</p></div>'+
'</div>';
};
let graphicsInfo = ()=>{
    getContent.innerHTML=' <div class="content-graphics">'+
    '<div class="graphics-title"><h4>Graphics included in game</h4></div><br><div class="other-graphics-content"><p>Most of the graphics in game were made in photoshop except detailed character and enemy portraits which were taken from witcher 3 cards game gwent. </p><br>'+
    '<p>Some pixel graphics examples below include the whole indexed tile map and a main game logo.</p><img src="img/MAINimgINDEXUOTA.png"><img src="img/logo.png"></div>'
    '</div>';
}
window.onload=statsInfo();
getStatBtn.addEventListener('click',function(){statsInfo()});
getGraphicsBtn.addEventListener('click',function(){graphicsInfo()});