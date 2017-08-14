import ROT from '../../vendor/rot.js';  
import Game from './game.js';

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
	//this._generateItems(freeCells,8,'M',this.monsters,'#ffa343');
	//this._generateItems(freeCells,1,'B',this.boss,'#ffb2b2');
	this._createPlayer(freeCells);
	this._playerStatus();
}

Game._drawWholeMap=function(){
	for(let key in this.map){
		let parts = key.split(',');
		let x = parseInt(parts[0]);
		let y = parseInt(parts[1]);
		this._display.draw(x,y,this.map[key])
	}
}
Game._playerStatus = function(){
	this._display.drawText(5,this.height-3,'Health: '+ Game.health)
	this._display.drawText(25,this.height-3,'Level: '+ Game.level)
	this._display.drawText(45,this.height-3,'XP: '+ Game.xp)
	this._display.drawText(65,this.height-3,'Weapon: '+ Game.weapon)
	this._display.drawText(85,this.height-3,'Attack: '+ Game.attack)
}