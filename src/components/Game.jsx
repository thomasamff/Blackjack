import React, { useState } from "react";
import Player from "./Player.jsx";
import Dealer from "./Dealer.jsx";
import { makeCard } from "../utils/cardUtils.js";



export default function Game() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);


  const startGame = () => {
    setPlayerHand([]);
    setDealerHand([]);

    setPlayerHand([makeCard(), makeCard()]);

    const card = makeCard();
    card.flipped = false;
    setDealerHand([makeCard(), card]);

  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
  }

  return (
    <div>
      <button onClick={startGame}>Play game</button>
      <button onClick={resetGame}>Reset</button>
      <Player cards={playerHand} setCards={setPlayerHand}/>
      <Dealer cards={dealerHand} setCards={setDealerHand}/>

      
    </div>
  );
}
