import React from 'react';
import {Form} from 'react-bootstrap';

class SearchByIngredient extends React.Component {
constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "ingredient"
        }
    }
    render() {
        return (
            <div className = {this.state.searchType}>
                SEARCH BY Ingredient
            </div>
        )
    }

}

export default SearchByIngredient;