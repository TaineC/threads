import React, {Component} from 'react';
import {navigate} from '@reach/router';
import {api} from '../API';

import {
	Col,
	Button,
	Form,
  } from 'react-bootstrap';

class EditProduct extends Component{
  constructor(props){
		super(props)
		this.state = {
			product: {},
		}
	}

	componentDidMount(){
		var {id} = this.props;  

		api.getProduct(id).then(res => {
			this.setState({product: res.data})
		})
	}
	
	submitForm = (e) => {

		e.preventDefault();

		var {photos} = this.state.product;

		var form = new FormData(this.form);

		api.uploadPhotos(form).then(res => {
			var files = res.data;

			var data = {
				name: form.get('name-input'),
				description: form.get('description-input'),
				price: form.get('price-input'),
				photos: [...photos,...files],
			}

			var {id} = this.props;
			api.updateProduct(id, data)
			.then(() =>{
				this.props.refreshCurrentUser()
				navigate('/products')
			})
		})
	}


  render(){

	var {name,description,price} = this.state.product;

    return(
		
	<Form className="productForm" onSubmit={this.submitForm} ref={(el) => {this.form = el}}>
        <h3>Edit your product</h3>
        <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
				<Form.Control type="text" className="form-control" name="name-input" controlId="name-input" defaultValue={name}/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPrice" className="formGridPrice">
				$ <Form.Control type="currency" className="form-control" name="price-input" controlId="price-input" defaultValue={price}/>
            </Form.Group>
        </Form.Row>

        <Form.Group controlId="formGridDescription">
            <Form.Control type="text" className="form-control" name="description-input" controlId="description-input" defaultValue={description}/>
        </Form.Group>
        <Form.Group controlId="formGridFile">
            <Form.Control type="file" className="form-control" name="photo-input" controlId="photo-input" placeholder="Add photo" multiple/>
        </Form.Group>
        <Button variant="primary" type="submit">Update Product</Button>
    </Form>
    );
  }
}

export default EditProduct;
