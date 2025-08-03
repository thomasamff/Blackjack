export default function Card({ id, text, value}) {

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "10px 0",
        borderRadius: "8px",
        background: "#f5f5f5",
        width: "50px",
      }}
    >
      <h3>{text}</h3>

    </div>
  );
}
