import React, { Component } from 'react';
import { Row, Col } from "react-bootstrap";
import './SignUp.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='container sign'>
                <Row>
                    <Col md={8} lg={6}>
                        <div className='signup box'>
                            <h3>РЕЄСТРАЦІЯ</h3>
                            <p>
                                Якщо Ви вже зареєстровані, перейдіть на сторінку авторизації.
                             </p>
                            <div className="form-group">
                                <label>ПРІЗВИЩЕ</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>ІМ'Я</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label >EMAIL</label>
                                <input type="email" className="form-control"/>
                                <small className="form-text text-muted">Ми ніколи не поділимося вашим електронним листом ні з ким іншим.</small>
                            </div>
                            <div className="form-group">
                                <label>ТЕЛЕФОН</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label >ПАРОЛЬ</label>
                                <input type="password" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>ОБЛАСТЬ</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>МІСТО</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>ВІДДІЛЕННЯ НОВОЇ ПОШТИ</label>
                                <input type="text" className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-dark">Зареєструватися</button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default SignUp