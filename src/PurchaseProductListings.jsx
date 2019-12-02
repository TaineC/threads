import React, {Component} from 'react';
import PurchaseProductDetail from './PurchaseProductDetail';

class PurchaseProductListings extends Component{
  constructor(props){
    super(props)
    this.state={
      currentUser:{},
    }
  }

  render(){
    var products = this.props.user.purchases;

    return products ? (
      
      <div className="listings">
        <h1>Purchase Products</h1>
        {
          products.map((item) => {
            var props = {
              ...item,
              key: item.id,
            }
            return <PurchaseProductDetail {...props} currentUser={this.props.user}/>
          })
        }
      </div>

    ):null;
  }
}

export default PurchaseProductListings;
