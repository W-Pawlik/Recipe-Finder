import Recipe from "./Recipe";
import Error from "../ui/Error/Error";
import SearchImg from "../../imgs/search-img.png";

export default function Outcome({
  recipes,
  isLoading,
  error,
  onSavedRecipes,
  savedRecipes,
}) {
  return (
    <div className="outcome">
      <h2>Recipes List</h2>
      {recipes.length === 0 ? (
        <div className="search-info">
          <p
            style={{
              fontSize: "3rem",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Start searching for recipes
          </p>
          <img src={SearchImg} alt="search" className="search-img" />
        </div>
      ) : isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <Error error={error} />
      ) : (
        recipes?.map((recipe) => (
          <Recipe
            recipe={recipe}
            onSavedRecipes={onSavedRecipes}
            savedRecipes={savedRecipes}
            key={recipe.idMeal}
          />
        ))
      )}
    </div>
  );
}
