import React, { useState } from "react";
import Player from "./Player.jsx";
import Card from "./Card.jsx";
export default function Game() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };
  const handlePlayerHandStart = (hand) => {
    setPlayerHand(hand);
  };

  return (
    <div>
      <button onClick={startGame}>Play game</button>
      <Player onHandStart={handlePlayerHandStart} />
    </div>
  );
}
