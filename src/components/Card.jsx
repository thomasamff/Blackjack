export default function Card({ text, value, flipped }) {

  const front = {
    border: "1px solid #ccc",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    background: "#f5f5f5",
    width: "50px",
  };

  const back = {
    ...front,
    background: "repeating-linear-gradient(45deg, #444 0, #444 10px, #888 10px, #888 20px)",
    color: "transparent",
    padding: "10px"
  }


  return (
    <div style={flipped ? front : back}>
      {flipped ? <h3>{text}</h3> : <h3></h3>} 
    </div>
  );
}
