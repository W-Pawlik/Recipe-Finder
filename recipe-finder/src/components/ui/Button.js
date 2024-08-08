const btnStyle = {
  border: "none",
  backgroundColor: "transparent",
  color: "rgb(148, 100, 10)",
  cursor: "pointer",
};

export default function Button({ children, className, onClick }) {
  return (
    <button className={className} onClick={onClick} style={btnStyle}>
      {children}
    </button>
  );
}
