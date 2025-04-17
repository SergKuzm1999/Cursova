import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import NavMenu from './Navbar/NavMenu';
import Footer from './Footer/Footer';
import ScrollUp from './ScrollUp';
import Loader from './Loader/Loader';
import BreadCrumb  from './BreadCrumb/BreadCrumb';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 'hide'
    }
  }
  componentDidMount(){
    window.onbeforeunload= (event) => {
      this.setState({visible:'show'});
    }
  }
  render() {
    return (
      <Grid fluid>
        <Loader visible={this.state.visible}/>
        <Row>
          <NavMenu />
        </Row>
        <Row className='breadcrumb-row'>
          <BreadCrumb />
        </Row>
        <Row className='main'>
          {this.props.children}
        </Row>
        <Row>
          <Footer/>
        </Row>
        <ScrollUp />
      </Grid>
    );
  }
}

export default Layout;
