fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
.then((response) => {
    if(response.ok) {
        return response .json();
    }else{
        throw new Error("NETWORK RESPONSE NOT OK");
    }
})

.then(function (data){
    console.log(data);
    displayCocktail(data)
})
.catch((error) =>{
    console.log(error)
})

function displayCocktail(data){
    const cocktail = data.drinks[0];
    const cocktailDiv = document.getElementById("cocktail");

    const cocktailname = cocktail.strDrink;
    const heading = document.createElement("h1");
    heading.innerHTML = cocktailname;
    cocktailDiv.appendChild(heading);

    const cocktailimage = document.createElement("img");
    cocktailimage.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailimage);
    document.body.style.backgroundImage = `url(${cocktail.strDrinkThumb})`;

    const cocktailIngredient = document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngredient);

    const getIngredient = Object.keys(cocktail)
    .filter(function(ingredient){
        return ingredient.indexOf("strIngredient") == 0;
    })
    .reduce(function (ingredients, ingredient){
        if(cocktail[ingredient] != null){
            ingredients[ingredient] = cocktail[ingredient];
        }
        return ingredients;
    }, {});

    for (let key in getIngredient){
        let value = getIngredient[key];
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        cocktailIngredient.appendChild(listItem);
    }
}