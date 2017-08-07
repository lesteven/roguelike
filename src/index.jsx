import React, {Component} from 'react';
import ReactDOM from 'react-dom';  
import Game from './components/game.jsx'; 

class App extends Component {

  render() {
    return (
      <div>
        <Game/>
      </div>
    );
  }

}

ReactDOM.render(  
	 <App />,
  document.getElementById('root')
);