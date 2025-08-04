import React, { useEffect, useState } from "react";
import { makeCard } from "../utils/cardUtils.js";
import Card from "./Card.jsx";

export default function Player({ cards, setCards, gameState, stand }) {
  const [totalValue, setTotalValue] = useState(0);
  const canAdd = gameState;


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


  function addCardToHand() {
    let n = cards.length;
    const newCard = makeCard(n);
    setCards([...cards, newCard]);
  }

  return (
    <div>
      <h2>Player's Hand</h2>
      <div>Total Value: {totalValue}</div>
      <button disabled={!canAdd} onClick={() => addCardToHand()}>Hit</button>
      <button disabled={!canAdd} onClick={stand}>Stand</button>
      <div style = {{display: "flex", flexDirection: "row"}}>
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
