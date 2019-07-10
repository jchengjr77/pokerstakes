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
    this.setState({
      players: newPlayers
    });
  }

  componentWillMount() {
    this.createNewPlayer("Archit", 100);
    this.createNewPlayer("JJ", 100);
    console.log(this.state);
  }

  render() {
    return (
      <div id="counters-outer">
        <div className="counters-cont">
          <div id="Player 1" className="player-box">
            <Player info={this.state.players[0]} />
            <Button onClick={() => this.placeBet("Archit", 100)}>Bet</Button>
          </div>
          <div id="Player 2" className="player-box">
            <Player info={this.state.players[1]} />
            <Button onClick={() => this.placeBet("JJ", 100)}>Bet</Button>
          </div>
        </div>
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
