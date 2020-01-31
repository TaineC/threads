import React, {Component} from 'react';
import {Link, navigate} from '@reach/router';
import {
    Form,
    Button,
    Card,
    Row,
    Container,
    Col,
    Image,
    Carousel,
} from 'react-bootstrap';
import {api, server} from '../API';
import Modal from 'react-awesome-modal';
import TextValidator from './TextValidator';
import { ValidatorForm } from 'react-form-validator-core';
import Login from './Login';

class RouteProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mLogin: false,
            mCreditCard: false,
            product:{},
            seller:{},
            firstName:'',
            lastName:'',
            NameCard:'',
            CardNumber:'',
            Expiry:'',
            cvv:'',
        }
    }
    handleInputChange = (e) => {
        var value = e.target.value
        var inputName = e.target.name
    
    
        var  stateData =  {}
        stateData[inputName] = value
    
        this.setState(stateData)
      }
    openLoginModal = () => {
        this.setState({mLogin: true});
    }

    closeLoginModal = () => {
        this.setState({mLogin: false});
    }

    openCreditModal = () => {
        this.setState({mCreditCard: true});
    }

    closeCreditModal = () => {
        this.setState({mCreditCard: false});
    }

    routeGetProduct = (id) => {
        api.getProduct(id).then(res => {
            this.setState({product:res.data})
            api.getUser(res.data.seller_id).then(res=>{
                this.setState({seller:res.data})
            })
            
        })
    }

    addDefaultSrc(ev){
        ev.target.src = '/coming-soon.png'
      }
    
    componentDidMount(){
        var {id} = this.props;
        this.routeGetProduct(id);
        
    }

    handlePurchase = (e) => {
    e.preventDefault();

    var user_id = localStorage.getItem('userID')

    var data = {
      purchaser_id:user_id,
    }
        var {
            id
        } = this.props;
        api
            .updateProducts(id, data)
            .then(res => navigate("/thanks"))
    }

    addDefaultSrc(ev){
        ev.target.src = '/coming-soon.png'
    }

    render() {
        var {name,description,price,photos} = this.state.product;
        var {user} = this.props;
        var seller = this.state.seller;
        return ( 
            <>
            <div className="Item">
                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Carousel interval={null}>
                            {
                            photos ? photos.map(photo => 
                                <Carousel.Item className="productImage">
                                    <Card.Img variant="top" src={server+photo} onError={this.addDefaultSrc}/> 
                                </Carousel.Item>) : null
                            }
                        </Carousel>
                        <Col className="productDetailsInfo">
                        <Card.Text className="productDesc">{description}</Card.Text>
                        <Card.Text className="productPrice">$ {price}
                            {user? (user && user.id!==seller.id? 
                                ( <Form className="purchaseForm" onSubmit={() => this.openCreditModal()} ref={(el) => {this.form = el}} >
                                            < Button onClick = {() => this.openCreditModal()}className = "purchaseButton" name = "purchase" variant = "outline-dark" > Purchase</Button></Form>
                                    ) : null
                            ): (<Button onClick={() => this.openLoginModal()} className="purchaseButton" name="purchase" variant="outline-dark">Purchase</Button>)}
                            
                        </Card.Text>
                        </Col>
                            <Col xs={3}>
                                {seller.deleted_at != null ? <Link to={'/not-found'} >
                               <Image  src={server+seller.photo}  thumbnail={true}/>
                            </Link>
                            : <Link className="sellerPhoto" to={'/users/' + seller.id} >
                               <Image  src={server+seller.photo}  thumbnail={true}/>
                            </Link>}
                            
                            
                            {seller.deleted_at != null?<Link to={'/not-found'}>{seller.name}</Link>:<Link className="sellerId" to={'/users/' + seller.id}>{seller.name}</Link>}</Col>
                            
                    </Card.Body>
                </Card>
            </div>
            <Modal className="modalStyle" visible = {this.state.mLogin}width = "95%" height = "80%" effect = "fadeInUp" onClickAway = {() => this.closeLoginModal()}> 
            <div className="loginModal">
                    <span>
                        <h6>Login / Register to Buy & Sell</h6>
                        <a href="javascript:void(0);" onClick={() => this.closeLoginModal()}>
                            <i className="far fa-window-close"></i>
                        </a>
                    </span>
                    <Login
                        closeModal={this.closeLoginModal}
                        updateCurrentUser={this.updateCurrentUser}/>
                </div>
            </Modal>
            <Modal
                className="modalStyle"
                visible={this.state.mCreditCard}
                width="95%"
                height="80%"
                effect="fadeInUp"
                onClickAway={() => this.closeCreditModal()}>
                <Container className="creditCard">
                    <Row className="modalText">
                        <h6>Delivery & Payment Information</h6>
                        <a href="javascript:void(0);" onClick={() => this.closeCreditModal()}>
                            <i className="far fa-window-close"></i>
                        </a>
                    </Row>
                 
                         <ValidatorForm className="purchaseForm" onError={this.formError} onSubmit={this.handlePurchase}
                        ref={(el) => {
                            this.form = el
                        }}>
         
                            <div className="form-group">
                                
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="firstName" 
                                id="firstName" 
                                placeholder="First Name"
                                onChange={this.handleInputChange}
                                value={this.state.firstName}
                                validators={['required','minStringLength:2','maxStringLength:7']}
                                errorMessages={['First name is required','Minimum lenghth is 2 ','Max lenghth is 7']}

                                />
                            </div>

                            <div className="form-group">
                                
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="lastName" 
                                id="lastName" 
                                placeholder="Last Name"
                                onChange={this.handleInputChange}
                                value={this.state.lastName}
                                validators={['required','minStringLength:2','maxStringLength:7']}
                                errorMessages={['Last is required','Minimum lenghth is 2','Max lenghth is 7']}

                                />
                            </div>
                            <div className="form-group">
                                
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="Address" 
                                id="Address" 
                                placeholder="Street Address"
                                />
                            </div>

                            <div className="form-group">
                                
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="Address2" 
                                id="Address2" 
                                placeholder="Address 2"
                                />
                            </div>
                    
                            <div className="form-group">
                                
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="PhNumber" 
                                id="PhNumber" 
                                placeholder="Ph Number"
                            

                                />
                            </div>

                            <div className="form-group">
                            <label htmlFor="name"></label>
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="NameCard" 
                                id="NameCard" 
                                placeholder="Name on Card"
                                onChange={this.handleInputChange}
                                value={this.state.NameCard}
                                validators={['required','minStringLength:2','maxStringLength:12']}
                                errorMessages={['Name is required','Minimum lenghth is 2 ','Max lenghth is 12']}

                                />
                            </div>
                            <div className="form-group">
                            
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="CardNumber" 
                                id="CardNumber" 
                                placeholder="Card Number"
                                onChange={this.handleInputChange}
                                value={this.state.CardNumber}
                                validators={['required','matchRegexp:^4[0-9]{12}(?:[0-9]{3})?$']}
                                errorMessages={['Card Number is required','Card Number is not valid']}
                               

                                />
                            </div>
                            {/* All Visa card numbers start with a 4. New cards have 16 digits. Old cards have 13. */}
 
                            <div className="form-group">
                                
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="Expiry" 
                                id="Expiry" 
                                placeholder="Expiry"
                                onChange={this.handleInputChange}
                                value={this.state.Expiry}
                                validators={['required','matchRegexp:^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$']}
                                errorMessages={['Expiry date is required','Expiry date is not valid']}

                                />
                            </div>
                          
                            <div className="form-group">
                                
                                <TextValidator 
                                type="text" 
                                className="form-control" 
                                name="cvv" 
                                id="cvv" 
                                placeholder="cvv"
                                onChange={this.handleInputChange}
                                value={this.state.cvv}
                                validators={['required','matchRegexp:^([0-9]{3,4})$']}
                                errorMessages={['CVV number is required','CVV number is not validate']}

                                />
                            </div>
                           
                        <button type="submit" type="submit"
                            className="purchaseButton"
                            name="purchase"
                            variant="outline-dark">Purchase</button>
                    </ValidatorForm>
                </Container>
            </Modal>
            </>
     )
    }
  }

export default RouteProductDetails;
