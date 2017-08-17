import ROT from '../../vendor/rot.js';  
import Game from './game.js';
import {boss,monster} from './monsters.js';

let player = function(x,y,key){
	this._x = x;
	this._y = y;
	this._draw();
}
player.prototype.act = function(){
	Game.engine.lock();
	Game.engine.unlock();
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
    Game.playerKey = newKey
    if(newKey in Game.bossKey){
    	//console.log(Game.bossKey[newKey])
    	Game._attack(boss,Game.bossKey,newKey)
    	Game._takeDmg(boss)
    	return;
    }
    if(newKey in Game.monsters){
    	console.log(newKey)
    	Game._attack(monster,Game.monsters,newKey)
    	return;
    }
    if(!(newKey in Game.map)){return;}

    Game._display.draw(this._x,this._y,Game.map[this._x+','+this._y]);
    this._x = newX;
    this._y = newY;
    //console.log(newKey)
    this._draw();
    window.removeEventListener('keydown',this);
    Game.engine.unlock();
    //console.log(Game.playerKey)
    Game._pickUp(newKey,Game.hItems,Game._increaseHealth);
    Game._pickUp(newKey,Game.newWeapon,Game._getWeapon);
}

Game._createBeing = function(being,freeCells){
	let index = Math.floor(ROT.RNG.getUniform()*freeCells.length);

	let key = freeCells.splice(index,1)[0];
	let parts = key.split(',');
	const x = parseInt(parts[0]);
	const y = parseInt(parts[1]);
	return new being(x,y,key);
}

Game._engine = function(){
	const scheduler = new ROT.Scheduler.Simple();
	scheduler.add(this.player,true);
	scheduler.add(this.boss,true);
	this.engine = new ROT.Engine(scheduler);
	this.engine.start();
}

Game._pickUp = function(coord,arr,cb){
	let index = arr.indexOf(coord)
	//console.log(index)
	if(index !== -1){
		arr.splice(index,1)
		cb()
		//console.log(arr)
	}
	else{
		return;
	}
}

Game._increaseHealth = function(){
	//console.log(Game.health)
	Game.health += 10;
	//console.log(Game.health)
	Game._display.drawText(Game.healthPos,Game.height-3,'Health: '+ Game.health)
}
Game._getWeapon = function(){
	Game.weapon = 'Spear'
	Game._display.drawText(Game.weaponPos,Game.height-3,'Weapon: '+ Game.weapon)
	
	Game.attack += 20
	Game._display.drawText(Game.attackPos,Game.height-3,'Attack: '+ Game.attack)
}
Game._attack = function(villain,obj,key){
	let dmg = Math.round(ROT.RNG.getNormal(this.attack * this.level,5))
	console.log('your attack dmg',dmg)
   	villain.hp -= dmg;
    	if(villain.hp <= 0){
    		delete(obj[key])
    	}
    console.log('villain health',villain.hp)
}

Game._takeDmg = function(villain){	
	let dmg = Math.round(ROT.RNG.getNormal(villain.attack * villain.level,5))
	console.log('villain attack dmg',dmg)
	this.health -= dmg;	
	this._display.drawText(this.healthPos,this.height-3,'Health: '+ Game.health)
	
	if(this.health <= 0){
		this._display.clear()
		this._display.drawText(this.healthPos,this.height-3,'You lose!')
	}
	Game._winScreen()
}

export {player}