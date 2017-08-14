import ROT from '../../vendor/rot.js';  


let Game ={
	_display:null,
	player:null,
	engine:null,
	map:{},
	width :100,
	height : 35,
	health : 40,
	level:0,
	xp: 0,
	weapon: 'fist',
	attack: 10,
	hItems:[],
	
	init:function(){
		this._generateMap()
		this._engine()
		console.log(this.map)
	},
	getDisplay:function(){
		return this._display;
	}
}

export default Game;