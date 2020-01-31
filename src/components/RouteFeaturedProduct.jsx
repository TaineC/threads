import React, {Component} from 'react';
import {Card, Container} from 'react-bootstrap';

class RouteFeaturedProduct extends Component{
  constructor(props){
    super(props);
      this.state = {
    }
  }
  
  render(){
    return(
      <Container className="Item">
        <Card>
          <Card.Body>
            <Card.Title><h5>Emporio Armani Pin Stripe</h5></Card.Title>
            <Card.Text>Emporio Armani is Giorgio Armani’s second line. This two-piece suit includes a jacket with front button fastening, notched lapels, a chest pocket, front flap pockets, button cuffs.</Card.Text>
            <Card.Text>The accompanying trousers are a straight leg cut with creases, a waistband with belt loops.</Card.Text>
            <Card.Text className="productPrice">$1752.00</Card.Text>
            <Card.Text className="productPrice">Featured Product Functionality Coming Soon</Card.Text>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default RouteFeaturedProduct;
