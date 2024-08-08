import "./styles/App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Search from "./components/Main/Search";
import Outcome from "./components/Main/Outcome";
import SavedRecipes from "./components/Main/SavedRecipes";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(
    function () {
      async function fetchRecipes() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
          );

          if (!res.ok) throw new Error("Problem with fetching recipes");

          const recipesData = await res.json();

          if (recipesData.meals === null) throw new Error("Recipe not found");
          console.log(recipesData);
          setRecipes(recipesData.meals);
          setError("");
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setRecipes([]);
        setError("");
        return;
      }
      fetchRecipes();
    },

    [query]
  );

  return (
    <div className="App">
      <Header />
      <Main>
        <Search query={query} setQuery={setQuery} />
        <Outcome recipes={recipes} isLoading={isLoading} error={error} />
        <SavedRecipes />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
