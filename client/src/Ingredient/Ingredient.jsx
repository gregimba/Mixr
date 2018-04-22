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

    this.getIngredient = this.getIngredient.bind(this);
    this.getLikedIngredient = this.getLikedIngredient.bind(this);
  }

  componentDidMount() {
    this.getIngredient();
    this.getLikedIngredient();
  }

  getIngredient() {
    axios
      .get(`http://localhost:3000/user/${1}/randomIngredient`)
      .then(res => {
        console.log('===', res);
        this.setState({
          currentIngredient: res.data
        });
      })
      .catch(err => {
        console.log('Error: error retrieving ingredients', err);
      });
  }

  getLikedIngredient() {
    axios.get(`http://localhost:3000/user/${1}/ingredients`).then(res => {
      console.log('----', res);
      this.setState({
        likedIngredients: res.data
      });
    });
  }

  addLikedIngredient() {
    axios.post(`http://localhost:3000/user/${1}/ingredients/${1}`);
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
    this.getIngredient();
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
          <button className="button" onClick={() => this.handleDislikeButton()}>
            DISLIKE
          </button>
        </div>
      </div>
    );
  }
}

export default Ingredient;
