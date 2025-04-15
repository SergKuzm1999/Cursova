import React from 'react';
import { Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';

export default props => (
  <div>
    <Row style={{ width: "100%", margin: 0, padding: 0 }}>
      <NavMenu />
    </Row>
    <Row style={{ width: "100%", margin: 0, padding: 0 }}>
      {props.children}
    </Row>
    <Row style={{ width: "100%", margin: 0, padding: 0 }}>
      <Footer />
    </Row>
  </div>
);  