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
                let recipe = resJSON.drinks[0];
                //let ingredients = [];
                //let measurements = [];
                let drinkName = recipe.strDrink;

                console.log(recipe.strDrink);
                console.log(recipe.strInstructions);
                //ingredients - up to 15
                let ingredients = recipe.strIngredient1;
                //    for (i = 0; i <= 15; i++){
                //        ingredients.push(recipe.strIngredient1)
                //    }

                // measurements - up to 15
                let measurements = recipe.strMeasure1;

                //drink thumbnail
                let drinkImg = recipe.strDrinkThumb;
                let drinkInstruct = recipe.strInstructions;

                this.setState({
                    isLoaded: true,
                    responseItem: recipe,
                    ingredients: ingredients,
                    measurements: measurements,
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
        const { error, isLoaded, ingredients, measurements, drinkName, drinkInstruct, drinkImg } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading Beachbums...</div>
        } else {
            return (
                <div className={this.state.searchType}>
                    SEARCH BY RANDOM:
                    <div>
                    {ingredients}
                    {measurements}
                    {drinkName}
                    {drinkInstruct}
                    {drinkImg}
                    </div>
                   
                    <button onClick={this.reFetch}>Search Again</button>
                </div>
            )
        }

    }
}

export default SearchByRandom;