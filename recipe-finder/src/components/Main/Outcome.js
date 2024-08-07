import Recipe from "./Recipe";

export default function Outcome({ recipes }) {
  return (
    <div className="outcome">
      <h2>Recipes List</h2>
      {recipes?.map((recipe) => (
        <Recipe recipe={recipe} key={recipe.idMeal} />
      ))}
    </div>
  );
}
