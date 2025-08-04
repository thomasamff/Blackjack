import React, { useState } from "react";
import Player from "./Player.jsx";
import Dealer from "./Dealer.jsx";



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

  const handleDealerHandStart = (hand) => {
    setDealerHand(hand);
  }

  return (
    <div>
      <button onClick={startGame}>Play game</button>
      <Player onHandStart={handlePlayerHandStart} />
      <Dealer onHandStart={handleDealerHandStart}/>
    </div>
  );
}
