import React, { useEffect, useState } from "react";
import Player from "./Player.jsx";
import Dealer from "./Dealer.jsx";
import { makeCard } from "../utils/Card.js";

export default function Game() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [playButton, setPlayButton] = useState(true);
  const [result, setResult] = useState("");
  const [bj, setBj] = useState(false);
  const [bal, setBal] = useState(100);
  const [bet, setBet] = useState(0);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // play game button - starts the game
  const startGame = () => {
    const bet = Number(document.getElementById("bet-amount").value);

    if (bet <= bal) {
      setGameStarted(false);
      setPlayButton(false);
      setResult("");
      setBj(false);
      // Reset hands
      setPlayerHand([]);
      setDealerHand([]);

      setBet(bet);
      setBal(bal - bet);
      dealCards();
    }
  };

  // reset button - resets game
  const resetGame = () => {
    setBj(false);
    setGameStarted(false);
    setPlayButton(true);
    setResult("");
    setPlayerHand([]);
    setDealerHand([]);
    document.getElementById("bet-amount").value = "";
    setBet(0);
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
      setResult(`Player BJ | +${bet * 2.5}`);
      setBal(bal + bet * 1.5);
      setGameStarted(false);
      setPlayButton(true);
      setBj(true);
      return;
    } else if (calculateValue(dealerHand) === 21) {
      // TODO: insurance option if dealer's first card shows ace
      // dealer has blackjack
      const flipCards = dealerHand.map((card, index) => {
        if (index === 1) return { ...card, flipped: true };
        return card;
      });
      setDealerHand(flipCards);
      setResult(`Dealer BJ | -${bet}`);
      setGameStarted(false);
      setPlayButton(true);
      return;
    } else {
      setGameStarted(true);
    }
  }

  // updates the result state
  useEffect(() => {}, [setResult]);

  useEffect(() => {}, [setBal, setBet]);

  // plays dealer's hand when player stands
  function playDealerHand(val) {
    const flipCards = dealerHand.map((card, index) => {
      if (index === 1) return { ...card, flipped: true };
      return card;
    });
    setDealerHand(flipCards);

    if (val > 21) {
      setResult(`Player Bust | -$${bet}`);
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
      setResult(`Dealer Bust | +$${bet}`);
      setBal(bal + bet * 2);
    } else if (dealerVal === playerVal) {
      setResult("Dealer Push| +$0");
      setBal(bal + bet);
    } else if (dealerVal > playerVal) {
      setResult(`Dealer Win | -$${bet}`);
    } else {
      setResult(`Player Win | +$${bet}`);
      setBal(bal + bet * 2);
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

  const performMulti = (multi) => {
    let bet = Number(document.getElementById("bet-amount").value);
    if (bet > 0) {
      if (bet * multi > bal) {
        bet = bal;
        setBet(bet);
      } else {
        bet *= multi;
        setBet(bet);
      }
      document.getElementById("bet-amount").value = `${bet}`;
    }
  };

  return (
    <div className="game-area">
      <div className="player-actions">
        <div className="game-buttons">
          <button disabled={!playButton} onClick={startGame}>
            Play game
          </button>
          <button onClick={resetGame}>Reset</button>
        </div>
      </div>
      <div className="money">
        <h3>Balance: ${bal}</h3>
        <div className="betting-input">
          <input
            className="bet"
            id="bet-amount"
            disabled={!playButton}
            type="number"
            placeholder="Bet Amount"
          />
          <button
            className="multi"
            disabled={!playButton}
            onClick={() => performMulti(2)}
          >
            2x
          </button>
          <button
            className="multi"
            disabled={!playButton}
            onClick={() => performMulti(0.5)}
          >
            0.5x
          </button>
        </div>
      </div>
      <Dealer cards={dealerHand} />
      <Player
        cards={playerHand}
        setCards={setPlayerHand}
        canAdd={gameStarted}
        setCanAdd={setGameStarted}
        stand={playDealerHand}
        bj={bj}
      />
      {result && <h2 className="result">Result: {result}</h2>}
    </div>
  );
}
