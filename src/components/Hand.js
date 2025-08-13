import { Card, makeCard } from "../utils/Card.js";
import { calculateValue } from "./Game.jsx";

export class createHand {
    hand = [];
    currentVal;

    constructor(firstCard) {
        firstCard.changePosition(0);
        const secCard = makeCard(1);

        this.hand.push(firstCard);
        this.hand.push(secCard);

        this.currentVal = calculateValue(this.hand);
    }
    
    addCard() {
        let len = this.hand.length;
        const card = makeCard(len);

        this.hand.push(card);
    }

    setCurrVal(val) {
        this.currentVal = val;
    }

    getCurrVal() {
        return this.currentVal;
    }

}