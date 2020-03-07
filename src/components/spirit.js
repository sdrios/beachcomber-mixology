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
            <div className="spirit-search">
                <Form className="spirit-form" onSubmit={(e) => this.handleSubmit(e)}>

                    {spiritsList.map(spirit => (
                        <Form.Check
                            className="spirit-item"
                            key={spirit}
                            label={spirit}
                            value={spirit}
                        />
                    ))
                    }

                    <Button variant="info" type="submit"> Submit</Button>
                </Form>
            </div>

        )
    }
}

export default SearchBySpirit;