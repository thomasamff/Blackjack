import React, { useState } from "react";
import { addCard } from "../utils/cardUtils.js";
import Card from "./Card.jsx";

export default function Dealer() {
    const [cards, setCards] = useState([]);


    return (
        <div>
            <h2>Dealer's Hand</h2>
            <button onClick={() => addCard(cards, setCards)}>Add</button>

            <div>
                {cards.map((card) => {
                return (
                    <Card
                        key={card.pos}
                        id={card.pos}
                        text={card.text}
                        value={card.value}
                    />
                );
            })}
            </div>
            
        </div>
    );
}