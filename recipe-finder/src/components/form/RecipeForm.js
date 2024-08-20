import "./recipeform.css";
import React, { useState } from "react";
import Button from "../ui/Button";
import { v4 as uuidv4 } from "uuid";

export default function RecipeForm({ setCreatedRecipes }) {
  const [strMeal, setStrMeal] = useState("");
  const [strCategory, setStrCategory] = useState("");
  const [strArea, setStrArea] = useState("");
  const [strInstructions, setStrInstrucions] = useState("");
  const [strYoutube, setStrYoutube] = useState("");
  const [strMealThumb, setStrMealThumb] = useState("");

  const [ingredients, setIngredients] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      [`strIngredient${i + 1}`]: "",
      [`strMeasure${i + 1}`]: "",
    }))
  );

  const handleChangeIngredient = (index, e) => {
    const { name, value } = e.target;
    const newIngredients = [...ingredients];
    newIngredients[index][name] = value;
    setIngredients(newIngredients);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const createdRecipe = {
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strYoutube,
      strMealThumb,
      ...ingredients.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      idMeal: uuidv4(),
    };

    console.log(createdRecipe);

    setIngredients(
      Array.from({ length: 20 }, (_, i) => ({
        [`strIngredient${i + 1}`]: "",
        [`strMeasure${i + 1}`]: "",
      }))
    );

    setCreatedRecipes((createdRecipes) => [...createdRecipes, createdRecipe]);

    setStrMeal("");
    setStrCategory("");
    setStrArea("");
    setStrInstrucions("");
    setStrYoutube("");
    setStrMealThumb("");
  };

  return (
    <div className="rec-form-cont">
      <h2>Create your recipe</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="two-col-div">
          <label>Recipe name</label>
          <input
            type="text"
            name="recipe-name"
            value={strMeal}
            onChange={(e) => setStrMeal(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={strCategory}
            onChange={(e) => setStrCategory(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Area</label>
          <input
            type="text"
            name="area"
            value={strArea}
            onChange={(e) => setStrArea(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label>Youtube Url</label>
          <input
            type="text"
            name="youtube"
            value={strYoutube}
            onChange={(e) => setStrYoutube(e.target.value)}
            required
          ></input>
        </div>

        <div>
          <label>Image url</label>
          <input
            type="text"
            name="image"
            value={strMealThumb}
            onChange={(e) => setStrMealThumb(e.target.value)}
            required
          ></input>
        </div>

        {Array.from({ length: 20 }).map((_, i) => (
          <React.Fragment key={i}>
            <div>
              <label>Ingredient {i + 1}</label>
              <input
                type="text"
                name={`strIngredient${i + 1}`}
                onChange={(e) => handleChangeIngredient(i, e)}
                value={ingredients[i][`strIngredient${i + 1}`]}
              ></input>
            </div>
            <div>
              <label>Measure {i + 1}</label>
              <input
                type="text"
                name={`strMeasure${i + 1}`}
                onChange={(e) => handleChangeIngredient(i, e)}
                value={ingredients[i][`strMeasure${i + 1}`]}
              ></input>
            </div>
          </React.Fragment>
        ))}
        <div className="two-col-div">
          <label>Instructions</label>
          <textarea
            type="text"
            name="instructions"
            value={strInstructions}
            onChange={(e) => setStrInstrucions(e.target.value)}
          ></textarea>
        </div>
        <Button className="two-col-div">Create recipe</Button>
      </form>
    </div>
  );
}
