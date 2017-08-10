import ROT from '../../vendor/rot.js';  
import Game from './game.js';

Game._generateMap= function(){
	let map = new ROT.Map.Rogue(this.width,this.height);
	this._display = new ROT.Display({width:this.width,height:this.height});
	map.create(this._display.DEBUG)
}

