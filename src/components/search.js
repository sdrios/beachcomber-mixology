import React from 'react';
import { Button } from 'react-bootstrap';


class Search extends React.Component {


    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            buttons: [
                {name:"spirit", content:"Search By Spirit", active:false},
                {name:"ingredient", content:"Search By Ingredient", active:false},
                {name:"glass", content:"Search By Glass", active:false},
                {name:"random", content:"Surpise Me", active:false},
                {name:"tiki", content:"Feelin' Tiki", active:false},
                {name:"favorites", content:"Favorites", active:false}  
            ]
        }
    }

    handleClick(i) {
        console.log(this)
        console.log(this.state)

        let newState = this.state;
        newState.buttons[i].active = !newState.buttons[i].isActive
        this.setState({
           newState
        }, function () {
            console.log(this)
            console.log(this.state)
            console.log(this.newState)

        });   
    }

    render() {
        return (
            <div className="search-options" >
                {this.state.buttons.map((button, i) =>
                <Button id={button.name}variant="outline-success" active={button.active} onClick={()=> this.handleClick(i)}>{button.content}</Button>
                )}
            </div>
        )
    }
}

export default Search;