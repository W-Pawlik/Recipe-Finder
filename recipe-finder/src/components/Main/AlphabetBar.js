export default function AlphabetBar({ setQuerryLetter, setQuery }) {
  function handleSearchRecipe(letter) {
    setQuerryLetter(letter);
    setQuery("");
  }

  const alphabet = Array.from({ length: 26 }, (_, i) => {
    return String.fromCharCode(97 + i);
  });

  return (
    <div className="alphabet-container">
      {alphabet.map((letter, i) => {
        return (
          <p
            key={i}
            className="letter"
            onClick={() => handleSearchRecipe(letter)}
          >
            {letter.toUpperCase()} /
          </p>
        );
      })}
    </div>
  );
}
