import ROT from '../../vendor/rot.js';  
import Game from './game.js';


Game.data = {};

let lightPasses = function(x,y){
	let key = x + ',' + y;
	if(key in Game.data){console.log(key);return Game.data[key] == 0;}
	return false;
}

Game.fov = new ROT.FOV.PreciseShadowcasting(lightPasses);

Game.shadowCast = function(){
	Game.fov.compute(this.player._x,this.player._y,3,function(x,y,r,visibility){
	let ch = (r?':':'@');
	let color = (Game.data[x+','+y]? '#aa0':'#660');

	Game._display.draw(x,y,ch,'#fff',color);
	})
}

export {lightPasses}