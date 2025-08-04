import React, { useEffect, useState } from "react";
import { addCard } from "../utils/cardUtils.js";
import Card from "./Card.jsx";

export default function Dealer() {
  const [cards, setCards] = useState([]);
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

  function playHand() {
    const hand = [...cards];
    if (hand[1]) hand[1].flipped = true;
    setCards(hand);

    setTimeout(() => {
      
      const calcTotal = () => {

      }

     
    }, 100);

    while (totalValue < 17) {
      addCard(cards, setCards);
    }
  }

  return (
    <div>
      <h2>Dealer's Hand</h2>
      <div>Total Value: {totalValue}</div>
      <button onClick={() => addCard(cards, setCards)}>Add</button>
      <button onClick={() => playHand()}>Play Hand</button>
      <div>
        {cards.map((card) => {
          return (
            <Card
              text={card.text}
              value={card.value}
              flipped={card.flipped}
            />
          );
        })}
      </div>
    </div>
  );
}
