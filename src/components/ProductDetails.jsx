import React, {Component} from 'react';
import {api, server} from '../API';

class ProductDetails extends Component{
  constructor(props){
    super(props);
    this.state = {
      product:null,
    }
  }
  routeGetProduct = (id) => {
    api.getProduct(id).then(res => this.setState({product:res.data}))
  }

  componentDidMount(){
    var {id} = this.props
    this.routeGetProduct(id)
  }
  handleReviewFormSubmit = (e) => {
    e.preventDefault();

    var formData = new FormData(this.reviewForm);

    var productId = this.props.id;

    var data = {
      comment:formData.get('comment-input'),
      rating:formData.get('rating-input'),
      prod_id: productId,
    }
    api.addReview(data).then(res => {
      this.reviewForm.reset()
      this.routeGetProduct(productId)
    })
  }

  addDefaultSrc(ev){
    ev.target.src = '/coming-soon.png'
  }


  render(){
    var {product} = this.state;

    return product ? (
      <>
      <div className="product">
        <h2 className="name text">{product.name}</h2>
        <p className="description text">{product.description}</p>
        <p className="price text">{product.price}</p>
        <img className="photo" src={server+product.photo} onError={this.addDefaultSrc}/> 
        {
          product.reviews.map(review => {
            var reviewProps = {
              review:review,
              refreshData: () => this.routeGetProduct(product.id)
            }
          })
        }
      </div>
    </>) : null;
  }
}

export default ProductDetails;
