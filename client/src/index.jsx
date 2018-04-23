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
      currentIngredient: {},
      MatchedDrinks: [],
      currentDrink: {},
      userId: ''
    };

    this.getIngredient = this.getIngredient.bind(this);
  }

  componentDidMount() {
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
    axios
      .get(`http://localhost:3000/user/${this.state.userId}/randomIngredient`)
      .then(res => {
        this.setState({
          currentIngredient: res.data
        });
      })
      .catch(err => {
        console.log('Error: error retrieving ingredients', err);
      });
  }

  getLikedIngredient() {
    axios
      .get(`http://localhost:3000/user/${this.state.userId}/ingredients`)
      .then(res => {
        console.log(res);
        this.setState({
          likedIngredients: res.data
        });
      });
  }

  addLikedIngredient() {
    axios
      .post(
        `http://localhost:3000/user/${this.state.userId}/ingredients/${
          this.state.currentIngredient.id
        }`,
        {
          userId: `${1}`,
          ingredientId: `${1}`
        }
      )
      .then(res => {
        console.log('succesfully added');
      });
  }

  handleLikeButton() {
    this.addLikedIngredient();
    this.getLikedIngredient();
    this.getIngredient();
  }

  handleDislikeButton() {
    this.getIngredient();
  }

  handleExitButton() {
    this.setState({
      view: 'ingredient'
    });
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
      const { view, userId, currentIngredient } = this.state;
      if (view === 'ingredient') {
        return (
          <div className="ingredient-page">
            <Ingredient
              userId={userId}
              ingredient={currentIngredient}
              like={this.handleLikeButton.bind(this)}
              dislike={this.handleDislikeButton.bind(this)}
              getIngredient={this.getIngredient.bind(this)}
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
