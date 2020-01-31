import React, {Component} from 'react';
import {Container} from 'react-bootstrap';

class RouteErrorPage extends Component{

  render(){
    return(
      <Container>
        <h1>Error!</h1>
       <p>Sorry this page no longer exists</p>
      </Container>
    );
  }
}

export default RouteErrorPage;
