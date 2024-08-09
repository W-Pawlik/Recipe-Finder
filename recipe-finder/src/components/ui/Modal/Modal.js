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
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
          perferendis suscipit officia recusandae, eveniet quaerat assumenda id
          fugit, dignissimos maxime non natus placeat illo iust
        </p>
      </div>
    </div>
  );
}
