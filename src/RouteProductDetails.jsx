import React, {Component} from 'react';
import {Link, navigate} from '@reach/router';
import {
    Form,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Card,
    Row,
    Container,
    Col,
    Image,
} from 'react-bootstrap';
import {api, server} from './API';
import Modal from 'react-awesome-modal';
import Login from './Login';

class RouteProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // currentUser: {},
            mLogin: false,
            mCreditCard: false,
            product:{},
            seller:{},
        }
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

    render() {
        var {name,description,price,photos} = this.state.product
        var {user} = this.props
        var seller = this.state.seller;
        console.log('seller')
        console.log(seller)
        console.log('buyer')
        console.log(user)
        return ( 
            <>
            <div className="Item">
                <Card>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Img variant="top" src={server + photos} onError={this.addDefaultSrc}/>
                        <Card.Text>{description}</Card.Text>
                        <Card.Text className="productPrice">${price}
                            {user && user.id!=seller.id? (<> 
                                {
                                    user ? ( <Form className="purchaseForm" onSubmit={() => this.openCreditModal()} ref={(el) => {this.form = el}} >
                                            < Button onClick = {() => this.openCreditModal()}className = "purchaseButton" name = "purchase" variant = "outline-dark" > Purchase</Button></Form>
                                    ) : <Button onClick={() => this.openLoginModal()} className="purchaseButton" name="purchase" variant="outline-dark">Purchase</Button>
                            }</>) : null
                            }
                        </Card.Text>
                            <Col xs={3}>
                           <Link to={'/users/' + seller.id} ><Image  src={server+seller.photo} roundedCircle thumbnail={true}/></Link>
                           <Link to={'/users/' + seller.id}>{seller.name}</Link>
                            </Col>
                            
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
                    <Form
                        className="purchaseForm"
                        onSubmit={this.handlePurchase}
                        ref={(el) => {
                            this.form = el
                        }}>
                        <Form.Row>
                            <Col>
                                <Form.Control placeholder="First name"/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Last name"/>
                            </Col>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Row>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Street Address"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Address 2"/>
                                </Col>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Ph Number"/>
                                </Col>
                            </Form.Row>
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">
                            <Form.Row>
                              <Col>
                                <Form.Control placeholder="City"/>
                                 </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group controlId="formGridAddress1">
                        <Form.Row>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Name on Card"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Card Number"/>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="Expiry"/>
                                </Col>
                                <Col>
                                    <Form.Label></Form.Label>
                                    <Form.Control placeholder="cvv"/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Button
                            type="submit"
                            className="purchaseButton"
                            name="purchase"
                            variant="outline-dark">Purchase</Button>
                        </Form>
                </Container>
            </Modal>
            </>
     )
    }
  }

export default RouteProductDetails;
