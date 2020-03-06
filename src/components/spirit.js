import React from 'react';
import { Form, Button } from 'react-bootstrap';

class SearchBySpirit extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            searchType: "spirit",
            spirits: ["Gin", "Rum", "Vodka", "Tequilla", "Whiskey", "Bourbon", "Brandy"]
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("SPIRIT SUBMITTED")
        console.log(typeof e.target);
        console.log(e.target);

    }

    render() {
        let spiritsList = this.state.spirits;

        return (
            <div className="spirit">
                <div className="spirit-search">
                    SEARCH BY SPIRIT:
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                        <div key={`spirit-radio`} className="mb-3">
                            {spiritsList.map(spirit => (
                                <Form.Check
                                    className="spirit-item"
                                    type='radio'
                                    key={spirit}
                                    label={spirit}
                                />
                            ))
                            }
                        </div>
                        <Button variant="outline-success" type="submit"> Submit</Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default SearchBySpirit;