import React from 'react';
import { Form } from 'react-bootstrap';

class SearchBySpirit extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "spirit",
            spirits: ["Gin", "Rum", "Vodka", "Tequilla", "Whiskey", "Bourbon", "Brandy"]
        }
    }
    render() {
        let spiritsList = this.state.spirits;

        return (
            <div className={this.state.searchType}>
                SEARCH BY SPIRIT:
                <Form>
                    <div key={`spirit-radio`} className="mb-3">
                        {spiritsList.map(spirit => (
                            <Form.Check
                                type='radio'
                                id={spirit}
                                label={spirit}
                            />
                        ))
                        }

                    </div>
                </Form>
            </div>
        )
    }
}

export default SearchBySpirit;