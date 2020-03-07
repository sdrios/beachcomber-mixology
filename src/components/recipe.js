import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            responseItem: '',
            ingredients: [],
            measurements: [],
            drinkName: '',
            drinkInstruct: '',
            drinkImg: '',
            drinkId:'',
            isFlipped: false
        }
    }

    cardToggle(e) {
        this.setState(prevState => ({
            isFlipped: !prevState.isFlipped
        }));
    }
    
    render() {
        const {measureIngredients, drinkName, drinkInstruct, drinkImg, drinkId } = this.props;
        const {isFlipped} = this.state;
            return (
                <div className="recipe-card-component">
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                        <Card style={{ width: '18rem' }} id={drinkId} onClick={(e) => this.cardToggle(e, drinkId)}>
                            <Card.Img src={drinkImg} />
                        </Card>

                        <Card style={{ width: '18rem' }} id={drinkId} onClick={(e) => this.cardToggle(e, drinkId)}>
                            <Card.Img variant="top" src='' />
                            <Card.Body>
                                <Card.Title>BACK</Card.Title>
                                <Card.Text>
                                    back of drink: {drinkName}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </ReactCardFlip>
                </div >
            )
        }
    }



export default Recipe;