import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Ingredient from './Ingredient/Ingredient';
import Drink from './Drink/Drink';
// import DrinkListEntry from './DrinkListEntry/DrinkListEntry';
import Sidebar from './sidebar/sidebar.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'ingredient',
      currentIngredient: {},
      matchedDrinks: [],
      currentDrink: {},
      userId: ''
    };

    this.getIngredient = this.getIngredient.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:3000/session`).then(res => {
      axios.get(`http://localhost:3000/user/${res.data.id}/drinks`).then(data => {
        this.setState(
          {
            userId: res.data.id,
            matchedDrinks: data.data
          },
          this.getIngredient
        );
      });
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
        }`
      )
      .then(res => {
        console.log('succesfully added');
        const matchedDrinks = this.state.matchedDrinks.concat(res.data);
        this.setState(
          {
            matchedDrinks
          }
        )
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
    this.setState({
      view: option,
      currentDrink: target
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
