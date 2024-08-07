import "./styles/App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Search from "./components/Main/Search";
import Outcome from "./components/Main/Outcome";
import { useEffect, useRef, useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const searchBarRef = useRef();

  function handleFocus() {
    console.log("click");
    console.log(searchBarRef);
    // searchBarRef.current.focus();
  }

  useEffect(
    function () {
      async function fetchRecipes() {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        const recipesData = await res.json();
        setRecipes(recipesData.meals);
      }

      if (query.length < 3) {
        setRecipes([]);
        return;
      }
      fetchRecipes();
    },

    [query]
  );

  return (
    <div className="App">
      <Header onFocus={handleFocus} />
      <Main>
        <Search query={query} setQuery={setQuery} ref={searchBarRef} />
        <Outcome recipes={recipes} />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
