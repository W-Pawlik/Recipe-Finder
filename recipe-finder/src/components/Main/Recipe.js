export default function Recipe({ recipe }) {
  return (
    <div className="recipe-container">
      <img src={recipe.strMealThumb} alt={recipe.name} />
      <div className="short-desc">
        <h3>{recipe.strMeal}</h3>
        <p>Type: {recipe.strCategory}</p>
        <p>Country: {recipe.strArea}</p>
      </div>
    </div>
  );
}
