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
  }

  const resetGame = () => {
    setGameStarted(false);
    setPlayButton(true);
    // Reset hands
    setPlayerHand([]);
    setDealerHand([]);

  };


  useEffect(()=>{

  },[setResult]);

  function playDealerHand(val) {
    

    const flipCards = dealerHand.map((card, index) => {
      if (index === 1) return { ...card, flipped: true };
      return card;
    });
    setDealerHand(flipCards);

    if (val === 21 && playerHand.length === 2) {
      setResult("Blackjack! You win!");
      setGameStarted(false);
      setPlayButton(true);
      return;
    }

    if (val > 21) {
      setResult("You bust! Dealer wins!");
      setGameStarted(false);
      setPlayButton(true);
      return;
    }
    
    dealerHit(flipCards, val);
  }

  async function dealerHit(initialCards, val) {
    let dealerHand = [...initialCards];
    while (calculateValue(dealerHand) < 17) {
      await delay(500);
      dealerHand = [...dealerHand, makeCard(dealerHand.length)];
      setDealerHand(dealerHand);
    }

    let dealerVal = calculateValue(dealerHand);
    let playerVal = val;
    if (dealerVal > 21) {
      setResult("Dealer busts! You win!");
    } else if (dealerVal === playerVal) {
      setResult("It's a push!");
    } else if (dealerVal > playerVal) {
      setResult("Dealer wins!");
    } else {
      setResult("You win!");
    }

    setPlayButton(true);
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
        stand={playDealerHand}
      />
      <Dealer cards={dealerHand} setCards={setDealerHand}  />


      {result && <h2>Result: {result}</h2>}
    </div>
  );
}
