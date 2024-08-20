import "./styles/App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Search from "./components/Main/Search";
import Outcome from "./components/Main/Outcome";
import SavedRecipes from "./components/Main/SavedRecipes";
import RecipeForm from "./components/form/RecipeForm";
import AlphabetBar from "./components/Main/AlphabetBar";
import CountrySearch from "./components/Main/CountrySearch";
import { useEffect, useState } from "react";
import { useFetchRecipeData } from "./hooks/useFetchRecipeData";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

function App() {
  const [queryLetter, setQuerryLetter] = useState("");
  const [query, setQuery] = useState("");
  const [allRec, setAllRec] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingLetter, setIsLoadingLetter] = useState(false);
  const [errorLetter, setErrorLetter] = useState("");
  const [isLoadingCountry, setIsLoadingisLoadingCountry] = useState(false);
  const [errorCountry, setErrorCountry] = useState("");

  const { recipes } = useFetchRecipeData(
    query,
    "s",
    "search",
    setIsLoading,
    setError
  );
  const { recipes: letterRecipes } = useFetchRecipeData(
    queryLetter,
    "f",
    "search",
    setIsLoadingLetter,
    setErrorLetter
  );

  const [savedRecipes, setSavedRecipes] = useLocalStorageState([], "saved");
  const [createdRecipes, setCreatedRecipes] = useLocalStorageState(
    [],
    "createdRec"
  );

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
    };

    if (savedRecipes.map((rec) => rec.id).includes(savedRecipe.id)) {
      alert("You have already saved this recipe 😉");
      return;
    }

    setSavedRecipes((savedRecipes) => [...savedRecipes, savedRecipe]);
  }

  useEffect(
    function () {
      if (query.length >= 3) {
        setQuerryLetter(null);

        const filteredCreatedRecipes = createdRecipes.filter((recipe) =>
          recipe.strMeal.toLowerCase().includes(query.toLowerCase())
        );

        const combinedRecipes = [...filteredCreatedRecipes, ...recipes];
        setAllRec(combinedRecipes);
      } else if (queryLetter && !query) {
        const filteredByFirstLetter = createdRecipes.filter(
          (recipe) =>
            recipe.strMeal[0].toLowerCase() === queryLetter.toLowerCase()
        );

        const combinedRecipes = [...filteredByFirstLetter, ...letterRecipes];

        setAllRec(combinedRecipes);
      } else {
        setAllRec([]);
        return;
      }
    },
    [query, recipes, createdRecipes, queryLetter, letterRecipes]
  );

  return (
    <div className="App">
      <Header />
      <Main>
        <Search query={query} setQuery={setQuery} />
        <AlphabetBar setQuerryLetter={setQuerryLetter} setQuery={setQuery} />
        <CountrySearch
          recipies={allRec}
          setRecipes={setAllRec}
          setErrorCountry={setErrorCountry}
          setIsLoading={setIsLoadingisLoadingCountry}
          setError={setError}
          setErrorLetter={setErrorLetter}
        />
        <Outcome
          recipes={allRec}
          isLoading={isLoading || isLoadingLetter || isLoadingCountry}
          error={error || errorLetter || errorCountry}
          onSavedRecipes={handleSavedRecipes}
          savedRecipes={savedRecipes}
        />
        <SavedRecipes
          savedRecipes={savedRecipes}
          onSetRecipes={setSavedRecipes}
        />
        <RecipeForm setCreatedRecipes={setCreatedRecipes} />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
