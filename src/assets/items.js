import ROT from '../../vendor/rot.js';  
import Game from './game.js';

Game._generateHealthItems = function(freeCells){
	for(let i = 0; i < 5; i++){
		let index = Math.floor(ROT.RNG.getUniform()*freeCells.length);
		let key = freeCells.splice(index,1)[0];
		let parts = key.split(',');
		let x = parseInt(parts[0]);
		let y = parseInt(parts[1]);
		//console.log('key',key)
		this.hItems.push(key)
		console.log('x,y',x,y)
		//this.map[key]= 'h';
		this._display.draw(x,y,'h','#ccffcc')
	}
	console.log(this.hItems)
}