import React, { useEffect, useState } from "react";
import { makeCard } from "../utils/cardUtils.js";
import Card from "./Card.jsx";

export default function Dealer({ cards, setCards }) {
  const [totalValue, setTotalValue] = useState(0);
  
  useEffect(() => {
    let total = 0;
    let aceCount = 0;
    let aceValue = 0;
    for (const card of cards) {
      if (card.flipped === true) {
        total += card.value;
        if (card.value === 1) aceCount++;

        if (aceCount > 0) {
          aceValue = total + 10;
        }
      }
    }
    aceValue < 21 && aceCount > 0
      ? setTotalValue(total + "," + aceValue)
      : aceValue === 21
      ? setTotalValue(21)
      : setTotalValue(total);
  }, [cards]);

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function playHand() {
    const flipCards = cards.map((card, index) => {
      if (index === 1) return { ...card, flipped: true };
      return card;
    });
    setCards(flipCards);
    dealerHit(flipCards);
  }

  async function dealerHit(initialCards) {
    let dealerHand = [...initialCards];
    while (calculateValue(dealerHand) < 17) {
      await delay(500);
      dealerHand = [...dealerHand, makeCard(dealerHand.length)];
      setCards(dealerHand);
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
      <h2>Dealer's Hand</h2>
      <div>Total Value: {totalValue}</div>
      <button onClick={() => playHand()}>Stay</button>

      <div>
        {cards.map((card) => {
          return (
            <Card text={card.text} value={card.value} flipped={card.flipped} />
          );
        })}
      </div>
    </div>
  );
}
