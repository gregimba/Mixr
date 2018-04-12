import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
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
      likedIngredients: [],
      currentIndredient = {},
      MatchedDrinks = [], 
      currentDrink = {},
    }
  }

  componentDidMount() {
    axios.get('url goes here...').then(res => {
      this.setState({
        ingredients: res.data //??
      });
    }). catch(err => {
      console.log(err);
    })
  }

  getRandomIngredient(ingredientList) {
    var ingredient = ingredientList[Math.floor(Math.random() * ingredientList.length)];
    return ingredient;
  }

  handleLikeButton() {
    let likedIngredients = this.state.likedIngredients;
    let currentIndredient = this.state.currentIndredient;
    let ingredients = this.state.ingredients;
    likedIngredients.push(currentIndredient);
    
    let randomIngredient = this.getRandomIngredient(ingredients);

    while (!likedIngredients.includes(randomIngredient)) {
      randomIngredient = this.getRandomIngredient(ingredients);
      this.setState({
        currentIndredient: randomIngredient
      })
    }
  }

  handleDislikeButton() {
    let likedIngredients = this.state.likedIngredients;
    let currentIndredient = this.state.currentIndredient;
    let ingredients = this.state.ingredients;    
    let randomIngredient = this.getRandomIngredient(ingredients);
    while (!likedIngredients.includes(randomIngredient)) {
      randomIngredient = this.getRandomIngredient(ingredients);
      this.setState({
        currentIndredient: randomIngredient
      })
    }
  }

  handleExitButton() {
    
  }

  handleDrinkListEntryClick(target) {
    this.setState({
      currentDrink: target,
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
          <Drink drink={this.state.currentDrink} exit={this.handleExitButton.bind(this)}/>
        <div className="sidebar">
          <Sidebar drinks={this.state.drinks} click={this.handleDrinkListEntryClick.bind(this)}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
