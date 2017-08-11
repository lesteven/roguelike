import ROT from '../../vendor/rot.js';  
import Game from './game.js';

Game._generateMap= function(){
	let map = new ROT.Map.Rogue(this.width,this.height);
	this._display = new ROT.Display({width:this.width,height:this.height});
	//map.create(this._display.DEBUG)

	let freeCells = [];
	let mapCB = function(x,y,value){
		if(value){return;}
		let key = x + ',' + y;
		this.map[key] = ':';
		freeCells.push(key);
	}
	map.create(mapCB.bind(this));
	this._drawWholeMap();
	this._createPlayer(freeCells);
}

Game._drawWholeMap=function(){
	for(let key in this.map){
		let parts = key.split(',');
		let x = parseInt(parts[0]);
		let y = parseInt(parts[1]);
		this._display.draw(x,y,this.map[key])
	}
}