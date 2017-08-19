import ROT from '../../vendor/rot.js';  
import Game from './game.js';

Game._generateItems = function(freeCells,num,letter,arr,color){
	for(let i = 0; i < num; i++){
		let index = Math.floor(ROT.RNG.getUniform()*freeCells.length);
		let key = freeCells.splice(index,1)[0];
		let parts = key.split(',');
		let x = parseInt(parts[0]);
		let y = parseInt(parts[1]);
		//console.log('key',key)
		//arr.push(key)
		arr[key] = letter
		this._display.draw(x,y,letter,color)
	}
}