import { useState } from "react";
import Button from "../ui/Button";

export default function RecipeForm() {
  const [recipeName, setRecipeName] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [instructions, setInstrucions] = useState("");
  const [ingCount, setIngCount] = useState([1]);

  function handleRenderAntoherIng(e) {
    e.preventDefault(e);
    setIngCount((newIng) => [...ingCount, newIng]);
    console.log(ingCount.length);
  }

  function handleRemoveIng(e) {
    e.preventDefault();
    setIngCount([...ingCount.slice(0, -1)]);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    console.log(
      `created recipe ${recipeName}, category: ${category}, country: ${country}, instructions: ${instructions}`
    );
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

        {ingCount.map((ing, i) => {
          return (
            <>
              <div>
                <label>ingredient</label>
                <input type="text" name="ingredient"></input>
              </div>
              <div>
                <label>Measure</label>
                <input type="number" name="measure"></input>
              </div>
            </>
          );
        })}
        <Button onClick={(e) => handleRemoveIng(e)}>➖ Ing ➖</Button>
        <Button onClick={(e) => handleRenderAntoherIng(e)}>➕ Ing ➕</Button>
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
