import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Ingredient from './Ingredient/Ingredient';
import Drink from './Drink/Drink';
import DrinkListEntry from './DrinkListEntry/DrinkListEntry';
import Sidebar from './Sidebar/Sidebar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'ingredient',
      ingredients: [
        // {
        //   description:
        //     'Also called the Green Fairy – Absinthe is a highly alcoholic (up to 75%), anise flavored, type of spirit with an interesting history. The fluid is clear, until water is added: then it becomes milky and turbid.',
        //   isCarbonated: false,
        //   isAlcoholic: true,
        //   isBaseSpirit: false,
        //   isJuice: false,
        //   type: 'spirits-other',
        //   languageBranch: 'en',
        //   id: 'absinthe',
        //   name: 'Absinthe'
        // },
        // {
        //   description:
        //     'Do you want your drink a bit more intense? Try our super premium vodka Absolut 100.',
        //   isCarbonated: false,
        //   isAlcoholic: true,
        //   isBaseSpirit: true,
        //   isJuice: false,
        //   type: 'vodka',
        //   languageBranch: 'en',
        //   id: 'absolut-100',
        //   name: 'Absolut 100'
        // },
        // {
        //   description:
        //     'A vodka with a smooth taste, with a sophisticated character of peaches. Absolut Apeach is made from all natural ingredients.',
        //   isCarbonated: false,
        //   isAlcoholic: true,
        //   isBaseSpirit: true,
        //   isJuice: false,
        //   type: 'vodka',
        //   languageBranch: 'en',
        //   id: 'absolut-apeach',
        //   name: 'Absolut Apeach'
        // }
      ],
      likedIngredients: [],
      currentIndredient: {},
      MatchedDrinks: [],
      currentDrink: {},
      userId: ''
    };

    this.getIngredient = this.getIngredient.bind(this);
  }

  componentWillMount() {
    axios.get(`http://localhost:3000/session`).then(res => {
      this.setState(
        {
          userId: res.data.id
        },
        this.getIngredient
      );
    });
  }

  getIngredient() {
    console.log('here', this.state.userId);
    axios
      .get(`http://localhost:3000/user/${this.state.userId}/ingredients`)
      .then(res => {
        console.log(res);
        this.setState({
          ingredients: res.data,
          currentIndredient: this.getRandomIngredient(this.state.ingredients)
        });
      })
      .catch(err => {
        console.log('AXIOS: Got here--->', err);
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
      currentIndredient: this.getRandomIngredient(ingredients)
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
      return;
      <div className="ingredient-page">
        <img src={'images url goes here....'} />
        <Ingredient
          ingredient={this.state.currentIndredient}
          like={this.handleLikeButton.bind(this)}
          dislike={this.handleDislikeButton.bind(this)}
        />
      </div>;
    } else {
      return;
      <div className="drink-page">
        <Drink
          drink={this.state.currentDrink}
          exit={this.handleExitButton.bind(this)}
          handleClick={() => this.handleExitButton()}
        />
      </div>;
    }
  }

  render(props) {
    return (
      <div className="App">
        <div className="sidebar">
          <Sidebar
            drinks={this.state.MatchedDrinks}
            handleClick={this.changeView.bind(this)}
          />
        </div>
        <div className="main">{this.renderView()}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
