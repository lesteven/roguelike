import ROT from '../../vendor/rot.js';  
import Game from './game.js';
import {player} from './player';
import {boss} from './monsters';


Game._generateMap= function(){
	let rogueMap = new ROT.Map.Rogue(this.width,this.height-5);
	this._display = new ROT.Display({width:this.width,height:this.height});
	//map.create(this._display.DEBUG)

	let freeCells = [];
	let mapCB = function(x,y,value){
		if(value){return;}
		let key = x + ',' + y;
		this.map[key] = ':';
		freeCells.push(key);
	}
	rogueMap.create(mapCB.bind(this));
	this._drawWholeMap();
	this._generateItems(freeCells,5,'#',this.hItems,'#ccffcc');
	this._generateItems(freeCells,1,'&',this.newWeapon,'#7bffff');
	this._playerStatus();
	this.player = this._createBeing(player,freeCells);
	this.boss = this._createBeing(boss,freeCells);
}

Game._drawWholeMap=function(){
	for(let key in this.map){
		let parts = key.split(',');
		let x = parseInt(parts[0]);
		let y = parseInt(parts[1]);
		this._display.draw(x,y,this.map[key])
	}
}
Game.healthPos = 5;
Game.levelPos = 25;
Game.xpPos = 45;
Game.weaponPos = 65;
Game.attackPos = 85;

Game._playerStatus = function(){
	this._display.drawText(this.healthPos,this.height-3,'Health: '+ Game.health)
	this._display.drawText(this.levelPos,this.height-3,'Level: '+ Game.level)
	this._display.drawText(this.xpPos,this.height-3,'XP: '+ Game.xp)
	this._display.drawText(this.weaponPos,this.height-3,'Weapon: '+ Game.weapon)
	this._display.drawText(this.attackPos,this.height-3,'Attack: '+ Game.attack)
}