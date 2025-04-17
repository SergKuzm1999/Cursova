import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import './SignIn.css'
import SignInForm from './SignInForm';
import {Helmet} from "react-helmet";
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        document.title = 'Увійти - Clothes4U';
      }
    render() {
        return (
            <div className='container sign'>
                <Helmet>
                    <meta name="keywords" content={`женщин, мужчин, парням, девушкам, жінок, чоловіків, для, дівчат, хлопців, clothes4u, купить, цены, цена, скидки, Украине, интернет, магазин, купити, в, Україні, ціни`}/>
                    <meta name="Description" content="Купити одяг, взуття, аксесуари та рюкзаки по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
                </Helmet>
                <Row>
                    <Col xs={12} md={6}>
                        <SignInForm/>
                    </Col>
                    <Col xs={12} md={6}>
                        <div className='signin box'>
                            <h4>НОВИЙ КЛІЄНТ</h4>

                            <p>Якщо ви ще не реєструвалися на нашому сайті, натисніть кнопку "Зареєструватися".</p>

                           <a href='/account/signup'><button className="btn btn-dark">РЕЄСТРАЦІЯ</button></a> 
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default SignIn