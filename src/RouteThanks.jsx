import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

class RouteThanks extends Component{

  render(){
    return(
      <Container>
        <h1>Thank You</h1>
        <p>We'll get started on your order right away. <br></br>You should be receiving an order confirmation email shortly.</p>
        <p>If you have any questions call us on <br></br><b>0800 656 6565</b></p>
      </Container>
    );
  }
}

export default RouteThanks;
