import React, {Component} from 'react';
import ReactDOM from 'react-dom';  
import ROT from '../../vendor/rot.js';


let GameObj ={
	_display:null,
	init:function(){
		this._display = new ROT.Display({width:80,height:24});
	},
	getDisplay:function(){
		return this._display;
	}
}

class Game extends Component{
	componentDidMount(){
	if(!ROT.isSupported()){
			console.log('rot not supported')
		}else{
			console.log('rot supported')
			GameObj.init()
			document.body.appendChild(GameObj.getDisplay().getContainer())
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