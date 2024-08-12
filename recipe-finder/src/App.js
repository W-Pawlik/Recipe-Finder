import "./styles/App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Search from "./components/Main/Search";
import Outcome from "./components/Main/Outcome";
import SavedRecipes from "./components/Main/SavedRecipes";
import RecipeForm from "./components/Main/RecipeForm";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]);

  function handleSavedRecipes(recipe) {
    const savedRecipe = {
      id: recipe.idMeal,
      name: recipe.strMeal,
      category: recipe.strCategory,
      country: recipe.strArea,
      instruction: recipe.strInstructions,
      img: recipe.strMealThumb,
      tags: recipe.strTags,
      youtube: recipe.strYoutube,
      ingredients: Array.from({ length: 20 }, (_, i) => {
        const ingName = recipe[`strIngredient${i + 1}`];
        const measure = recipe[`strMeasure${i + 1}`];
        const ingredient = ingName + " " + measure;
        return ingredient;
      }).filter((ing) => ing.length > 2),
      // userRating: userRating,
    };

    if (savedRecipes.map((rec) => rec.id).includes(savedRecipe.id)) {
      alert("You have already saved this recipe 😉");
      return;
    }

    setSavedRecipes((savedRecipes) => [...savedRecipes, savedRecipe]);
  }

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
        <Outcome
          recipes={recipes}
          isLoading={isLoading}
          error={error}
          onSavedRecipes={handleSavedRecipes}
          savedRecipes={savedRecipes}
        />
        <SavedRecipes savedRecipes={savedRecipes} />
        <RecipeForm />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
