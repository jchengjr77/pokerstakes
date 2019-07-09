import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <div className="Header">
          <h1>Poker Stakes</h1>
          <p>Virtual Chips counter for games of poker. </p>
          <p>Ideal for when players are actually bored, underpaid interns.</p>
      </div>
    );
  }
}

export default Header;
