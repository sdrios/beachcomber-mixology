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
            responseItem: ''
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

                // ingredientsList.filter((ingredient)=>{
                //     (ingredient )
                // })

                this.setState({
                    isLoaded: true,
                    responseItem: ingredientsList.sort()
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
        const { error, isLoaded, responseItem } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading Beachbums...</div>
        } else {
            return (
                <div className={this.state.searchType}>
                    SEARCH BY Ingredient:
                      <Form>
                        <div key={`ingredient-radio`} className="mb-3">
                            {responseItem.map(responseItem => (
                               
                               
                                <Form.Check
                                    type='radio'
                                    id={responseItem}
                                    label={responseItem}
                                />
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