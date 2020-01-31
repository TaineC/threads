import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap';

class RouteOurStore extends Component{

  render(){
    return(
      <Container className="NoPad">
        <Row className="container">
          <h3>Our Store</h3>
          <p> We stock a huge range of new & second hand trade in's. We check the listing matches the product for quality assurance, verify and then list.</p>
          <p>Duis elit nunc, congue sit amet porta sed, faucibus id massa. Aliquam consequat faucibus odio, vel sagittis neque dictum sed. Curabitur ut finibus eros, ac tempor sapien.</p>
        </Row>
      </Container>
    );
  }
}

export default RouteOurStore;
