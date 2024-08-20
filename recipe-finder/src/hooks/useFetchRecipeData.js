import { useState, useEffect } from "react";

export function useFetchRecipeData(
  query,
  parameter,
  type,
  externalSetIsLoading,
  externalSetError
) {
  const [recipes, setRecipes] = useState([]);
  const [mealIds, setMealIds] = useState([]);

  useEffect(
    function () {
      async function fetchRecipes() {
        try {
          if (externalSetIsLoading) externalSetIsLoading(true);

          if (externalSetError) externalSetError("");

          const apiEndpoint = `https://www.themealdb.com/api/json/v1/1/${type}.php?${parameter}=${query}`;

          const res = await fetch(apiEndpoint);

          if (!res.ok) throw new Error("Problem with fetching recipes");

          const recipesData = await res.json();

          if (recipesData.meals === null) throw new Error("Recipe not found");

          if (type === "search") {
            setRecipes(recipesData.meals);
          } else if (type === "filter") {
            recipesData.meals.map((meal) => {
              return setMealIds((mealIds) => [...mealIds, meal.idMeal]);
            });
          }

          if (externalSetError) externalSetError("");
        } catch (err) {
          if (externalSetError) externalSetError(err.message);
        } finally {
          if (externalSetIsLoading) externalSetIsLoading(false);
        }
      }
      if (!query) {
        setRecipes([]);

        if (externalSetError) externalSetError("");
        return;
      }
      fetchRecipes();
    },

    [query, parameter, externalSetError, externalSetIsLoading, type]
  );

  return { recipes, mealIds, setMealIds };
}
