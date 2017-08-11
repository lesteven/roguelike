import ROT from '../../vendor/rot.js';  


let Game ={
	_display:null,
	player:null,
	engine:null,
	map:{},
	width :100,
	height : 35,
	
	init:function(){
		this._generateMap()
		this._engine()
		//console.log(Object.getPrototypeOf(this.player))
	},
	getDisplay:function(){
		return this._display;
	}
}

export default Game;