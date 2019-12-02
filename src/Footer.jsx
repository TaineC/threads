import React, {Component} from 'react';
import { FiChevronUp } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import ScrollUpButton from "react-scroll-up-button"; //Add this line Here

import {Navbar,Col,Container} from 'react-bootstrap';
import {navigate} from '@reach/router';
import classnames from "classnames";

class Footer extends Component{
  constructor(props) {
    super(props);
    this.state ={
      prevScrollpos: window.pageYOffset,
      visible: true
    }
  }
    
  componentDidMount(){
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;
      
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;
      
    this.setState({
      prevScrollpos: currentScrollPos,
      visible
    });
  };

  goHome = (e) => {
    e.preventDefault();
    navigate("/")
  } 

  render () {
    return (
      <Navbar sticky="bottom" className={classnames("footer", {"footer--hidden": !this.state.visible})}>
        <Container>
          <Col className="lCol">threads</Col><Col onClick={this.goHome} className="cCol linkColor"><MdHome/>
            </Col><Col className="rCol linkColor"><ScrollUpButton ContainerClassName="ScrollUpButton__Container" TransitionClassName="ScrollUpButton__Toggled">
              <FiChevronUp/>
            </ScrollUpButton></Col>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;



