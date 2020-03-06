import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';

class SearchByTiki extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "tiki",
            error: null,
            isLoaded: false,
            responseItem: '',
            ingredients: [],
            measurements: [],
            drinkName: '',
            drinkInstruct: '',
            drinkImg: '',
            responseDrinks: [],
            isFlipped: false
        }
    }

    componentDidMount() {
        this.tikiFetch();
    }

    reFetch = () => {
        this.setState({
            isLoaded: false
        })
        this.tikiFetch();
    }

    tikiFetch() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic")
            .then(res => res.json())
            .then((resJSON) => {

                //console.log(resJSON.drinks);
                // for (let i =1;  i < resJSON.drinks.length; i++){
                //     console.log(resJSON.drinks[i]);
                // }
                let responseDrinks = resJSON.drinks;
                let ingredients = []; //declare ingredients array
                let measurements = []; //declare measurements array
                let measureIngredients = []; //declare measurement - ingredients array
                //let drinkName = recipe.strDrink; //drink name
                //let drinkImg = recipe.strDrinkThumb; //drink thumbnail
                //let drinkInstruct = recipe.strInstructions; //drink instructions

                //collect ingredients - up to 15
                // for (let i = 1; i <= 15; i++) {
                //     let ingredient = "strIngredient" + i;
                //     if (recipe[ingredient] !== null) {
                //         ingredients.push(recipe[ingredient])
                //     }
                // }

                //collect measurements - up to 15
                // for (let i = 1; i <= 15; i++) {
                //     let measurement = "strMeasure" + i;
                //     if (recipe[measurement] !== null) {
                //         measurements.push(recipe[measurement])
                //     }
                // }

                //concatenate measurements + ingredients 
                // for (let i = 0; i < measurements.length; i++) {
                //     let combined = measurements[i] + ' ' + ingredients[i];
                //     measureIngredients.push(combined);
                // }

                this.setState({
                    isLoaded: true,
                    responseDrinks: responseDrinks
                    // responseItem: recipe,
                    // measureIngredients: measureIngredients,
                    // drinkName: drinkName,
                    // drinkInstruct: drinkInstruct,
                    // drinkImg: drinkImg
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

    cardToggle(e) {
        (console.log("TOGGLED"))
        console.log(e.target)
        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped
        }));
    }

    render() {
        const { error, isLoaded, isFlipped, responseDrinks, measureIngredients, drinkName, drinkInstruct, drinkImg, drinkId } = this.state;
        console.log(responseDrinks);
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading Beachbums...</div>
        } else {
            return (
                <div className="tiki-cards">
                   
                        {responseDrinks.map(drink => (
                        <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                                <Card id={drink.IdDrink} onClick={(e) => this.cardToggle(e)}>
                                    {console.log({drink})}
                                    <Card.Img variant="top" src={drink.strDrinkThumb} />
                                    <Card.Body>
                                        <Card.Title>{drink.strDrink}</Card.Title>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{drink.IdDrink}</small>
                                    </Card.Footer>
                                </Card>
                            
                                <Card id={drink.IdDrink} onClick={() => this.cardToggle()}>
                                    <Card.Img variant="top" src='' />
                                    <Card.Body>
                                        <Card.Title>BACK</Card.Title>
                                        <Card.Text>
                                            back of drink: {drink.strDrink}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                               </ReactCardFlip>
                            ))}
                   
                </div >
            )
        }

    }
}

export default SearchByTiki;