import { useState } from "react";
import { YoutubeFilled } from "@ant-design/icons";
import Button from "../ui/Button";

export default function Recipe({ recipe }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleDetails() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="recipe-container">
      <img src={recipe.strMealThumb} alt={recipe.name} />
      <div className="rec-content">
        <div className="short-desc" onClick={() => handleToggleDetails(recipe)}>
          <div>
            <h3>{recipe.strMeal}</h3>
            <p>Category: {recipe.strCategory}</p>
            <p>Country: {recipe.strArea}</p>
          </div>

          <span>
            Show recipe <span className="book">{!isOpen ? "📘" : "📖"}</span>
          </span>
        </div>
        {isOpen && (
          <div className="long-desc">
            <a href={recipe.strYoutube} target="blank" className="youtube-i">
              <YoutubeFilled
                style={{
                  fontSize: "3.5rem",
                  color: "red",
                  cursor: "pointer",
                  pointerEvents: "auto",
                }}
              />
            </a>
            <div className="long-cont">
              <div>
                <h4>Instruction</h4>
                <p>{recipe.strInstructions}</p>
              </div>
              <div className="ing-content">
                <ul>
                  <h4>Ingredients</h4>
                  {Array.from({ length: 20 }, (_, i) => {
                    const ing = recipe[`strIngredient${i + 1}`];
                    const measure = recipe[`strMeasure${i + 1}`];

                    return ing && measure ? (
                      <li key={i}>
                        {ing} {measure}
                      </li>
                    ) : null;
                  })}
                </ul>

                <Button onClick={handleToggleDetails}>Collapse recipe ⬆</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
