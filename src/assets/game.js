import ROT from '../../vendor/rot.js';  


let Game ={
	_display:null,
	width :100,
	height : 35,
	init:function(){
		this._generateMap()

	},
	getDisplay:function(){
		return this._display;
	}
}

export default Game;