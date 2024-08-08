import Recipe from "./Recipe";
import Error from "../ui/Error/Error";

export default function Outcome({ recipes, isLoading, error }) {
  return (
    <div className="outcome">
      <h2>Recipes List</h2>
      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <Error error={error} />
      ) : (
        recipes?.map((recipe) => <Recipe recipe={recipe} key={recipe.idMeal} />)
      )}
    </div>
  );
}
