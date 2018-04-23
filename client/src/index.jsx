import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Ingredient from './Ingredient/Ingredient';
import Drink from './Drink/Drink';
import Sidebar from './Sidebar/Sidebar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'ingredient',
      currentIngredient: {},
      matchedDrinks: [],
      currentDrink: {},
      userId: '',
    };

    this.getIngredient = this.getIngredient.bind(this);
    this.handleLikeButton = this.handleLikeButton.bind(this);
    this.handleDislikeButton = this.handleDislikeButton.bind(this);
    this.getIngredient = this.getIngredient.bind(this);
    this.handleExitButton = this.handleExitButton.bind(this);
    this.changeView = this.changeView.bind(this);

    axios.get('http://localhost:3000/session')
      .then((res) => {
        axios.get(`http://localhost:3000/user/${res.data.id}/drinks`)
          .then((data) => {
            this.setState(
              {
                userId: res.data.id,
                matchedDrinks: data.data,
              },
              this.getIngredient,
            );
          });
      });
  }

  getIngredient() {
    axios.get(`http://localhost:3000/user/${this.state.userId}/randomIngredient`)
      .then((res) => {
        this.setState({
          currentIngredient: res.data,
        });
      })
      .catch((err) => {
        console.log('Error: error retrieving ingredients', err);
      });
  }

  addLikedIngredient() {
    axios.post(`http://localhost:3000/user/${this.state.userId}
               /ingredients/${this.state.currentIngredient.id}`)
      .then((res) => {
        const { matchedDrinks } = this.state;
        res.data.forEach(drink => matchedDrinks.unshift(drink));
        this.setState({
          matchedDrinks,
        });
      });
  }

  handleLikeButton() {
    this.addLikedIngredient();
    this.getIngredient();
  }

  handleDislikeButton() {
    this.getIngredient();
  }

  handleExitButton() {
    this.setState({
      view: 'ingredient',
    });
  }

  changeView(option, target) {
    this.setState({
      view: option,
      currentDrink: target,
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
              like={this.handleLikeButton}
              dislike={this.handleDislikeButton}
              getIngredient={this.getIngredient}
            />
          </div>
        );
      } else if (view === 'drink') {
        return (
          <div className="drink-page">
            <Drink
              drink={this.state.currentDrink}
              exit={this.handleExitButton}
              handleClick={() => this.handleExitButton()}
            />
          </div>
        );
      } else {
        return <p>Error in conditional render, check this.state.view</p>;
      }
    };

    return (
      <div className="App">
        <div className="sidebar">
          <Sidebar
            drinks={this.state.matchedDrinks}
            handleClick={this.changeView}
          />
        </div>
        <div className="main" />
        {renderView()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
