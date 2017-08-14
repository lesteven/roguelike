import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ROT from '../../vendor/rot.js';  
import Game from '../assets/game';
import {_createPlayer,_engine} from '../assets/player';
import {_generateMap,_drawWholeMap} from '../assets/map';
import {_generateHealthItems} from '../assets/items';


class GameClass extends Component{
	componentDidMount(){
	if(!ROT.isSupported()){
			console.log('rot not supported')
	}else{
			console.log('rot supported')
			Game.init()
			const gameDiv = document.getElementById('game');
			gameDiv.appendChild(Game.getDisplay().getContainer())
			//console.log(Game.map)
		}
	}
	render(){
	//console.log(Game)
		return(
			<div id='game'>
			</div>
		)
	}
}

export default GameClass;