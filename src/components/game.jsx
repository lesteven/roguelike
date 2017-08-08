import React, {Component} from 'react';
import ReactDOM from 'react-dom';  
import ROT from '../../vendor/rot.js';


let GameObj ={
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

GameObj.init()
document.body.appendChild(GameObj.getDisplay().getContainer())
class Game extends Component{
	componentDidMount(){
	if(!ROT.isSupported()){
			console.log('rot not supported')
		}else{
			console.log('rot supported')
		}
	}
	render(){
		return(
			<div>
			Game
			</div>
		)
	}
}

export default Game;