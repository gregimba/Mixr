import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Main from './main/main';
import Drink from './drink/drink';
import Match from './match/match';
import Sidebar from './sidebar/sidebar';
import Swipe from './swipe/swipe';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      currentIndredient = {},
      drinks = [],
    }

  }

  getRandomIngredient(ingredients) {
    let indregient = ingredients[Math.floor(Math.random() * ingredients.length)]
    return indregient;
  }

  handleLikeButton() {
    //push the matched drink into the drinks array in the state
    this.setState({
      currentIndredient: getRandomIngredient(this.state.ingredients)
    })
  }

  handleDislikeButton() {
    this.setState({
      currentIndredient: getRandomIngredient(this.state.ingredients)
    })
  }


  render(props) {
    return (
      <div className="App">
        <div className="main_swipe">
          <img />
          <Main ingredient={this.state.currentIndredient.name}/>
        </div>
        <div className="like-function">
          <Swipe like={this.handleLikeButton.bind(this)} dislike={this.handleDislikeButton.bind(this)} />
        </div>
        <div className="drinkpage"></div>
        <div className="sidebar">
          <Sidebar drinks={this.state.drinks}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
