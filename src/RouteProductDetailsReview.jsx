import React, {Component} from 'react';
// import {Link, navigate} from '@reach/router';
import Review from './Review';
import {Form,Button,ToggleButtonGroup,ToggleButton,Card, Carousel} from 'react-bootstrap';
import {api, server} from './API';

import './App.css';

class RouteProductDetailsReview extends Component{
  constructor(props){
    super(props);
    this.state = {
      product:null,
      currentUser:{},
    }
  }
  routeGetProduct = (id) => {
    api.getProduct(id).then(res => this.setState({product:res.data}))
  }

  componentDidMount(){
    var {id} = this.props
    //console.log(id);
    this.routeGetProduct(id)
  }
  handleReviewFormSubmit = (e) => {
    e.preventDefault();

  
    var formData = new FormData(this.reviewForm);

    var productId = this.props.id;
    var {product} = this.state 
    var data = {
      comment:formData.get('comment-input'),
      rating:formData.get('rating-input'),
      prod_id: productId,
      purchaser_id: this.props.currentUser.id,
      seller_id: product.seller_id
    }
    api.addReview(data).then(res => {
      this.reviewForm.reset()
      this.routeGetProduct(productId)
    })
  }

  handlePurchase = (e) => {
    e.preventDefault();

    var user_id = localStorage.getItem('userID')

    var data = {
      purchaser_id:user_id,
    }
    var {id} = this.props;
    api.updateProducts(id,data)
  }
  
  render(){
    var {product} = this.state;

    return product ? (
      <>
      <div className="Item">
        <Card style={{width: '18rem'}}>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Img variant="top" src={server+product.photos}/>
              <Carousel interval={null}>
                {
                  product.photos ? product.photos.map(photo => 
                    <Carousel.Item className="productImage">
                      <Card.Img variant="top" src={server+photo}/>
                    </Carousel.Item>) : null
                }
              </Carousel>
            <Card.Text className="first_cardText"><p className="tag_product">DESCRIPTION:</p><p>{product.description}</p></Card.Text>
            <Card.Text className="productPrice"><p className="tag_product">PRICE:</p> <p>${product.price}</p><Form className="purchaseForm" onSubmit={this.handlePurchase} ref={(el) => {this.form = el}} ></Form></Card.Text>
          </Card.Body>
        </Card>
      </div>
      {product.review ? <Review review={product.review} refreshData={() => this.routeGetProduct(product.id)} /> : (
      <Form className="reviewForm addReview" 
        onSubmit={this.handleReviewFormSubmit} 
        ref={(el) => {this.reviewForm = el}}
      >
        <h3>Add a Review</h3>
        <Form.Group controlId="formGridComment">
          <Form.Label>Comment:</Form.Label>
          <Form.Control type="text" className="form-control" name="comment-input" id="comment-input" placeholder="Enter Comment"/>
        </Form.Group>

        <Form.Group controlId="formGridRating">
        <Form.Label>Rating:</Form.Label>
        <ToggleButtonGroup type="radio" required="true" className="form-control" name="rating-input" id="rating-input">
          <ToggleButton value={1}>★</ToggleButton>
          <ToggleButton value={2}>★★</ToggleButton>
          <ToggleButton value={3}>★★★</ToggleButton>
          <ToggleButton value={4}>★★★★</ToggleButton>
          <ToggleButton value={5}>★★★★★</ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Review
        </Button>
      </Form>
    )}   
   </>) : null;
  }
}

export default RouteProductDetailsReview;
