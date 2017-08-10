import ROT from '../../vendor/rot.js';  
import Game from './game.js';

let player = function(x,y){
	this._x = x;
	this._y = y;
	this._draw();
}

player.prototype._draw = function(){
	Game._display.draw(this._x,this._y,'@')
}
Game.player = null;

Game._createPlayer = function(freeCells){
	let index = Math.floor(ROT.RNG.getUniform()*freeCells.length);
	let key = freeCells.splice(index,1)[0];
	let parts = key.split(',');
	const x = parseInt(parts[0]);
	const y = parseInt(parts[1]);
	this.player = new Player(x,y)
}