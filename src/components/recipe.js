import React from 'react';
import { Card } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            drinkInstruct: '',
            ingredients: []
        }
    }

    cardToggle(e, drinkId) {
        let strId = drinkId.toString();
        if (!this.state.isFlipped) {
            console.log("simulate back fetch")
            console.log(drinkId)

            fetch(`https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=${strId}`)
                .then(res => res.json())
                .then((resJSON) => {
                    let instructions = resJSON.drinks[0].strInstructions
                    let recipe = resJSON.drinks[0]
                    let ingredients = []; //declare ingredients array

                    //collect ingredients and measurements - up to 15
                    for (let i = 1; i <= 15; i++) {
                        let ingredient = "strIngredient" + i;
                        let measurement = "strMeasure" + i;
                        if (recipe[ingredient] !== (null)) {
                            ingredients.push(`${recipe[measurement]} ${recipe[ingredient]}`)
                        }
                    }
                    this.setState({
                        drinkInstruct: instructions,
                        ingredients: ingredients
                    });
                })
        }

        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped
        }));
    }

    render() {
        const { drinkName, drinkImg, drinkId } = this.props;
        const { isFlipped, ingredients, drinkInstruct } = this.state;

        return (
            <div className="recipe-card-component">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                    <Card style={{ width: '18rem' }} id={drinkId} onClick={(e) => this.cardToggle(e, drinkId)}>
                        <Card.Img src={drinkImg} />
                    </Card>

                    <Card style={{ width: '18rem' }}  onClick={(e) => this.cardToggle(e, drinkId)}>
                      
                        <Card.Body>
                            <Card.Title>{drinkName}</Card.Title>
                            <Card.Text>
                                <ul>
                                    {ingredients.map((ingredient, index) => (
                                        <li key={index} >{ingredient}</li>
                                    ))
                                    }
                                </ul>
                                {drinkInstruct}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </ReactCardFlip>
            </div >
        )
    }
}


export default Recipe;