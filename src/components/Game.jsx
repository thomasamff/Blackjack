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

  // play game button - starts the game
  const startGame = () => {
    setGameStarted(false);
    setPlayButton(false);
    setResult("");
    // Reset hands
    setPlayerHand([]);
    setDealerHand([]);

    dealCards();
  };

  // reset button - resets game
  const resetGame = () => {
    setGameStarted(false);
    setPlayButton(true);
    setPlayerHand([]);
    setDealerHand([]);
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

    // player has blackjack
    if (calculateValue(playerHand) === 21) {
      const flipCards = dealerHand.map((card, index) => {
        if (index === 1) return { ...card, flipped: true };
        return card;
      });
      setDealerHand(flipCards);
      setResult("You win! Blackjack!");
    }
    // TODO: insurance option if dealer's first card shows ace
    // dealer has blackjack
    if (calculateValue(dealerHand) === 21) {
      const flipCards = dealerHand.map((card, index) => {
        if (index === 1) return { ...card, flipped: true };
        return card;
      });
      setDealerHand(flipCards);
      setResult("Dealer has blackjack! You lose!");
      setGameStarted(false);
      setPlayButton(true);
      return;
    }

    setGameStarted(true);
  }

  // updates the result state
  useEffect(() => {}, [setResult]);

  // plays dealer's hand when player stands
  function playDealerHand(val) {
    const flipCards = dealerHand.map((card, index) => {
      if (index === 1) return { ...card, flipped: true };
      return card;
    });
    setDealerHand(flipCards);

    if (val > 21) {
      setResult("You bust! Dealer wins!");
      setGameStarted(false);
      setPlayButton(true);
      return;
    }

    dealerHit(flipCards, val);
  }

  // helper function that performs dealer's turn - determines result
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
      setResult("You win! Dealer busts!");
    } else if (dealerVal === playerVal) {
      setResult("It's a push!");
    } else if (dealerVal > playerVal) {
      setResult("Dealer wins!");
    } else {
      setResult("You win!");
    }

    setPlayButton(true);
  }

  // calculate total of given hand
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
    <div className="game-area">
      <div className="game-buttons">
        <button disabled={!playButton} onClick={startGame}>
          Play game
        </button>
        <button onClick={resetGame}>Reset</button>
      </div>

      <Dealer cards={dealerHand} />
      <Player
        cards={playerHand}
        setCards={setPlayerHand}
        canAdd={gameStarted}
        setCanAdd={setGameStarted}
        stand={playDealerHand}
      />
      {result && <h2 className="result">Result: {result}</h2>}
    </div>
  );
}
