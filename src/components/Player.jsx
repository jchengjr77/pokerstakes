import React from "react";

const Player = (props) => {
  return (
    <div className="player-cont">
      <p> {props.info.name}, ${props.info.credit} </p>
    </div>
  );
};

export default Player;
