import "../Modal/modal.css";

export default function Modal({ setIsOpen, isOpen, recipe }) {
  return (
    <div className="modal">
      <div className="overlay" onClick={() => setIsOpen(!isOpen)}></div>
      <div className="modal-content">
        <button className="close-btn" onClick={() => setIsOpen(!isOpen)}>
          ✖
        </button>
        <h2>{recipe.name}</h2>
        <p>{recipe.instruction}</p>
      </div>
    </div>
  );
}
