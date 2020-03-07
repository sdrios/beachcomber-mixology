import React from 'react';
import Recipe from './recipe.js'

class SearchByTiki extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: "tiki",
            error: null,
            isLoaded: false,
            drinkInstruct: '',
            measureIngredients: [],
            responseDrinks: [],
        }
    }

    componentDidMount() {
        this.tikiFrontFetch();
    }

    reFetch = () => {
        this.setState({
            isLoaded: false
        })
        this.tikiFrontFetch();
    }

    tikiFrontFetch() {
        fetch("https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?a=Non_Alcoholic")
            .then(res => res.json())
            .then((resJSON) => {
                let responseDrinks = resJSON.drinks; //data for card front
                this.setState({
                    isLoaded: true,
                    responseDrinks: responseDrinks
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
        const { error, isLoaded, responseDrinks} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading Beachbums...</div>
        } else {

            return (
                <div className="tiki-cards">
                    {responseDrinks.map(drink => (
                        <Recipe drinkId={drink.idDrink} drinkName={drink.strDrink} drinkImg={drink.strDrinkThumb}/>
                    ))}
                </div>
            )
        }
    }
}

export default SearchByTiki;