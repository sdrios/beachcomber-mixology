import React from 'react';

class SearchByTiki extends React.Component {
constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "tiki"
        }
    }
    render() {
        return (
            <div className = {this.state.searchType}>
                SEARCH BY TIKI
            </div>
        )
    }

}

export default SearchByTiki;