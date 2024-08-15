import { useEffect, useState } from "react";

export default function AlphabetBar({
  recipes,
  setRecipes,
  setError,
  setIsLoading,
}) {
  const [queryLetter, setQuerryLetter] = useState(null);

  function handleSearchRecipe(letter) {
    setQuerryLetter(letter);
  }

  useEffect(
    function () {
      async function fetchRecipeByLetter() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${queryLetter}`
          );

          if (!res.ok) throw new Error("Problem with fetching recipes");

          const data = await res.json();
          if (data.meals === null) throw new Error("Recipe not found");
          setRecipes(data.meals);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (queryLetter === null) return;
      fetchRecipeByLetter();
    },
    [queryLetter, setRecipes, setError, setIsLoading]
  );

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
