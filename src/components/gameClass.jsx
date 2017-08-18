import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ROT from '../../vendor/rot.js';  
import Game from '../assets/game';
import {_createPlayer,_engine} from '../assets/player';
import {_generateMap,_drawWholeMap} from '../assets/map';
import {} from '../assets/items';
import {} from '../assets/screens';
import {} from '../assets/shadow';

class GameClass extends Component{
	componentDidMount(){
	if(!ROT.isSupported()){
			console.log('rot not supported')
	}else{
			console.log('rot supported')
			Game.init()
			const gameDiv = document.getElementById('game');
			gameDiv.appendChild(Game.getDisplay().getContainer());
			//Game._surrounding()
			
		}
	}
	render(){
		return(
			<div id='game'>
			</div>
		)
	}
}

export default GameClass;