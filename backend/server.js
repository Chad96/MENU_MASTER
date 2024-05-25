const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { MongoClient } = require("mongodb");

// MongoDB connection string
const mongoURI =
  "mongodb+srv://chadrackndalamba:<ZeKDogpT52L9eB6e>@cluster0.jgsja19.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Database name
const dbName = "YOUR_DATABASE_NAME";
// MongoDB client
const client = new MongoClient(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToMongoDB();

// Define a route to handle saving a recipe
app.post("/api/recipes", async (req, res) => {
  const recipeData = req.body; // Assuming recipe data is sent in the request body
  const recipesCollection = client.db(dbName).collection("recipes");
  try {
    // Insert the recipe data into the recipes collection
    const result = await recipesCollection.insertOne(recipeData);
    res.json({
      message: "Recipe saved successfully",
      recipeId: result.insertedId,
    });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
