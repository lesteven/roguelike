import ROT from '../../vendor/rot.js';  
import Game from './game.js';

let boss = function(x,y,key){
	//delete Game.map[key]
	Game.bossKey = key
	this._x = x;
	this._y = y;
	this._draw();
	console.log('from boss',Game.map,Game.bossKey)
}
boss.prototype.act = function(){
	Game.engine.lock();
}
boss.prototype._draw = function(){
	Game._display.draw(this._x,this._y,'B','#8acfff')
}

export {boss}