import React from 'react';
//import Image from 'react-bootstrap/Image'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


class SearchByRandom extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "random",
            error: null,
            isLoaded: false,
            responseItem: '',
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
                let drinkName = recipe.strDrink; //drink name
                let drinkImg = recipe.strDrinkThumb; //drink thumbnail
                let drinkInstruct = recipe.strInstructions; //drink instructions

                //collect ingredients and measurements - up to 15
                for (let i = 1; i <= 15; i++) {
                    let ingredient = "strIngredient" + i;
                    let measurement = "strMeasure" + i;
                    if (recipe[ingredient] !== (null)) {
                        ingredients.push(`${recipe[measurement]} ${recipe[ingredient]}`)
                    }
                }

                this.setState({
                    isLoaded: true,
                    responseItem: recipe,
                    ingredients: ingredients,
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
        const { error, isLoaded, ingredients, drinkName, drinkInstruct, drinkImg } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading Beachbums...</div>
        } else {
            return (
                <div className="random">
                    <div className="random-card">

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={drinkImg} fluid />
                            <Card.Body>
                                <Card.Title>{drinkName}</Card.Title>
                                <Card.Text>
                                    <ul>
                                        {ingredients.map(ingredient => (
                                            <li key={ingredient} >{ingredient}</li>
                                        ))
                                        }
                                    </ul>
                                    {drinkInstruct}
                                </Card.Text>
                                <Button onClick={this.reFetch} variant="primary">Search Again</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            )
        }

    }
}

export default SearchByRandom;