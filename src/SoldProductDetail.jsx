import React, {Component} from 'react';
import {Link} from '@reach/router';
import {api} from './API';
import {Media} from 'react-bootstrap';

import './App.css';

class SoldProductDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      currentUser:{},
    }
    console.log(this.props);
  }

  componentDidMount=()=>{ 
    var user_id = this.props.purchaser_id
    api.getUser(user_id).then(res =>{
      var currentUser = res.data
      this.setState({currentUser}) 
    })
  }

  render(){
    var {rating,comment,product} = this.props;
             
    return(
      <>
      <div className="Item userItem">
        <ul className="list-unstyled">
          <Media as="li" className="line">
              <Media.Body className="mr-3">
                <h5><Link to={'#'}>{product.name}</Link></h5>
                <p>Comment: {comment }</p>
                <p>
                  Rating:
                  {(() => {
                    switch (rating) {
                    case 1:   return "★";
                    case 2: return "★★";
                    case 3:  return "★★★";
                    case 4:  return "★★★★";
                    case 5:  return "★★★★★";
                    default:      return "";
                    }
                  })()}
                </p>
                <p>
                  Review by: {this.state.currentUser ? this.state.currentUser.name : null}
                </p>
              </Media.Body>
            </Media>
          </ul>
        </div>
      </>
    );
  }
}

export default SoldProductDetail;
