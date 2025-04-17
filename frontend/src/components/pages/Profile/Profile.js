import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='profile'>
                <h1>МІЙ ОБЛІКОВИЙ ЗАПИС</h1>
                <div className='row'>
                    <div className='col col-6 col-sm-3 col-md-3 col-lg-2'>
                        <a href="/profile/edit">
                            <i className="fa fa-user"></i>
                            <div>Змінити контактну інформацію</div>
                        </a>
                    </div>
                    <div className='col col-6 col-sm-3 col-md-3 col-lg-2'>
                        <a href="/profile/changePassword">
                            <i className="fa fa-lock"></i>
                            <div>Змінити свій пароль</div>
                        </a>
                    </div>
                    <div className='col col-6 col-sm-3 col-md-3 col-lg-2'>
                        <a href="/profile/changeAddress">
                            <i className="fa fa-map-marker"></i>
                            <div>Змінити мою адресу</div>
                        </a>
                    </div>
                    <div className='col col-6 col-sm-3 col-md-3 col-lg-2'>
                        <a href="/profile/orders?page=1">
                            <i className="fa fa-list-alt"></i>
                            <div>Мої замовлення</div>
                        </a>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Profile