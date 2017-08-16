import ROT from '../../vendor/rot.js';  
import Game from './game.js';

let boss = function(x,y,key){
	//delete Game.map[key]
	Game.bossKey = key;
	this._x = x;
	this._y = y;
	this._draw();
	//console.log('from boss',Game.map,Game.bossKey)
}
boss.prototype.act = function(){
	Game.engine.lock();
}
boss.prototype._draw = function(){
	Game._display.draw(this._x,this._y,'B','#ff7f7f')
}
boss.hp = 90;
boss.attack = 15;
boss.level = 2;

let monster = function(x,y,key){
	Game.monsters[key] = 'M';
	console.log(key)
	this._x = x;
	this._y = y;
	this._draw();
}
monster.prototype.act = function(){
	Game.engine.lock();
}
monster.prototype._draw = function(){
	Game._display.draw(this._x,this._y,'M','#f4b601')
}
monster.hp = 20;
monster.attack = 10;
monster.level = 1;

export {boss,monster}