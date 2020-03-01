import React from 'react';
import {Form} from 'react-bootstrap';

class SearchByGlass extends React.Component {
constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "glass"
        }
    }
    render() {
        return (
            <div className = {this.state.searchType}>
                SEARCH BY GLASS
            </div>
        )
    }

}

export default SearchByGlass;