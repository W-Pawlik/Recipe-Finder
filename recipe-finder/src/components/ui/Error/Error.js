import Button from "../Button";
import "./error.css";
import RecipeNotFound from "../../../imgs/recipe-not-found.png";

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
        <div className="not-found">
          <img
            src={RecipeNotFound}
            alt="Recipe not found"
            style={{ width: "40rem" }}
          />
          <Button className={"error-btn"}>Create your own recipe! ✍</Button>
        </div>
      )}
    </div>
  );
}
