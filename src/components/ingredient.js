import React from 'react';
import { Form, Alert } from 'react-bootstrap';

class SearchByIngredient extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "ingredient",
            searchQuery: "empty search",
            error: null,
            isLoaded: false,
            responseIngredients: '',
            filteredIngredients: ''
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

        // console.log(document.getElementsByClassName("ingredient-item").length);

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

    handleClick(e) {
        console.log("CLICKED AN INGREDIENT")
    }

    handleSubmit(e) {
        console.log("SUBMITTED INGREDIENTS")

    }

    render() {
        const { error, isLoaded, filteredIngredients } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <Alert variant="success">
    Loading Beachbums...
  </Alert>
        } else {
            return (

                <div className="ingredient-search">
                    <input autoComplete="off" type="text" onChange={(e) => this.ingredientsFilter(e)} name="name" placeholder="Search Ingredients.." />

                    <Form>
                        <div id="ingredient-items" className="ingredient-items">
                            {filteredIngredients.map(responseItem => (
                                <li className="ingredient-item" onClick={(e) => this.handleClick(e)}
                                    key={responseItem}
                                >{responseItem}</li>
                            ))
                            }
                        </div>
                    </Form>
                </div>

            )
        }
    }
}

export default SearchByIngredient;