import React from 'react';
import './Drink.css';

class Drink extends React.Component {
  render() {
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
