import "./card.css"

export default function Card({ text, value, flipped }) {

  const classes = `card ${flipped ? "card-front" : "card-back"}`

  return (
    <div className={classes}>
      {flipped ? <h3>{text}</h3> : <h3></h3>} 
    </div>
  );
}
