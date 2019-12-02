import React, {Component} from 'react';
import Product from './UserProduct';
import {Link} from '@reach/router';
import {Button} from 'react-bootstrap';

import './App.css';

class Products extends Component{
  constructor(props){
    super(props)
    this.state = {
      products: []
    }
  }

  render(){
    var {products} = this.state;
    return(
      
      <div className="listings">
        <h1>My Products</h1>
          <div className="listProduct"><Link to="/products/new"><Button className="AddButton" variant="primary" type="submit">List a product</Button></Link></div>
        {
          products.map((item) => {
            var props = {
              ...item,
              key: item.id,

            }
            return <Product {...props}/>
            
          })
        }
        
      </div>

    );
  }


}

export default Products;
