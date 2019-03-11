const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const Recipe = require("./model/recipeModel");
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost/Food")
  .then(() => console.log("Successfully connected"))
  .catch(err => console.log(`Error while connecting`));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", async (req, res, next) => {
  res.send("Hello there!, welcome to food API");
});

app.get("/recipe", async (req, res, next) => {
  const recipes = await Recipe.find({});
  res.send(recipes).status(200);
});

app.get("/recipe/:id", async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  res.send(recipe).status(200);
});

app.post("/recipe", async (req, res, next) => {
  const {
    Name,
    Category,
    Instruction,
    ThumbImg,
    Tags,
    Video,
    Ingredients,
    Measurements,
    Source
  } = req.body;

  let recipe = new Recipe({
    Name,
    Category,
    Instruction,
    ThumbImg,
    Tags,
    Video,
    Ingredients,
    Measurements,
    Source
  });
  recipe = await recipe.save();
  res.send(recipe).status(200);
});

app.put("/recipe", async (req, res, next) => {
  const id = req.params.id;
  const {
    Name,
    Category,
    Instruction,
    ThumbImg,
    Tags,
    Video,
    Ingredients,
    Measurements,
    Source
  } = req.body;

  let recipe = await Recipe.findByIdAndUpdate(id, {
    Name,
    Category,
    Instruction,
    ThumbImg,
    Tags,
    Video,
    Ingredients,
    Measurements,
    Source
  });
  res.send(recipe).status(200);
});

app.delete("/recipe", async (req, res, next) => {
  const id = req.params.id;
  let recipe = await Recipe.findByIdAndDelete(id);

  res.send(recipe).status(400);
});

app.listen(PORT, () => console.log(`Connecting to Server on ${PORT}`));
