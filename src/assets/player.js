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
    console.log(this._x,this._y)
    this._draw();
    window.removeEventListener('keydown',this);
    Game.engine.unlock();
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