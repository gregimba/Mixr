import React from 'react';
import './Drink.css';
import axios from 'axios';

class Drink extends React.Component {
  constructor(props) {
    super(props);
    this.getIngredients = this.getIngredients.bind(this);
  }

  componentWillMount() {
    this.getIngredients();
  }
  componentDidUpdate() {
    this.getIngredients();
  }

  getIngredients() {
    axios
      .get(`http://localhost:3000/drink/${this.props.drink.id}`)
      .then(res => {
        console.log(res.data.ingredients);
        if (res.data.id === this.props.drink.id) {
        } else {
          this.setState({ ingredients: res.data.ingredients });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if(this.props.ingredients !== undefined){
      console.log(this.props.ingredients);
    }
    return (
      <div className="drink-page">
        <div className="drink-image">
          <img
            className="drink-object"
            src={`http://assets.absolutdrinks.com/drinks/400x400/${
              this.props.drink.strId
            }.png`}
          />
        </div>
        <div className="drink-title">{this.props.drink.name}</div>
        <div className="drink-instruction">{this.props.drink.instruction}</div>
        <div className="drink-ingredients">
          {'drink ingredient goes here...'}
        </div>
        <div className="drink-glass">{this.props.drink.glass}</div>
        <span className="exit-button" onClick={this.props.handleClick}>
          &times;
        </span>
      </div>
    );
  }
}

export default Drink;
