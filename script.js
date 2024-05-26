document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.getElementById("search-button");
  const searchBar = document.getElementById("search-bar");
  const resultsContainer = document.getElementById("results-container");

  searchButton.addEventListener("click", function () {
    const query = searchBar.value;
    if (query) {
      searchRecipes(query);
    }
  });

  async function searchRecipes(query) {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=41f34ea8b8ad48078569526a1512216a`
      );
      const data = await response.json();
      displayResults(data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }

  function displayResults(recipes) {
    resultsContainer.innerHTML = "";
    if (recipes.length > 0) {
      recipes.forEach((recipe) => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        const recipeImage = document.createElement("img");
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.title;

        const recipeTitle = document.createElement("h3");
        recipeTitle.textContent = recipe.title;

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "Show Details";
        detailsButton.classList.add("view-recipe-button");
        detailsButton.addEventListener("click", () =>
          fetchRecipeDetails(recipe.id, recipeCard)
        );

        const saveButton = document.createElement("button");
        saveButton.textContent = "Save Recipe";
        saveButton.classList.add("save-recipe-button");
        saveButton.addEventListener("click", () =>
          saveRecipe(recipe.id, recipe.title, recipe.image)
        );

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTitle);
        recipeCard.appendChild(detailsButton);
        recipeCard.appendChild(saveButton);

        resultsContainer.appendChild(recipeCard);
      });
    } else {
      resultsContainer.innerHTML =
        "<p>No recipes found. Please try another search.</p>";
    }
  }

  async function fetchRecipeDetails(recipeId, recipeCard) {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=41f34ea8b8ad48078569526a1512216a`
      );
      const data = await response.json();
      displayRecipeDetails(data, recipeCard);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  }

  function displayRecipeDetails(recipe, recipeCard) {
    const ingredientsList = document.createElement("ul");
    recipe.extendedIngredients.forEach((ingredient) => {
      const ingredientItem = document.createElement("li");
      ingredientItem.textContent = `${ingredient.amount} ${ingredient.unit} ${ingredient.name}`;
      ingredientsList.appendChild(ingredientItem);
    });

    const instructionsList = document.createElement("ol");
    recipe.analyzedInstructions[0]?.steps.forEach((step) => {
      const stepItem = document.createElement("li");
      stepItem.textContent = step.step;
      instructionsList.appendChild(stepItem);
    });

    const ingredientsTitle = document.createElement("h4");
    ingredientsTitle.textContent = "Ingredients:";
    const instructionsTitle = document.createElement("h4");
    instructionsTitle.textContent = "Instructions:";

    recipeCard.appendChild(ingredientsTitle);
    recipeCard.appendChild(ingredientsList);
    recipeCard.appendChild(instructionsTitle);
    recipeCard.appendChild(instructionsList);
  }

  async function saveRecipe(recipeId, title, image) {
    const recipeData = { recipeId, title, image };
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Recipe saved successfully!");
      } else {
        alert(`Failed to save recipe: ${result.error}`);
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("An error occurred while saving the recipe.");
    }
  }
});
