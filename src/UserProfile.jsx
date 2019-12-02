import React, {Component} from 'react';
import UserProducts from './UserProducts';
import PurchaseProductListings from './PurchaseProductListings';
import {api, server} from './API';
import Modal from 'react-awesome-modal';
import SellerReviewProducts from './SellerReviewProducts';
import {
    Tabs,
    Tab,
    Container,
    Col,
    Image,
    Row,
    Form,
    Button,
  } from 'react-bootstrap';

class UserProfile extends Component {
    constructor(props){
    super(props)
    this.state ={
        fileName:this.props.user.photo,
        visible:false,
        user:null,
        sold:'',
        listings:'',
        currentUser:null,
        }
    }

    openModal = () => {
        this.setState({visible: true});
    }
    
    closeModal = () => {
        this.setState({visible: false});
    }

    handlePhotoSubmit=(e)=>{
      var {user} = this.state;
        
      e.preventDefault();

      var form = new FormData(this.userForm)

      api.uploadPhoto(form).then(res=>{
        api.updateUser(user.id,{photo:res.data}).then(res=>{
          this.props.updateCurrentUser(res.data)
          this.setState({fileName:res.data.photo})
        })
      })
    }

    handleEditSubmit =(e)=>{
      e.preventDefault()
      var id= this.state.user.id
      var form = new FormData(this.form);
      var data = {
        name: form.get("name-input"),
        password: form.get("password-input"),
        email: form.get("email-input"),
      }
      api.updateUser(id,data).then(res=>{
        this.props.updateCurrentUser(res.data)
      })
    }

    handleDeleteAccount=(e)=>{
      e.preventDefault()
      api.deleteUser(this.state.user.id)
      this.props.logout()
    }

    getUserProfile=(id)=>{
      api.getUser(id).then(res=>{
        this.setState({user:res.data})
        this.setState({fileName:res.data.photo})
      })
    }

    componentDidMount(){
      this.getUserProfile(this.props.id)
      this.setState({currentUser:this.props.user})
    }

  componentDidUpdate(prevProps){
    var {id} =  this.props
    if(prevProps.id != id){
      this.getUserProfile(this.props.id)
      this.setState({currentUser:this.props.user})
      }
  }

  render(){
    var {user} = this.state
    var {currentUser} = this.state
    var currentListing = user ? user.currentListings.length : 0
    var soldListing = user ? user.sold.length : 0
       
    return user ? (
      <Container>
        <Modal visible={this.state.visible}
          width="95%"
          height="90%"
          effect="fadeInUp"
          onClickAway={() => this.closeModal()}>
            <Form className="editForm" onSubmit={this.handleEditSubmit} ref={(el) => {this.form = el}}>
              <Col xs={5}>
                <Image src={server+this.state.fileName}  thumbnail={true}/>
              </Col>
              <Form className="userProfile" onChange={this.handlePhotoSubmit} ref={(el) => {this.userForm = el}}>
                <Form.Group controlId="formPhoto">
				          <input type="file" className="photo-input" name="Userphoto-input" id="Userphoto-input" placeholder="Change your photo"/>
                </Form.Group>
              </Form>
               
              <Form.Group  controlId="formGridName">
                <Col>
                  <Form.Control type="text" defaultValue={this.state.user.name} name="name-input"/>
                </Col>
              </Form.Group>
              <Form.Group controlId="formGridPassword">
                <Col>
                  <Form.Control type="password" placeholder="Current Password" name="password-input"/>
                </Col>
              </Form.Group>
              <Form.Group controlId="formGridPassword">
                <Col>
                  <Form.Control type="password" placeholder="New Password" name="password-input"/>
                </Col>
              </Form.Group>
              <Form.Group controlId="formGridPassword">
                <Col>
                  <Form.Control type="password" placeholder="Confirm Password" name="password-input"/>
                </Col>
              </Form.Group>
              <Form.Group controlId="formGridEmail">
                <Col>
                  <Form.Control type="email" defaultValue={this.state.user.email} name="email-input"/>
                </Col>
              </Form.Group>
              <Button onClick={this.closeModal} variant="primary" type="submit">Save Changes</Button>
                <p>Please email contact@threads.com to change User Name</p>
                <br/>
              <Button variant="danger" type="submit" onClick={this.handleDeleteAccount}>Delete Account</Button>
            </Form>
          </Modal>
                
          <Row className="userImageUpdate" className="userAdminDetails">
            <Col xs={5} md={1}>
              <Image src={server+this.state.fileName} thumbnail={true}/>
                {user.id == currentUser.id?(<input
                  className="editImgButton"
                  type="button"
                  value="Edit"
                  onClick={() => this.openModal()}
              />) : null}
            </Col>
                    
            <Col className="userInfo">
              <p>{this.state.user.username}({soldListing})</p>
              <p>Memeber since {this.state.user.date}</p>
              <p> {user.receivedReviews.length} {user.receivedReviews.length>1?'reviews':'review'} </p>
              <p> {currentListing} {currentListing>1?'listings':'listing'}</p>
            </Col>
          </Row>
          
          <Tabs defaultActiveKey="Products" id="uncontrolled-tab-example">
            <Tab eventKey="Products" title="Listings">
              <UserProducts user={this.state.user}/>
            </Tab>
            <Tab eventKey="Reviews" title="Reviews">
              <SellerReviewProducts user={this.state.user}/>
            </Tab>
            {user.id == currentUser.id?
            <Tab eventKey="Purchases" title="Purchases" >
              <PurchaseProductListings user={this.state.user}/>
            </Tab>:null}
          </Tabs>
        </Container>
      ) : null
    }
}

export default UserProfile;