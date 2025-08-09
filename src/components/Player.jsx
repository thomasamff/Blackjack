import React, { useEffect, useState } from "react";
import { makeCard } from "../utils/cardUtils.js";
import Card from "./Card.jsx";

export default function Player({
  cards,
  setCards,
  canAdd,
  setCanAdd,
  stand,
  bj,
}) {
  const [totalValue, setTotalValue] = useState(0);
  const [val, setVal] = useState(0);

  // calculates the total value of the cards
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

    if (aceValue < 21 && aceCount > 0) {
      setTotalValue(total + "," + aceValue);
      setVal(aceValue);
    } else {
      if (aceValue === 21) {
        setTotalValue(21);
        setVal(21);
      } else {
        setTotalValue(total);
        setVal(total);
      }
    }
  }, [cards]);

  // returns when busts
  useEffect(() => {
    if (val > 21) {
      setCanAdd(false);
      stand(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  // disable's options after getting 21
  useEffect(() => {
    if (val === 21 && !bj) {
      setCanAdd(false);
      stand(val);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [val]);

  // adds a new card to the player's hand
  function addCardToHand() {
    let n = cards.length;
    const newCard = makeCard(n);
    setCards([...cards, newCard]);
  }

  return (
    <div className="player-area">
      <h2>Player's Hand</h2>
      <div>Total Value: {totalValue}</div>
      <div className="player-actions">
        <div className="player-buttons">
          <button disabled={!canAdd} onClick={() => addCardToHand()}>
            Hit
          </button>
          <button
            disabled={!canAdd}
            onClick={() => {
              stand(val);
              setCanAdd(false);
            }}
          >
            Stand
          </button>
        </div>
      </div>

      <div className="card-container" id="player-cards">
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
