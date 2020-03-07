import React from 'react';
import { Row, Button, Alert } from 'react-bootstrap';
import Recipe from  './recipe.js'

class SearchByIngredient extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "ingredient",
            ingredientQueryList: [],
            error: null,
            isLoaded: false,
            responseIngredients: [],
            filteredIngredients: [],
            responseDrinks: []
        }
    }

    componentDidMount() {
        this.ingredientsFetch();
    }

    //call API for ingredients list 
    ingredientsFetch() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
            .then(res => res.json())
            .then((resJSON) => {
                let ingredientsList = []
                resJSON.drinks.map((drink) => {
                    let ingredient = drink.strIngredient1;
                    let capitalIngredient = ingredient.charAt(0).toUpperCase() + ingredient.substring(1);
                    ingredientsList.push(capitalIngredient);
                })

                let ingredientsListSort = ingredientsList.sort();

                this.setState({
                    isLoaded: true,
                    responseIngredients: ingredientsListSort,
                    filteredIngredients: ingredientsListSort
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

    ingredientsFilter(e) {
        const { responseIngredients } = this.state; //declare original response ingredients array

        if (e.target.value !== '') {
            document.getElementById("ingredient-items").style.display = "block";
        }
        else {
            document.getElementById("ingredient-items").style.display = "none";
        }

        //convert user input to lowercase for filtering
        let lowercaseInput = e.target.value.toLowerCase();

        //convert ingredients list to lowercase for filtering
        let lowercaseIngredients = responseIngredients.map((ingredient) => {
            let lowercaseItem = ingredient.toLowerCase();
            return lowercaseItem;
        })

        //filter ingredients + user input
        let filtered = lowercaseIngredients.filter((ingredient) => {
            return ingredient.includes(lowercaseInput);
        })

        //convert filtered ingredients list back to original case for rendering
        let filteredCaseIngredients = filtered.map((ingredient) => {
            let uppercaseItem = ingredient.charAt(0).toUpperCase() + ingredient.substring(1);
            return uppercaseItem;
        })

        this.setState({
            filteredIngredients: filteredCaseIngredients
        })
    }

    addIngredient(e, ingredient) {

        document.getElementById("ingredient-items").style.display = "none";

        let currentIngredientList = this.state.ingredientQueryList;
        let ingredientQuery = ingredient.responseItem;
        currentIngredientList.push(ingredientQuery);

        this.setState(prevState => ({
            ingredientQueryList: currentIngredientList
        }));
    }

    handleSubmit(e) {
        console.log("SUBMITTED INGREDIENTS")
        let ingredientQuery = this.state.ingredientQueryList;
        let ingredientQueryString = ingredientQuery.join();

        console.log(ingredientQueryString)

        let ingredientFetchURL = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + ingredientQueryString;
        this.drinkFetch(ingredientFetchURL);
    }

    drinkFetch(URL) {
        fetch(URL)
            .then(res => res.json())
            .then((resJSON) => {

                let responseDrinks = resJSON.drinks;

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
        const { error, isLoaded, responseDrinks, filteredIngredients, ingredientQueryList } = this.state;
        if (error) {
            return <Alert variant="success">{error.message}<br>Could not load results. Please try again.</br></Alert>
        } else if (!isLoaded) {
            return <Alert variant="success">Loading Beachbums...</Alert>
        } else {
            console.log(ingredientQueryList);
            console.log(responseDrinks);
            return (

                <div className="ingredient-search">
                    <Row className="ingredient-input">
                        <input autoComplete="off" type="text" onChange={(e) => this.ingredientsFilter(e)} name="name" placeholder="Search Ingredients.." />
                        <Button onClick={(e) => this.handleSubmit(e)} size="sm" variant="info">Submit</Button>
                    </Row>
                    <div id="ingredient-items" className="ingredient-items">
                        {filteredIngredients.map((responseItem, index) => (
                            <li className="ingredient-item" onClick={(e) => this.addIngredient(e, { responseItem })}
                                key={index}
                            >{responseItem}</li>
                        ))
                        }
                    </div>
                    <div className="ingredient-query-list">
                        {ingredientQueryList.map(ingredientQuery => (
                            <Button size="sm" variant="info" key={ingredientQuery}>{ingredientQuery}</Button>
                        ))}
                    </div>

                    <div className="tiki-cards">
                        {responseDrinks.map(drink => (
                            <Recipe drinkId={drink.idDrink} drinkName={drink.strDrink} drinkImg={drink.strDrinkThumb} />
                        ))}
                    </div>
                </div>
            )
        }
    }
}

export default SearchByIngredient;