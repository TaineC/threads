import React, {Component} from 'react';
import Item from './Item';
import {Link} from '@reach/router';
import {api} from '../API';
import Carousel from 'react-multi-carousel';
import {
    Col,
    Card,
    Image,
    Row,
    Jumbotron,
    Container
} from 'react-bootstrap';

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1024
        },
        items: 5,
        partialVisibilityGutter: 40 // this is needed to tell the amount of px that should be visible.
    },
    tablet: {
        breakpoint: {
            max: 1024,
            min: 464
        },
        items: 2,
        partialVisibilityGutter: 30 // this is needed to tell the amount of px that should be visible.
    },
    mobile: {
        breakpoint: {
            max: 464,
            min: 0
        },
        items: 1,
        partialVisibilityGutter: 70 // this is needed to tell the amount of px that should be visible.
    }
}

class ProductListings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: []
        }
    }

    getProducts = () => {
        api
            .getProducts()
            .then(res => {
                this.setState({products: res.data})
            })
    }

    componentDidMount() {
        this.getProducts()
    }

    render() {
        var {
            products
        } = this.state;
        return (

            <div className="Item carousel-container">
                <h3>Featured</h3>
                <Carousel swipeable={true} draggable={true} showDots={true} responsive={responsive} ssr={true}
                    // means to render carousel on server-side.
                    infinite={true} autoPlay={this.props.deviceType !== "mobile"
                        ? false
                        : false} autoPlaySpeed={1000} keyBoardControl={true} customTransition="ease all .5s" transitionDuration={500} containerClass="carousel-container" removeArrowOnDeviceType={["tablet", "mobile"]} deviceType={this.props.deviceType} dotListClass="custom-dot-list-style" itemClass="CarousalItem carousel-item-padding-40-px" partialVisbile={true}>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/suit1.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Dries Van Noten Pin Stripe
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/watch1.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Lorem ipsum dolor
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/suit2.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Ut ut gravida augue
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                            <Card.Img variant="featured" src={require('../img/footwear1.png')}/>
                            <Card.Body>
                                <Card.Title>Curabitur vitae
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                            <Card.Img variant="featured" src={require('../img/suit3.png')}/>
                            <Card.Body>
                                <Card.Title>Suspendisse massa
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/watch2.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Sed vel consequat ligula
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/footwear2.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Aliquam egestas
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/suit4.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Praesent quis est
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/footwear3.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Interdum et malesuada
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                    <div className="Item">
                        <Card>
                        <Link to="/featured"><Card.Img variant="featured" src={require('../img/watch3.png')}/></Link>
                            <Card.Body>
                                <Card.Title>Sed ligula risus
                                </Card.Title>

                            </Card.Body>
                        </Card>
                    </div>
                </Carousel>
                <Container>
                    <Row className="productsListing">
                        {
                            products.reverse().map((item) => {
                                var itemProps = {
                                    ...item,
                                    key: item.id,
                                    refreshData: this.getProducts
                                }
                                return <Item {...itemProps}/>

                            })
                        }
                    </Row>
                </Container>
                <Container className="imageGrid">
                    <Row>
                        <Jumbotron fluid="fluid">
                        <Link to="/our-store"><Container>
                                <h1>Our Store</h1>
                                <p>
                                    We stock a huge range of new & second hand trade in's. We check the listing matches
                                    the product for quality assurance, verify and then list.
                                </p>
                            </Container></Link>
                        </Jumbotron>

                    </Row>
                    <Row>
                        <Col><Link to="/categories/accessories"><Image src="/accessories.jpg" fluid="fluid"/></Link></Col>
                        <Col><Link to="/categories/suits"><Image src="/suits.jpg" fluid="fluid"/></Link><Link to="/categories/footwear"><Image src="/footwear.jpg" fluid="fluid"/></Link></Col>
                    </Row>
                </Container>
            </div>

        );
    }

}

export default ProductListings;
