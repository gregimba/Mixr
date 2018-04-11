import React, { Component } from 'react';
import './swipe.css';

class Swipe extends Component { 
  constructor(props) {
    super(props);

  }


  likeButton() {
    this.props.like();
  }

  dislikeButton() {
    this.props.dislike();
  }


  render(props) {
    return (
      <div className="buttonContainer">
          <button className="button" onClick={this.likeButton.bind(this)}>LIKE</button>
          <button className="button" onClick={this.dislikeButton.bind(this)}>DISLIKE</button>        
      </div>
    )
  }
}


export default Swipe;