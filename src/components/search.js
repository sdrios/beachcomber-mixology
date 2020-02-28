import React from 'react';
import { Button } from 'react-bootstrap';


class Search extends React.Component {


    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            isActive: false
        }
    }

    handleClick() {
        console.log("button clicked");
        console.log(this)
        this.setState({
            isActive: true
        }, function () {
            // setState is asynchronous! This function gets called
            // when it's finished.
            console.log("Job's done");
        });
        console.log(this)


    }

    render() {
        return (
            <div className="search-options" >
                <Button id="spirit" variant="outline-success" isActive={this.state.isActive?"true":"false"} onClick={this.handleClick.bind(this)}>Search by Spirit</Button>
                <Button id="ingredients" variant="outline-success" onClick={this.handleClick}>Search by Ingredients</Button>
                <Button id="glass" variant="outline-success" onClick={this.handleClick}>Search by Glass Type</Button>
                <Button id="surprise" variant="outline-success" onClick={this.handleClick}>Surprise Me!</Button>
                <Button id="tiki" variant="outline-success" onClick={this.handleClick}>I'm Feelin' Tiki!</Button>
                <Button id="favorites" variant="outline-success" onClick={this.handleClick}>Browse Favorites</Button>
            </div>
        )
    }
}

export default Search;