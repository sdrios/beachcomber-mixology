import React from 'react';
import { Button } from 'react-bootstrap';


class Search extends React.Component {


    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            buttons: [
                { name: "spirit", content: "Search By Spirit", active: false },
                { name: "ingredient", content: "Search By Ingredient", active: false },
                { name: "glass", content: "Search By Glass", active: false },
                { name: "random", content: "Surpise Me", active: false },
                { name: "tiki", content: "Feelin' Tiki", active: false },
                { name: "favorites", content: "Favorites", active: false }
            ],
            searchType: "spirit"

        }
    }

    handleClick(index) {
        let newState = this.state;

        // let activeButton = newState.buttons.filter( (button) =>{
        //     return button.active === true; //returns array of button objects that are active
        // });
        // console.log(activeButton);

        //handle previously active button
        newState.buttons.map((button, i) => {
            if (button.active) {
                button.active = false;
            }
        })
        //make selected button active
        newState.buttons[index].active = !newState.buttons[index].active

        //set search type
        let searchType = newState.searchType = newState.buttons[index].name;
        console.log(searchType)

        this.setState({
            newState
        }, function () {
            console.log("State after click function:" +
                newState)
        });
    }

    render() {
        return (
            <div className="search" >
                <div className="buttons">
                    {this.state.buttons.map((button, i) =>
                        <Button key={button.name} variant="outline-success" active={button.active} onClick={() => this.handleClick(i)}>{button.content}</Button>
                    )}
                </div>
                <div className={this.state.searchType}>

                    
                </div>
            </div>
        )
    }
}

export default Search;