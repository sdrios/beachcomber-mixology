import React from 'react';
import { Button } from 'react-bootstrap';
import SearchBySpirit from './spirit';
import SearchByIngredient from './ingredient';
import SearchByGlass from './glass';
import SearchByRandom from './random';
import SearchByTiki from './tiki';

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
        let component;
        switch (this.state.searchType) {
            case "spirit":
                component = <SearchBySpirit />
                break;
            case "ingredient":
                component = <SearchByIngredient />
                break;
            case "glass":
                component = <SearchByGlass />
                break;
            case "random":
                component = <SearchByRandom />
                break;
            case "tiki":
                component = <SearchByTiki />
                break;
        }
        
        return (
            <div className="search" >
                <div className="buttons">
                    {this.state.buttons.map((button, i) =>
                        <Button key={button.name} variant="outline-success" active={button.active} onClick={() => this.handleClick(i)}>{button.content}</Button>
                    )}
                </div>
                {component}
            </div>
        )
    }
}

export default Search;