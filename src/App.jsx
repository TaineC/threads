import React, {Component} from 'react';
import ProductListings from './ProductListings';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Login from './Login';
import UserProfile from './UserProfile';
import UserProducts from './UserProducts';
import RouteProductDetailsReview from './RouteProductDetailsReview';
import RouteProductDetails from './RouteProductDetails';
import PurchaseProductListings from './PurchaseProductListings';
import RouteCat from './RouteCategory';
import RouteThanks from './RouteThanks';
import RouteFeaturedProduct from './RouteFeaturedProduct';
import Footer from './Footer';
import RouteProductSearch from './RouteProductSearch';
import RouteOurStore from './RouteOurStore';
import RouteErrorPage from './RouteErrorPage';

import {Accordion,Nav,Navbar,Container,Card,Image} from 'react-bootstrap';
import './App.css';
import Modal from 'react-awesome-modal';
import {Router, Link, navigate} from '@reach/router';
import 'react-multi-carousel/lib/styles.css';
import { FiChevronDown,FiChevronLeft,FiSearch  } from "react-icons/fi";
import { IoIosClose,IoIosAdd } from "react-icons/io";
import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap';
import {api,server} from './API';

class App extends Component{
  constructor(props){
  super(props);
  this.toggle = this.toggle.bind(this);
    this.state = {
      visible: false,
      currentUser:null,
      categories: [],
      dropdownOpen: false,
    }
  }

openModal = () => {
    this.setState({visible: true});
}

closeModal = () => {
    this.setState({visible: false});
}

handleLogOut=()=>{
    localStorage.removeItem('userID')
    this.setState({currentUser:null})
    navigate('/')
}
updateCurrentUser=(user)=>{
    this.setState({currentUser:user})
}

goHome = (e) => {
    e.preventDefault();
    navigate("/")
}

goBack = (e) => {
    e.preventDefault();
    window.history.back()
}

toggle() {
  this.setState({
    dropdownOpen: !this.state.dropdownOpen
  });
}

addDefaultSrc(ev){
  ev.target.src = '/default.png'
}

componentDidMount = () => {
  var userLocal = localStorage.getItem('userID')
    if(userLocal){
      api.getUser(userLocal).then(res=>this.setState({currentUser:res.data}))
    }
    api.getCategories().then(res => this.setState({categories:res.data}))
}

refreshCurrentUser = () => {
  api.getUser(this.state.currentUser.id).then(res=>this.setState({currentUser:res.data}))
}

render(){
  var {categories} = this.state;
      
  return(
    <Container className="wrap">

    <Container className="modalStyle">
      <Modal
        visible={this.state.visible}
        width="95%"
        height="80%"
        effect="fadeInUp"
        onClickAway={() => this.closeModal()}>
        <div className="loginModal">
          <span>
            <h6>Login/Register to Buy & Sell</h6>
            <a onClick={() => this.closeModal()}><IoIosClose/></a>
          </span>
          <Login closeModal={this.closeModal} updateCurrentUser={this.updateCurrentUser}/>
        </div>
        </Modal>
      </Container>

      <div className="Header">
        <Navbar
          className="Navbar"
          collapseOnSelect="collapseOnSelect"
          expand="lg"
          bg="dark"
          variant="dark">
            <Container className="navBarbot">  
              <Link to="/"><Image className="Logo" src={require('./logo.png')} fluid="fluid"/></Link>
                {
                  this.state.currentUser ? null :
                    <><input
                        className="loginButton"
                        type="button"
                        value="Login / Register"
                        onClick={() => this.openModal()}/>
                    </>
                }
                {
                  this.state.currentUser ? (
                    <>
                      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle
                          tag="div"
                          className="adminToggle"
                          onClick={this.toggle}
                          data-toggle="dropdown"
                          aria-expanded={this.state.dropdownOpen}
                          >
                          <Image className="navbar-default"src={server+this.state.currentUser.photo} thumbnail={true} onError={this.addDefaultSrc}/> 
                        </DropdownToggle>
                        <DropdownMenu>
                          <Link onClick={this.toggle} to="/products/new"><IoIosAdd/> Sell an Item</Link>
                          <Link onClick={this.toggle} to={'/users/' + this.state.currentUser.id} >User Profile</Link>
                          <Link onClick={this.toggle} to="/products">My Products</Link>
                          <Link onClick={this.toggle} to="/my-reviews">My Reviews</Link>
                          <input
                            className="loginButton"
                            type="button"
                            value="Logout"
                            onClick={this.handleLogOut}/>
                        </DropdownMenu>
                      </Dropdown>
                    </>
                  ) : null}
            </Container>
        </Navbar>
      </div>

      <div className="section">
        <div className="catagories">
          <Accordion className="FilterCat">
            <Card>
              <Card.Header>
                <span onClick={this.goBack} className="backArrow" to="/"><FiChevronLeft/></span>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    <h5>CATAGORIES</h5><FiChevronDown/>
                  </Accordion.Toggle>
                  <Link to="/search" ><FiSearch className="searchIcon"/></Link>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Nav className="browseNav" variant="pills" defaultActiveKey="/home">
                  {
                    categories.map(categories =>  <Link className="browseNavButton" to={'/categories/'+categories.name}>{categories.name}</Link>)
                  }
                </Nav>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>

      <Router>
        <RouteProductSearch path="/search"/>
        <ProductListings path="/"/>
        <RouteCat path="/categories/:id"/>
        { this.state.currentUser ?<UserProducts path="/products" user={this.state.currentUser} refreshCurrentUser={this.refreshCurrentUser}/> : null}
        { this.state.currentUser ?<AddProduct path="/products/new"user={this.state.currentUser} refreshCurrentUser={this.refreshCurrentUser}/> : null}
        { this.state.currentUser ?<EditProduct path="/products/:id/edit" refreshCurrentUser={this.refreshCurrentUser}/> : null}
        <RouteProductDetails path="/products/:id" user={this.state.currentUser}/>
        <RouteThanks path="/thanks"/>
        { this.state.currentUser ? <PurchaseProductListings path="/purchases" user={this.state.currentUser} /> : null}
        { this.state.currentUser ? <UserProfile path="/users/:id" logout={this.handleLogOut} user={this.state.currentUser} updateCurrentUser={this.updateCurrentUser}/> : null}
        <RouteFeaturedProduct path="/featured"/>
        <RouteProductDetailsReview currentUser={this.state.currentUser} path="/review-products/:id"/>
        <RouteOurStore path="/our-store"/>
        <RouteErrorPage default path="/not-found"/>       
      </Router>
      
      <Footer/>
      </Container>
    );
  }
}

export default App;
