import React, { useState } from "react";
import Button from "../ui/Button";

export default function RecipeForm() {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [instructions, setInstrucions] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, ""]);
  };

  const handleRemoveIngredient = (e, index) => {
    e.preventDefault();
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
    console.log(`Removed ing: ${index}`);
    console.log(`Nowa lista: ${newIngredients}`);
  };

  function handleChangeIngredient(index, e) {
    const newIngredients = ingredients.map((ingredient, i) => {
      if (i === index) {
        return e.target.value;
      }
      return ingredient;
    });
    setIngredients(newIngredients);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(
      `created recipe ${recipeName}, category: ${category}, country: ${country}, instructions: ${instructions}, ingriedients: ${ingredients}`
    );
    console.log(ingredients);

    setIngredients([""]);
    setRecipeName("");
    setCategory("");
    setCountry("");
    setInstrucions("");
  }

  return (
    <div className="rec-form-cont">
      <h2>Create your recipe</h2>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <div className="two-col-div">
          <label>Recipe name</label>
          <input
            type="text"
            name="recipe-name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></input>
        </div>

        {ingredients.map((ing, i) => {
          return (
            <React.Fragment key={i}>
              <div>
                <label>ingredient {i + 1} and measure</label>
                <input
                  type="text"
                  name="ingredient"
                  onChange={(e) => handleChangeIngredient(i, e)}
                  value={ing}
                ></input>
              </div>
              <Button onClick={(e) => handleRemoveIngredient(e, i)}>
                ➖ Ing ➖
              </Button>
            </React.Fragment>
          );
        })}
        <Button className="two-col-div" onClick={(e) => handleAddIngredient(e)}>
          ➕ Ing ➕
        </Button>
        <div className="two-col-div">
          <label>Instructions</label>
          <textarea
            type="text"
            name="instructions"
            value={instructions}
            onChange={(e) => setInstrucions(e.target.value)}
          ></textarea>
        </div>
        <Button className="two-col-div">Create recipe</Button>
      </form>
    </div>
  );
}
