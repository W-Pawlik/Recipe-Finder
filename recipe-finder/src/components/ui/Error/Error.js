import Button from "../Button";
import "./error.css";

export default function Error({ error }) {
  return (
    <div className="error">
      {!error.toLowerCase().startsWith("recipe") ? (
        <>
          <p>🛑 Error 🛑</p>
          <p className="error-message">{error}</p>
          <p className="error-img">❌</p>
        </>
      ) : (
        <>
          <p className="error-message">🥙😢 {error} 😢🥘</p>
          <Button className={"error-btn"}>Create your own recipe! ✍</Button>
        </>
      )}
    </div>
  );
}
