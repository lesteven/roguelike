import ROT from '../../vendor/rot.js';  


let Game ={
	_display:null,
	player:null,
	boss:null,
	engine:null,
	map:{},
	width :100,
	height : 38,
	health : 45,
	level:1,
	xp: 0,
	weapon: 'Fist',
	attack: 15,
	hItems:{},
	newWeapon:{},
	monsters:{},
	boss:[],
	bossKey:{},
	playerKey:null,
	sd: 2,
	shadowMap:{},
	
	init:function(){
		this._generateMap()
		this._engine()
	},
	getDisplay:function(){
		return this._display;
	}
}

export default Game;