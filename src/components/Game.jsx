import React, { useEffect, useState } from "react";
import Player from "./Player.jsx";
import Dealer from "./Dealer.jsx";
import { makeCard } from "../utils/cardUtils.js";

export default function Game() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playButton, setPlayButton] = useState(true);
  const [result, setResult] = useState("");

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const startGame = () => {
    setGameStarted(false);
    setPlayButton(false);
    setResult("");
    // Reset hands
    setPlayerHand([]);
    setDealerHand([]);
    
    dealCards();
   
  };

  // Deal cards with a delay
  async function dealCards() {
    let dealerHand = [];
    let playerHand = [];

    const card = makeCard(1);
    card.flipped = false;

    for (let i = 0; i < 4; i++) {
      await delay(500);
      if (i === 3) {
        dealerHand = [...dealerHand, card];
        setDealerHand(dealerHand);
      } else if (i % 2 === 0) {
        playerHand = [...playerHand, makeCard(playerHand.length)];
        setPlayerHand(playerHand);
      } else {
        dealerHand = [...dealerHand, makeCard(dealerHand.length)];
        setDealerHand(dealerHand);
      }
    }
    setGameStarted(true);
    console.log(gameStarted);
  }

  const resetGame = () => {
    setGameStarted(false);
    setPlayButton(true);
    // Reset hands
    setPlayerHand([]);
    setDealerHand([]);

  };

  function playerResult(val) {
    playDealerHand();
    if (val === 21) {
      setResult("WIN");
    } else if (val > 21) {
      setResult("BUST");
    } else {
      if (val === calculateValue(dealerHand)) {
        setResult("TIE");
      } else {
        setResult("WIN");
      }
    }
  }

  useEffect(()=>{

  },[setResult]);

  function playDealerHand() {
    const flipCards = dealerHand.map((card, index) => {
      if (index === 1) return { ...card, flipped: true };
      return card;
    });
    setDealerHand(flipCards);
    dealerHit(flipCards);
  }

  async function dealerHit(initialCards) {
    let dealerHand = [...initialCards];
    while (calculateValue(dealerHand) < 17) {
      await delay(500);
      dealerHand = [...dealerHand, makeCard(dealerHand.length)];
      setDealerHand(dealerHand);
    }

  }

  function calculateValue(cards) {
    let total = 0;
    let aceCount = 0;
    for (const card of cards) {
      if (card.flipped) {
        total += card.value;
        if (card.value === 1) aceCount++;
      }
    }

    return aceCount > 0 && total + 10 <= 21 ? total + 10 : total;
  }

  return (
    <div>
      <button disabled={!playButton} onClick={startGame}>Play game</button>
      <button onClick={resetGame}>Reset</button>
      <Player
        cards={playerHand}
        setCards={setPlayerHand}
        canAdd={gameStarted}
        setCanAdd={setGameStarted}
        stand={playerResult}
      />
      <Dealer cards={dealerHand} setCards={setDealerHand}  />


      {result && <h2>Result: {result}</h2>}
    </div>
  );
}
