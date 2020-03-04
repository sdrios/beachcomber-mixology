import React from 'react';
import { Form } from 'react-bootstrap';

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
        const {responseIngredients} = this.state; //declare original response ingredients array

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

    handleSubmit(){
        
    }

    render() {
        const { error, isLoaded, filteredIngredients } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading Beachbums...</div>
        } else {
            return (
                <Form>
                    <div className={this.state.searchType}>

                        <input type="text" onChange={(e) => this.ingredientsFilter(e)} name="name" placeholder="Search Ingredients.." />

                        <div key={`ingredient-radio`} className="mb-3">
                            {filteredIngredients.map(responseItem => (
                                <Form.Check
                                    type='radio'
                                    key={responseItem}
                                    label={responseItem}
                                />
                            ))
                            }

                        </div>
                    </div>
                </Form>
            )

        }

    }

}

export default SearchByIngredient;