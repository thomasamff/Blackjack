import React, { useEffect, useState } from "react";
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

  return (
    <div>
      <h2>Dealer's Hand</h2>
      <div>Total Value: {totalValue}</div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {cards.map((card) => {
          return (
            <Card
              id={card.id}
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
