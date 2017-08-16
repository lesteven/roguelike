import ROT from '../../vendor/rot.js';  
import Game from './game.js';

Game._winScreen = function(){
	if(this.health > 0 && !this.bossKey){
		this._display.clear()
		this._display.drawText(this.healthPos,this.height-3,'You Win!')
	}
}