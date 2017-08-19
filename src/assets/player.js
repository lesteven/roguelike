import ROT from '../../vendor/rot.js';  
import Game from './game.js';
import {boss,monster} from './monsters.js';
import {} from './shadow';


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
    	Game._takeDmg(monster)
    	return;
    }
    if(!(newKey in Game.map)){return;}

    Game._display.draw(this._x,this._y,Game.map[this._x+','+this._y]);
    this._x = newX;
    this._y = newY;
    //console.log(newKey)
   
    //////////////////////
    Game._surrounding();
    //Game.shadowCast()

    window.removeEventListener('keydown',this);
    Game.engine.unlock('Game.fov',Game.fov);
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
	/*
	let index = arr.indexOf(coord)
	//console.log(index)
	if(index !== -1){
		arr.splice(index,1)
		cb()
		//console.log(arr)
	}
	else{
		return;
	}*/
	for(let key in arr){
		if(arr[coord]){
			delete arr[coord]
			cb()
		}
		else{
			return;
		}
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
	let dmg = Math.round(ROT.RNG.getNormal(this.attack * this.level,this.sd))
	console.log('your attack dmg',dmg)
   	villain.hp -= dmg;
    if(villain.hp <= 0){
    	delete(obj[key]);
    	this._gainXP();
    }
    console.log(obj)
    console.log('removed',key)
    console.log('villain health',villain.hp)
}

Game._takeDmg = function(villain){	
	let dmg = Math.round(ROT.RNG.getNormal(villain.attack * villain.level,this.sd))
	//console.log('villain attack dmg',dmg)
	this.health -= dmg;	
	this._display.drawText(this.healthPos,this.height-3,'Health: '+ Game.health)
	
	if(this.health <= 0){
		this._display.clear()
		this._display.drawText(this.healthPos,this.height-3,'You lose!')
	}
	Game._winScreen()
}
Game._gainXP = function(){
    this.xp +=1;
	if(this.xp ===5){
		this.level +=1;
		this.xp = 0;
		this._display.drawText(this.levelPos,this.height-3,'Level: '+ Game.level)
	}
	this._display.drawText(this.xpPos,this.height-3,'XP: '+ Game.xp)
}


Game._surrounding = function(){
	
	let coord = shadowCoord(this.player,5)
	delete coord[this.player._x+','+this.player._y]
	//console.log(coord)

	for(let key in coord){
		//console.log(key)
		delete Game.shadowMap[key]
	}
	//black out map	
	for(let key in Game.shadowMap){
		let parts = key.split(',');
		let x = parseInt(parts[0]);
		let y = parseInt(parts[1]);
		this._display.draw(x,y,'');
		Game.player._draw()
	}
	//draw fov around character
	for(let key in coord){
		if(key in Game.map){
			//console.log(key)
			let parts = key.split(',');
			let x = parseInt(parts[0]);
			let y = parseInt(parts[1]);
			this._display.draw(x,y,':')
		}
	}
	this._shadowItems(coord,this.monsters,'M','#f4b601')
	this._shadowItems(coord,this.bossKey,'B','#ff7f7f')
	this._shadowItems(coord,this.hItems,'#','#ccffcc')
	this._shadowItems(coord,this.newWeapon,'&','#7bffff')
}
function shadowCoord(player,num){
	let coord = {};
	//console.log('player x-y coord',player._x,player._y)
	for(let i = player._x - num; i <= player._x + num;i++){
		//console.log('x coord',i)
		for(let j = player._y - num; j <=player._y + num; j++){
			//console.log('y coord',j)
			//console.log(i+','+j)
			coord[i+','+j] ='S'
		}
	}
	return coord
}
Game._shadowItems = function(coord,obj,rep,color){
	/*
	console.log(
		'monsters',this.monsters,
		'boss',this.bossKey,
		'health',this.hItems,
		'weapon',this.newWeapon)*/
	for(let key in obj){
		if(key in coord){
			//console.log('key',key)
			let parts = key.split(',');
			let x = parseInt(parts[0]);
			let y = parseInt(parts[1]);
			Game._display.draw(x,y,rep,color)
		}

	}
}
export {player}