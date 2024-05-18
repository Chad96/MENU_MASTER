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
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=YOUR_API_KEY`
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

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeTitle);

        resultsContainer.appendChild(recipeCard);
      });
    } else {
      resultsContainer.innerHTML =
        "<p>No recipes found. Please try another search.</p>";
    }
  }
});
