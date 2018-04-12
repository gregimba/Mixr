import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Ingredient from './Ingredient/Ingredient';
import Drink from './Drink/Drink';
import DrinkListEntry from './DrinkListEntry/DrinkListEntry';
import Sidebar from './Sidebar/Sidebar';
import Button from './Button/Button';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      currentIndredient = {},
      drinks = [],
    }

  }

  // getRandomIngredient(ingredients) {
  //   let indregient = ingredients[Math.floor(Math.random() * ingredients.length)]
  //   return indregient;
  // }

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
        <div className="ingredient-page">
          <img />
          <Ingredient ingredient={this.state.currentIndredient.name}/>
        </div>
        <div className="button-function">
          <Button like={this.handleLikeButton.bind(this)} dislike={this.handleDislikeButton.bind(this)} />
        </div>
        <div className="drink-page"></div>
          <Drink />
        <div className="sidebar">
          <Sidebar drinks={this.state.drinks}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
