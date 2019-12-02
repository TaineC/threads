import React, {Component} from 'react';
import Item from './Item';
import {api} from './API';
import {
    Container,
    Row,
  } from 'react-bootstrap';

class RouteCat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category:null
        }
    }

    routeGetCat = (id) => {
        api.getCategory(id).then(res => this.setState({category:res.data}))
    }

    componentDidMount(){
        var {id} = this.props
        this.routeGetCat(id)
    }

    componentDidUpdate(prevProps, prevState){
        var {id} = this.props
        
        if (id != prevProps.id){
            this.routeGetCat(id)
        }
    }

    render(){
        var {category} = this.state
        
        return category ? (
            <Container className="categoryContainer">
                <Row className="noListing"><h6>Sorry, there are currently 0 listings under<p>{category.name}</p></h6></Row>
                <Row className="productsListing">
                
                    {
                        category.products.reverse().map((item) => {
                            var itemProps = {
                                ...item,
                                key:item.id,
                                refreshData:() => this.routeGetCat(category.name)
                            };
                            return (
                                <Item {...itemProps} />
                            )
                        })
                    }
                    
                    
                </Row>
            </Container>
        ) : null

    }
}

export default RouteCat;