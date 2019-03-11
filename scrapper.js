const axios = require("axios");
const Recipe = require("./model/recipeModel");
const url = "https://www.themealdb.com/api/json/v1/1/latest.php";

mongoose
    .connect("mongodb://localhost/Task")
    .then(() => console.log("Successfully connected"))
    .catch(err => console.log(`Error while connecting`));

const loadData = async()=>{
    debugger;
    const recipes = await axios.default.get(url)
    .then((result)=>{
        result.data.forEach((item)=>{
            const recipe = new Recipe({
                Name: item.strMeal,
                Category: item.Category,
                Instruction: item.instructions,
                ThumbImg: item.strMealThumb,
                strTags =item.strTags.split(','),
                Video: item.strYoutube,
                Ingredients = item.strIngredient1.concat
                (',', item.strIngredient2,
                    ',', item.strIngredient3,
                    ',', item.strIngredient4,
                    ',', item.strIngredient5,
                    ',', item.strIngredient6,
                    ',', item.strIngredient7,
                    ',', item.strIngredient8,
                    ',', item.strIngredient9,
                    ',', item.strIngredient10,
                    ',', item.strIngredient11,
                    ',', item.strIngredient12,
                    ',', item.strIngredient13,
                    ',', item.strIngredient14,
                    ',', item.strIngredient15,
                    ',', item.strIngredient16,
                    ',', item.strIngredient17,
                    ',', item.strIngredient18,
                    ',', item.strIngredient19,
                    ',', item.strIngredient20).split(','),
                Measurement: item.strMeasure1.concat
                    (',', item.strMeasure2,
                        ',', item.strMeasure3,
                        ',', item.strMeasure4,
                        ',', item.strMeasure5,
                        ',', item.strMeasure6,
                        ',', item.strMeasure7,
                        ',', item.strMeasure8,
                        ',', item.strMeasure9,
                        ',', item.strMeasure10,
                        ',', item.strMeasure11,
                        ',', item.strMeasure12,
                        ',', item.strMeasure13,
                        ',', item.strMeasure14,
                        ',', item.strMeasure15,
                        ',', item.strMeasure16,
                        ',', item.strMeasure17,
                        ',', item.strMeasure18,
                        ',', item.strMeasure19,
                        ',', item.strMeasure20).split(','),
                Source: item.strSource
            })
        });
    })
}

loadData();