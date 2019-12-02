import React, {Component} from 'react';
import {Link} from '@reach/router';
import {api, server} from './API';
import {Button,Media,Col} from 'react-bootstrap';

class PurchaseProductDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      seller:null,
      product:null,
    }
  }
  
  deleteProduct = () => {
    var {id, refreshData} = this.props;
    api.deleteProduct(id).then(() => refreshData())
  }

  routeGetProduct = (id) => {
    api.getProduct(id).then(res => {
    this.setState({product:res.data})
      api.getUser(res.data.seller_id).then(res=>{
        this.setState({seller:res.data})
      }) 
    })
  }

  componentDidMount(){
    var {id} = this.props;
    this.routeGetProduct(id);
  }

  render(){
    var {name, price, photos, id} = this.props;
    var {seller} = this.state;

    return seller ? (
      <div className="Item userItem">
        <Media className="line">
          <img
            width={64}
            height={64}
            className="mr-3"
            src={server+photos[0]}
            alt="product photos"
          />

          <Col>   
            <h5><Link to={'/products/'+id}>{name}</Link></h5>
            <p className="price">${price}</p>
          </Col>
          <Col>              
            {seller.deleted_at != null? 
            <Button variant="primary" type="submit"> 
              <Link to={'/not-found'}>Review</Link>
            </Button> 
            :<Button variant="primary" type="submit"> 
              <Link to={'/review-products/'+id}>   Review </Link>
            </Button>}
          </Col>
        </Media>
      </div>
    ): null;
  }
}

export default PurchaseProductDetail;
