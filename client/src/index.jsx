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
      view: 'ingredient',
      // likedIngredients: [],
      // currentIngredient: {},
      MatchedDrinks: [],
      currentDrink: {},
      userId: ''
    };

    // this.getIngredient = this.getIngredient.bind(this);
  }

  componentWillMount() {
    axios.get(`http://localhost:3000/session`).then(res => {
      console.log(res.data.id);
      this.setState(
        {
          userId: res.data.id
        }
        // this.getIngredient
      );
    });
  }

  // getIngredient() {
  //   axios
  //     .get(`http://localhost:3000/user/${this.state.userId}/randomIngredient`)
  //     .then(res => {
  //       console.log(res);
  //       this.setState({
  //         currentIngredient: res.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log('Error: error retrieving ingredients', err);
  //     });
  // }

  // handleLikeButton() {
  //   let likedIngredients = this.state.likedIngredients;
  //   let currentIngredient = this.state.currentIngredient;
  //   let ingredients = this.state.ingredients;
  //   likedIngredients.push(currentIngredient);
  //   this.getIngredient();
  //   while (!likedIngredients.includes(randomIngredient)) {
  //     randomIngredient = this.getRandomIngredient(ingredients);
  //     this.setState({
  //       currentIngredient: randomIngredient
  //     });
  //   }
  // }

  // handleDislikeButton() {
  //   let likedIngredients = this.state.likedIngredients;
  //   let currentIngredient = this.state.currentIngredient;
  //   let ingredients = this.state.ingredients;
  //   let randomIngredient = this.getRandomIngredient(ingredients);
  //   while (!likedIngredients.includes(randomIngredient)) {
  //     randomIngredient = this.getRandomIngredient(ingredients);
  //     this.setState({
  //       currentIngredient: randomIngredient
  //     });
  //   }
  // }

  handleExitButton() {
    this.setState(
      {
        view: 'ingredient'
      }
      // this.getIngredient
    );
  }

  changeView(option, target) {
    let MatchedDrinks = this.state.MatchedDrinks;
    this.setState({
      view: option,
      currentDrink: MatchedDrinks[MatchedDrinks.indexOf(target)]
    });
  }

  render() {
    const renderView = () => {
      const { view, userId } = this.state;
      if (view === 'ingredient') {
        return (
          <div className="ingredient-page">
            <Ingredient
              userId={userId}
              // ingredient={currentIngredient}
              // like={this.handleLikeButton.bind(this)}
              // dislike={this.handleDislikeButton.bind(this)}
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
    };

    return (
      <div className="App">
        <div className="sidebar">
          <Sidebar
            drinks={this.state.MatchedDrinks}
            handleClick={this.changeView.bind(this)}
          />
        </div>
        <div className="main" />
        {renderView()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
