import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Ingredient from './Ingredient/Ingredient';
import Drink from './Drink/Drink';
// import DrinkListEntry from './DrinkListEntry/DrinkListEntry';
import Sidebar from './Sidebar/Sidebar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'ingredisent',
      ingredients: ['oj', 'milk', 'water', 'coke', 'beer', 'sprite'],
      likedIngredients: [],
      currentIndredient: {},
      // MatchedDrinks: [],
      MatchedDrinks: ['ultimate drink', 'awesome soda', 'nasty milkyWay'],
      currentDrink: {}
    };
  }

  componentDidMount() {
    axios
      .get('url goes here...')
      .then(res => {
        this.setState({
          // ingredients: res.data, //??
          currentIndredient: this.getRandomIngredient(this.state.ingredients)
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getRandomIngredient(ingredientList) {
    var ingredient =
      ingredientList[Math.floor(Math.random() * ingredientList.length)];
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
      });
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
      });
    }
  }

  handleExitButton() {
    this.setState({
      view: 'ingredient',
      currentIndredient: this.getRandomIngredient(this.state.ingredients)
    });
  }

  changeView(option, target) {
    let MatchedDrinks = this.state.MatchedDrinks;
    this.setState({
      view: option,
      currentDrink: MatchedDrinks[MatchedDrinks.indexOf(target)]
    });
  }

  renderView() {
    const { view } = this.state;
    if (view === 'ingredient') {
      return (
        <div className="ingredient-page">
          <img src={'images url goes here....'} />
          <Ingredient
            ingredient={this.state.currentIndredient.name}
            like={this.handleLikeButton.bind(this)}
            dislike={this.handleDislikeButton.bind(this)}
          />
        </div>
      );
    } else {
      return (
        <div className="drink-page">
          <Drink
            drink={this.state.currentDrink}
            exit={this.handleExitButton.bind(this)}
            handleClick={() => this.handleExitButton()}
          />
        </div>
      );
    }
  }

  render(props) {
    return (
      <div className="App">
        <div className="sidebar">
          {this.state.MatchedDrinks.map(drink => {
            return (
              <Sidebar drink={drink} handleClick={this.changeView.bind(this)} />
            );
          })}
        </div>
        <div className="main">{this.renderView()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
