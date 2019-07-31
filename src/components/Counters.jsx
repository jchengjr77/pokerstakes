import React, { Component } from "react";
import { Button } from "reactstrap";
import Player from "./Player.jsx";

class PlayerInfo {
  constructor(name, credit = 0) {
    this.name = name;
    this.credit = credit;
  }
}

class Counters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPlayers: 0,
      potVal: 0,
      players: []
    };
  }

  createNewPlayer(playerName, startCredit) {
    const newGuy = new PlayerInfo(playerName, startCredit);
    const newNumPlayers = this.state.numPlayers + 1;
    const newPlayers = this.state.players;
    newPlayers.push(newGuy);
    console.log(newGuy, newNumPlayers, newPlayers);
    this.setState({
      numPlayers: newNumPlayers,
      players: newPlayers
    });
  }

  betStatus(playerName, bet) {
    let found = null;
    let BreakException = {};
    try {
      this.state.players.forEach(player => {
        if (player.name === playerName) {
          found = player;
          throw BreakException;
        }
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }

    if (found == null) return "playerNotFound";

    if (found.credit < bet) return "notEnoughCredit";

    return "validated";
  }

  placeBet(playerName, bet) {
    const status = this.betStatus(playerName, bet);
    if (status !== "validated") {
      alert("Invalid Bet: " + status);
      return;
    }

    let ind = -1;

    for (let i = 0; i < this.state.players.length; i++) {
      const curr = this.state.players[i];
      if (curr.name === playerName) {
        ind = i;
        break;
      }
    }
    console.log(ind);
    let newPlayers = this.state.players.slice(0);
    newPlayers[ind].credit -= bet;
    let newPot = this.state.potVal;
    newPot += bet;
    this.setState({
      potVal: newPot,
      players: newPlayers
    });
  }

  giveCredit(playerName, credit) {
    let ind = -1;

    for (let i = 0; i < this.state.players.length; i++) {
      const curr = this.state.players[i];
      if (curr.name === playerName) {
        ind = i;
        break;
      }
    }
    console.log(ind);
    if (ind >= -1) {
      let newPlayers = this.state.players.slice(0);
      newPlayers[ind].credit += credit;
      this.setState({
        players: newPlayers
      });
    }
  }

  winPot(playerName) {
    let ind = -1;

    for (let i = 0; i < this.state.players.length; i++) {
      const curr = this.state.players[i];
      if (curr.name === playerName) {
        ind = i;
        break;
      }
    }
    console.log(ind);
    if (ind >= -1) {
      let newPlayers = this.state.players.slice(0);
      newPlayers[ind].credit += this.state.potVal;
      this.setState({
        players: newPlayers,
        potVal: 0
      });
    }
  }

  resetPot() {
    this.setState({
      potVal: 0
    });
  }

  componentWillMount() {
    this.createNewPlayer("Player 1", 100);
    this.createNewPlayer("Player 2", 100);
    console.log(this.state);
  }

  render() {
    return (
      <div id="counters-outer">
        <h1 id="pot-display">Pot: {this.state.potVal}</h1>
        <Button
          className="win-pot-button"
          color="primary"
          onClick={() => this.winPot("Player 1")}
        >
          P1 Wins Pot
        </Button>
        <Button
          className="win-pot-button"
          color="primary"
          onClick={() => this.winPot("Player 2")}
        >
          P2 Wins Pot
        </Button>
        <div className="counters-cont" id="counters">
          <div id="Player 1" className="player-box">
            <Player info={this.state.players[0]} />
            <Button
              className="credit-button"
              color="secondary"
              onClick={() => this.placeBet("Player 1", 100)}
            >
              Bet: -100
            </Button>
            <Button
              className="credit-button"
              color="warning"
              onClick={() => this.giveCredit("Player 1", 100)}
            >
              Fill: +100
            </Button>
          </div>
          <div id="Player 2" className="player-box">
            <Player info={this.state.players[1]} />
            <Button
              className="credit-button"
              color="secondary"
              onClick={() => this.placeBet("Player 2", 100)}
            >
              Bet: -100
            </Button>
            <Button
              className="credit-button"
              color="warning"
              onClick={() => this.giveCredit("Player 2", 100)}
            >
              Fill: +100
            </Button>
          </div>
        </div>
        <Button onClick={() => this.resetPot()} color="danger" id="pot-reset">
          Reset Pot
        </Button>
        <div id="whitespace">
          <a
            href="https://jchengjr77.github.io/mysite/"
            target="_blank"
            rel="noopener noreferrer"
          >
            About JJ Cheng
          </a>

          {/* Credits for used assets */}

          <p id="credits">
            <div>
              Icons made by{" "}
              <a href="https://www.freepik.com/" title="Freepik">
                Freepik
              </a>{" "}
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>{" "}
              is licensed by{" "}
              <a
                href="http://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
              >
                CC 3.0 BY
              </a>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

export default Counters;
