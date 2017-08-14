import ROT from '../../vendor/rot.js';  
import Game from './game.js';


let player = function(x,y){
	this._x = x;
	this._y = y;
	this._draw();
}
player.prototype.act = function(){
	Game.engine.lock();
	window.addEventListener('keydown',this);
}
player.prototype._draw = function(){
	Game._display.draw(this._x,this._y,'@','#8acfff')
}
player.prototype.handleEvent = function(e){
	let keyMap = {}
	keyMap[38] = 0;
	keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    let code = e.keyCode;
    if(!(code in keyMap)){return;}

    let dir = ROT.DIRS[8][keyMap[code]];
    let newX = this._x + dir[0];
    let newY = this._y +dir[1];
    let newKey = newX + ',' + newY;
    if(!(newKey in Game.map)){return;}

    Game._display.draw(this._x,this._y,Game.map[this._x+','+this._y]);
    this._x = newX;
    this._y = newY;
    //console.log(newKey)
    this._draw();
    window.removeEventListener('keydown',this);
    Game.engine.unlock();

    Game._pickUp(newKey,Game.hItems,Game._increaseHealth);
    Game._pickUp(newKey,Game.newWeapon,Game._getWeapon);
;}

Game._createPlayer = function(freeCells){
	let index = Math.floor(ROT.RNG.getUniform()*freeCells.length);

	let key = freeCells.splice(index,1)[0];
	let parts = key.split(',');
	const x = parseInt(parts[0]);
	const y = parseInt(parts[1]);
	this.player = new player(x,y)

}

Game._engine = function(){
	const scheduler = new ROT.Scheduler.Simple();
	scheduler.add(this.player,true);
	this.engine = new ROT.Engine(scheduler);
	this.engine.start();
}

Game._pickUp = function(coord,arr,cb){
	let index = arr.indexOf(coord)
	//console.log(index)
	if(index !== -1){
		arr.splice(index,1)
		cb()
		console.log(arr)
	}
	else{
		return;
	}
}

Game._increaseHealth = function(){
	//console.log(Game.health)
	Game.health += 20;
	//console.log(Game.health)
	Game._display.drawText(5,Game.height-3,'Health: '+ Game.health)
}
Game._getWeapon = function(){
	Game.weapon = 'Spear'
	Game._display.drawText(65,Game.height-3,'Weapon: '+ Game.weapon)
	Game.attack += 20
	Game._display.drawText(85,Game.height-3,'Attack: '+ Game.attack)
}