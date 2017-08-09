import React, {Component} from 'react';
import ReactDOM from 'react-dom';  
import GameClass from './components/gameClass.jsx'; 

class App extends Component {

  render() {
    return (
      <div>
        <GameClass/>
      </div>
    );
  }

}

ReactDOM.render(  
	 <App />,
  document.getElementById('root')
);