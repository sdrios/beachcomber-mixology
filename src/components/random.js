import React from 'react';

class SearchByRandom extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "Random",
            error: null,
            isLoaded: false,
            responseItem: '',
            ingredients: [],
            measurements: [],
            drinkName: '',
            drinkInstruct: '',
            drinkImg: ''
        }
    }

    componentDidMount() {
        this.randomFetch();
    }

    reFetch = () => {
        this.setState({
            isLoaded: false
        })
        this.randomFetch();
    }

    randomFetch() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(res => res.json())
            .then((resJSON) => {
                let recipe = resJSON.drinks[0]; //access recipe object
                let ingredients = []; //declare ingredients array
                let measurements = []; //declare measurements array
                let measureIngredients = []; //declare measurement - ingredients array
                let drinkName = recipe.strDrink; //drink name
                let drinkImg = recipe.strDrinkThumb; //drink thumbnail
                let drinkInstruct = recipe.strInstructions; //drink instructions

                //collect ingredients - up to 15
                for (let i = 1; i <= 15; i++) {
                    let ingredient = "strIngredient" + i;
                    if (recipe[ingredient] !== null) {
                        ingredients.push(recipe[ingredient])
                    }
                }

                //collect measurements - up to 15
                for (let i = 1; i <= 15; i++) {
                    let measurement = "strMeasure" + i;
                    if (recipe[measurement] !== null) {
                        measurements.push(recipe[measurement])
                    }
                }

                //concatenate measurements + ingredients 
                 for (let i = 0; i < measurements.length; i++) {
                     let combined = measurements[i] +' '+ingredients[i];
                     measureIngredients.push(combined);
                }

                this.setState({
                    isLoaded: true,
                    responseItem: recipe,
                    measureIngredients:measureIngredients,
                    drinkName: drinkName,
                    drinkInstruct: drinkInstruct,
                    drinkImg: drinkImg
                })
            },
                (error) => {
                    console.log("ERROR!")
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        const { error, isLoaded, measureIngredients, drinkName, drinkInstruct, drinkImg } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading Beachbums...</div>
        } else {
            return (
                <div className={this.state.searchType}>
                    SEARCH BY RANDOM:
                    <div>
                        <ul>
                            {measureIngredients.map(ingredient => (
                                <li key={ingredient} >{ingredient}</li>
                            )) 
                             }
                        </ul>
                  
                       <img src={drinkImg}></img>
                        {drinkName}
               
                  
                        {drinkInstruct}

                    </div>

                    <button onClick={this.reFetch}>Search Again</button>
                </div>
            )
        }

    }
}

export default SearchByRandom;