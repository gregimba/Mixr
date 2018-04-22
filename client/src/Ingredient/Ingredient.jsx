import React, { Component } from 'react';
import axios from 'axios';
import './Ingredient.css';

class Ingredient extends Component {
  constructor() {
    super();

    this.state = {
      likedIngredients: [],
      currentIngredient: {}
      // userId: props.userID
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3000/user/${1}/randomIngredient`)
      .then(res => {
        console.log(res);
        this.setState({
          currentIngredient: res.data
        });
      })
      .catch(err => {
        console.log('Error: error retrieving ingredients', err);
      });
  }

  handleLikeButton() {
    // let likedIngredients = this.state.likedIngredients;
    // let currentIngredient = this.state.currentIngredient;
    // let ingredients = this.state.ingredients;
    // likedIngredients.push(currentIngredient);
    // this.getIngredient();
    // while (!likedIngredients.includes(randomIngredient)) {
    //   randomIngredient = this.getRandomIngredient(ingredients);
    //   this.setState({
    //     currentIngredient: randomIngredient
    //   });
    // }
  }

  handleDislikeButton() {
    // let likedIngredients = this.state.likedIngredients;
    // let currentIngredient = this.state.currentIngredient;
    // let ingredients = this.state.ingredients;
    // let randomIngredient = this.getRandomIngredient(ingredients);
    // while (!likedIngredients.includes(randomIngredient)) {
    //   randomIngredient = this.getRandomIngredient(ingredients);
    //   this.setState({
    //     currentIngredient: randomIngredient
    //   });
    // }
  }

  render() {
    console.log('props in chlid');
    return (
      <div className="ingredient-container">
        <div className="ingredient">
          <img
            className="ingredient-image"
            src={this.state.currentIngredient.image}
          />
          <div className="ingredient-name">
            {this.state.currentIngredient.name}
          </div>
        </div>
        <div className="buttonContainer">
          <button className="button">LIKE</button>
          <button className="button">DISLIKE</button>
        </div>
      </div>
    );
  }
}

export default Ingredient;
