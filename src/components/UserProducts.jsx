import React, {Component} from 'react';
import UserProduct from './UserProduct';

class UserProducts extends Component{

  render(){
    var {user} = this.props;
    
    return user.currentListings ? (
      <div className="listings">
        <h1>Products</h1>
        {
          user.currentListings.map((item) => {
            var props = {
              ...item,
              key: item.id,
              refreshData: this.props.refreshCurrentUser,
            }
            return <UserProduct {...props}/>
          })
        }
      </div>
    ) : null
  }


}

export default UserProducts;
