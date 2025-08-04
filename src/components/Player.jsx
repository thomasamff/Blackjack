import React, { useEffect, useState } from "react";
import { makeCard } from "../utils/cardUtils.js";
import Card from "./Card.jsx";

export default function Player({onHandStart}) {
  const [cards, setCards] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    let total = 0;
    let aceCount = 0;
    let aceValue = 0;
    for (const card of cards) {
      total += card.value;
      if (card.value === 1) aceCount++;

      if (aceCount > 0) {
        aceValue = total + 10;
      }
    }
    aceValue < 21 && aceCount > 0
      ? setTotalValue(total + "," + aceValue)
      : aceValue === 21
      ? setTotalValue(21)
      : setTotalValue(total);
  }, [cards]);


  const startHand = () => {
    const newCards = [makeCard(), makeCard()];
    setCards(newCards);
    if (onHandStart) onHandStart(cards);
  }

  function addCardToHand() {
    const newCard = makeCard();
    setCards([...cards, newCard]);
  }

  return (
    <div>
      <h2>Player's Hand</h2>
      <button onClick={startHand}>Start Hand</button>
      <div>Total Value: {totalValue}</div>
      <button onClick={() => addCardToHand()}>Add</button>

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
