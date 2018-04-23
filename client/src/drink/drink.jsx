import React from 'react';
import './Drink.css';
import axios from 'axios';

class Drink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drink: false
    };
    this.getIngredients = this.getIngredients.bind(this);
  }

  componentWillMount() {
    this.getIngredients();
  }
  componentWillUpdate() {
    this.getIngredients();
  }

  getIngredients() {
    axios
      .get(`http://localhost:3000/drink/${this.props.drink.id}`)
      .then(res => {
        this.setState({ drink: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let list = <li> loading </li>;
    if (this.state.drink) {
      list = [];
      for (let ing in this.state.drink.ingredients) {
        list.push(this.state.drink.ingredients[ing]);
      }
      list = list.map(ing => {
        return <li>{ing}</li>;
      });
    }

    return (
      <div className="drink-page">
        <span className="exit-button" onClick={this.props.handleClick}>
        &times;
        </span>
        <div className="drink-image">
          <img
            className="drink-object"
            src={`http://assets.absolutdrinks.com/drinks/400x400/${
              this.props.drink.strId
            }.png`}
          />
        </div>
        <div className="drink-title">{this.props.drink.name}</div>
        <div className="drink-instruction-title">Glass Type:</div>
        <div className="drink-glass">{this.props.drink.glass}</div>
        <div className="drink-instruction-title">Ingredients:</div>
        <ul className="drink-ingredients">{list}</ul>
        <div className="drink-instruction-title">Preparation: </div>
        <div className="drink-instruction">{this.props.drink.instruction}</div>
      </div>
    );
  }
}

export default Drink;
