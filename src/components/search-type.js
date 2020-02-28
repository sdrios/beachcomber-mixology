import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';


class SearchType extends React.Component {

constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            value: 0
        }
    }
    
    render() {
        return (
            <div>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </div>
        )
    }

}

export default SearchType