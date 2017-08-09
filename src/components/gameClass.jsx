import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ROT from '../../vendor/rot.js';  
import Game from '../assets/game';
import {test} from '../assets/test';


class GameClass extends Component{
	componentDidMount(){
	if(!ROT.isSupported()){
			console.log('rot not supported')
	}else{
			console.log('rot supported')
			Game.init()
			const gameDiv = document.getElementById('game');
			gameDiv.appendChild(Game.getDisplay().getContainer())
			//Game.getDisplay().draw(5,4,'@')
		}
	}
	render(){
	//console.log(Game)
		return(
			<div id='game'>
			<ul>
				<li>Health:</li>
				<li>Level:</li>
				<li>XP:</li>
				<li>Weapon:</li>
				<li>Attack:</li>
			</ul>
			</div>
		)
	}
}

export default GameClass;