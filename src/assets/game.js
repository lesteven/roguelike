import ROT from '../../vendor/rot.js';  

let Game ={
	_display:null,
	width :80,
	height : 24,
	init:function(){
		let map = new ROT.Map.Rogue(this.width,this.height);
		this._display = new ROT.Display({width:this.width,height:this.height});
		//this._display.getContainer()
		map.create(this._display.DEBUG)
		console.log(map)

	},
	getDisplay:function(){
		return this._display;
	}
}

export default Game;