const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const { Recipe, User, SavedRecipe } = require("./model/recipeModel");
const ObjectID = require("bson-objectid");

const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    "mongodb+srv://DAMMAK:Adedamola92@cluster0-m0sql.mongodb.net/test?retryWrites=true"
  )
  .then(() => console.log("Successfully connected"))
  .catch(err => console.log(`Error Failed to connect to MOngoDB => ${err}`));
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

app.get("/users", async (req, res, next) => {
  const users = await User.find({});
  res.send(users).status(200);
});

app.get("/recipe/:UserId", async (req, res, next) => {
  const { UserId } = req.params;
  if (!ObjectID.isValid(UserId))
    return res.send({ error: "Invalid User Id, Pleas provide a valid user" });
  let users = await User.findById(UserId);
  if (!users) return res.send({ err: "Invalid User" }).status(400);
  const recipes = await SavedRecipe.find({ UserId });
  res.send(recipes).status(200);
});

app.get("/recipe/:UserId/:id", async (req, res, next) => {
  const { UserId, Id } = req.params;
  if (!ObjectID.isValid(UserId))
    return res.send({ error: "Invalid User Id, Please provide a valid user" });
  let users = await User.findById(UserId);
  if (!users) return res.send({ err: "Invalid User" }).status(400);
  const recipe = await SavedRecipe.find({ UserId, _id: Id });
  res.send(recipe).status(200);
});

app.post("/recipe/:UserId", async (req, res, next) => {
  let UserId = req.params.UserId;
  if (!ObjectID.isValid(UserId))
    return res.send({ error: "Invalid User Id, Pleas provide a valid user" });
  let users = await User.findById(UserId);
  if (!users) return res.send({ err: "Invalid User" }).status(400);
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

  let recipe = new SavedRecipe({
    Name,
    Category,
    Instruction,
    ThumbImg,
    Tags,
    Video,
    Ingredients,
    Measurements,
    Source,
    UserId
  });
  recipe = await SavedRecipe.save();
  res.send(recipe).status(200);
});

app.put("/recipe/:UserId/:Id", async (req, res, next) => {
  const { UserId, Id } = req.params;
  if (!ObjectID.isValid(UserId))
    return res.send({ error: "Invalid User Id, Pleas provide a valid user" });
  let users = await User.findById(UserId);
  if (!users) return res.send({ err: "Invalid User" }).status(400);

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

  let recipe = await SavedRecipe.findByIdAndUpdate(Id, {
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
  if (!recipe) return res.send({ err: `Fail to Update your Recipe ` });
  res.send(recipe).status(200);
});

app.delete("/recipe", async (req, res, next) => {
  const { UserId, Id } = req.params;
  if (!ObjectID.isValid(UserId))
    return res.send({ error: "Invalid User Id, Please provide a valid user" });
  let users = await User.findById(UserId);
  if (!users) return res.send({ err: "Invalid User" }).status(400);
  let recipe = await SavedRecipe.findByIdAndDelete(Id);
  if (!recipe)
    return res.send({ err: `Fail to Delete your Recipe, Recipe not found` });
  res.send(recipe).status(400);
});

app.listen(PORT, () => console.log(`Connecting to Server on ${PORT}`));
