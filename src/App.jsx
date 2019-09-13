import React, {Component} from 'react';
import axios from 'axios';
import {Router, Link, navigate} from '@reach/router';
import ProductListings from './ProductListings';
import Products from './Products';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Login from './Login';
import Product from './Product';
import PurchaseProductDetail from './PurchaseProductDetail';
import RouteProductDetails from './RouteProductDetails';
import PurchaseProductListings from './PurchaseProductListings';
import {
  Accordion,
  Card,
  Button,
  Nav,
  Navbar,
  Container,
  Row,
  Col,
  Image,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import './App.css';
import Modal from 'react-awesome-modal';
import 'react-multi-carousel/lib/styles.css';

import './App.scss';
import {api} from './API';



class App extends Component{
  constructor(props){
  super(props)
    this.state = {
      visible: false,
      currentUser:{},
    }
  }

openModal() {
    this.setState({visible: true});
}

closeModal() {
    this.setState({visible: false});
}

handleLogOut=()=>{

}
componentDidMount=()=>{
    api.getUser(1).then(res=>{
        console.log(res)
        this.setState({currentUser:res.data})
    })
}
  render(){
    return(


      <div className="wrap">

      <Modal
          visible={this.state.visible}
          width="95%"
          height="80%"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}>
          <div className="loginModal">

              <span>
                  <h6>Login or Register to buy & sell</h6>
                  <a href="javascript:void(0);" onClick={() => this.closeModal()}>
                      <i className="far fa-window-close"></i>
                  </a>
              </span>
          <Login/>

          </div>
      </Modal>

      <div className="Header">
      {/* {
    currentUser? (<span>Welcome {currentUser.name}</span>) : null
  } */}
          <Navbar
              className="Navbar"
              collapseOnSelect="collapseOnSelect"
              expand="lg"
              bg="dark"
              variant="dark">
              <Link to="/home"><Image className="Logo" src={require('./logo.png')} fluid="fluid"/></Link>
              <div className="navBarbot">

                  <InputGroup className="searchBar">
                      <InputGroup.Append>
                          <Button variant="outline-secondary">
                              <i className="fas fa-search"></i>
                          </Button>
                      </InputGroup.Append>
                      <FormControl
                          placeholder="Search"
                          aria-label="Search"
                          aria-describedby="basic-addon2"/>
                       </InputGroup>
                       <input
                                                                              className="loginButton"
                                                                              type="button"
                                                                              value="Login"
                                                                              onClick={() => this.openModal()}/>
                       <Navbar.Toggle className="userControl" aria-controls="responsive-navbar-nav"/>

                      <Navbar.Collapse id="responsive-navbar-nav">
                          <Nav className="mr-auto">
                              <Nav.Link href="/products/new">+ Sell an Item</Nav.Link>
                              <Nav.Link href="/user-profile">User Profile</Nav.Link>
                              <Nav.Link href="/products">My Products</Nav.Link>
                              <Nav.Link href="#watchlist">Watch List</Nav.Link>
                              <Nav.Link href="/my-reviews">My Reviews</Nav.Link>
                              <Nav.Link href="/purchases">Purchase Products</Nav.Link>
                          </Nav>
                      </Navbar.Collapse>
                     
                      {/* {
                          currentUser ? (
                          <>
                          
                          <Navbar.Toggle className="userControl" aria-controls="responsive-navbar-nav"/>

                          <Navbar.Collapse id="responsive-navbar-nav">
                              <Nav className="mr-auto">
                                  <Nav.Link href="#sell">+ Sell an Item</Nav.Link>
                                  <Nav.Link href="#userprofile">User Profile</Nav.Link>
                                  <Nav.Link href="#watchlist">Watch List</Nav.Link>
                                  <Nav.Link href="#reviews">My Reviews</Nav.Link>
                              </Nav>
                          </Navbar.Collapse>
                          </>
                          ) : (
                          <>
          <input
                                              className="loginButton"
                                              type="button"
                                              value="Login"
                                              onClick={() => this.openModal()}/>
                          </>
                          )
                      } */}


              </div>
          </Navbar>
      </div>
      <div className="section">

          <div className="catagories">
              <Accordion className="FilterCat">
                  <Card>
                      <Card.Header>
                          <Accordion.Toggle as={Card.Header} eventKey="0">
                              <h5>BROWSE</h5>
                          </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                          <Nav variant="pills" defaultActiveKey="/home">
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-1">NEW ITEMS</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-2">Suits</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-3">Footwear</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-4">Clothing</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-5">Outdoors</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-6">Active Wear</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-7">Accessories</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-8">Mobile Phones</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-9">Toys</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-10">Books</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-11">Mobile Phones</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-12">Gaming</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-13">Music & Instruments</Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                  <Nav.Link eventKey="cat-14">Random</Nav.Link>
                              </Nav.Item>
                          </Nav>
                      </Accordion.Collapse>
                  </Card>
              </Accordion>
          </div>
         
      
          <Router>
            <ProductListings path="/home"/>
            <Products path="/products"/>
            <AddProduct path="/products/new"/>
            <EditProduct path="/products/:id/edit"/>
            <RouteProductDetails path="/products/:id"/>
            <PurchaseProductListings user={this.state.currentUser}path="/purchases"/>
          </Router>
 
          </div>
          <div className="footer">
                <Container>
                <Row>
                    <Col>Copyright 2019 threads</Col>
                </Row>
                </Container>
          </div>
        </div>
    );
  }
}

export default App;
