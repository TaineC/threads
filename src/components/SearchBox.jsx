import React from 'react';
import {
    Form,
} from 'react-bootstrap';

function SearchBox(props) {
    return (
        <>
            <Form inline>
                <Form.Control onChange={props.handleInput} type="text" type="text" placeholder="Search..." className="mr-sm-2"/>
            </Form>
        </>
    )
}

export default SearchBox;