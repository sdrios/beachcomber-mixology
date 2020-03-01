import React from 'react';

class SearchByRandom extends React.Component {
constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "Random"
        }
    }
    render() {
        return (
            <div className = {this.state.searchType}>
                SEARCH BY RANDOM
            </div>
        )
    }

}

export default SearchByRandom;