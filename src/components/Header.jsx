import React, { Component } from "react";
import downarrow from "../assets/down-arrow.svg";

export class Header extends Component {
  render() {
    return (
      <div className="Header">
        <h1>Heads-Up Poker</h1>
        <p>Virtual Chips counter for games of poker. </p>
        <p>Ideal for when players are actually bored, underpaid interns.</p>
        <a href="#counters">
          <img src={downarrow} alt="Down Arrow" id="down-arrow-img" />
        </a>
      </div>
    );
  }
}

export default Header;
