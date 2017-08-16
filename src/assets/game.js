import ROT from '../../vendor/rot.js';  


let Game ={
	_display:null,
	player:null,
	boss:null,
	engine:null,
	map:{},
	width :100,
	height : 38,
	health : 40,
	level:0,
	xp: 0,
	weapon: 'Fist',
	attack: 10,
	hItems:[],
	newWeapon:[],
	monsters:[],
	boss:[],
	bossKey:null,
	
	init:function(){
		this._generateMap()
		this._engine()
	},
	getDisplay:function(){
		return this._display;
	}
}

export default Game;