import React from 'react';
import { Button } from 'react-bootstrap';
import SearchBySpirit from './spirit';
import SearchByIngredient from './ingredient';
import SearchByRandom from './random';
import SearchByTiki from './tiki';

class Search extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            buttons: [
                { name: "tiki", content: "Feelin' Tiki", active: false },
                { name: "spirit", content: "Search By Spirit", active: false },
                { name: "ingredient", content: "Search By Ingredient", active: false },
                { name: "random", content: "Surpise Me", active: false },
            ],
            searchType: "tiki"
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
                        <Button className="search-button" variant="info" key={button.name} active={button.active} onClick={() => this.handleClick(i)}>{button.content}</Button>
                    )}
                </div>
                <div className="search-components">
                {component}
                </div>
            </div>
        )
    }
}

export default Search;