import React, { Component } from 'react';
import './SignUp.css';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
import { register } from "../../../actions/auth";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setAlert } from '../../../helpers/setAlert';
import Inputmask from "inputmask";
import $ from 'jquery';
import axios from 'axios';
import {Helmet} from "react-helmet";
const API_KEY = '9edb8ec09d20ebd7265372e6a7498bb4';

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            surName: '',
            email: '',
            password: '',
            phoneNumber: '',
            region: '',
            city: '',
            numberDelivery: '',
            done: false,
            isLoading: false,
            private_policy: false,
            errors: {
            }
        };
    }
    componentDidMount() {
        document.title = 'Зареєструватися - Clothes4U';
        new Inputmask('(380)-99-999-99-99').mask(document.getElementById('phoneNumber'));
       
    }
    createOptions(name, data) {
        try {
            data.map((value) => {
                let item = document.createElement('button');
                let dropdown = document.getElementById(name);
                item.appendChild(document.createTextNode(value.Description));
                item.className='dropdown-item';
                item.type = 'button';
                item.addEventListener('click',(e)=> this.click_dropbtn(e));
                dropdown.appendChild(item);
                return null;
            })
        }
        catch (ex) { console.log(ex) }
    }
    click_dropbtn(e){
        const btn = e.target;
        const {parentNode,innerHTML} = btn;
        if(parentNode.id === 'dropdown-item-region'){
            this.setState({region:innerHTML});
            document.getElementById('dropbtn_region').setAttribute('value',innerHTML);
        }
        if(parentNode.id === 'dropdown-item-city'){ 
            this.setState({city:innerHTML});
            document.getElementById('dropbtn_city').setAttribute('value',innerHTML);
            this.getNumberDelivery(innerHTML);
        }
        if(parentNode.id === 'dropdown-item-number-delivery'){
            this.setState({numberDelivery:innerHTML});
            document.getElementById('dropbtn_number_delivery').setAttribute('value',innerHTML);
        }
    }
    getRegions() {
        var settings = {
            "url": "https://api.novaposhta.ua/v2.0/json/",
            data: {
                apiKey: API_KEY,
                modelName: 'Address',
                calledMethod: 'getAreas'
            }
        }
       return axios.post(settings.url, settings.data).then(res => {this.createOptions('dropdown-item-region', res.data.data);});
    }
    getCities(){
        var settings = {
            "url": "https://api.novaposhta.ua/v2.0/json/",
            data: {
                modelName: 'Address',
                calledMethod: 'getCities'
            }
        }
       return axios.post(settings.url, settings.data).then(res=>{this.createOptions('dropdown-item-city', res.data.data);});
    }
    getNumberDelivery(cityName){
        var settings = {
            "url": "https://api.novaposhta.ua/v2.0/json/",
            data: {
                apiKey: API_KEY,
                modelName: 'AddressGeneral',
                calledMethod: 'getWarehouses',
                methodProperties: {
                    CityName: cityName
                }
            }
        }
       return axios.post(settings.url, settings.data).then(res => {this.createOptions('dropdown-item-number-delivery', res.data.data);});
    }  
    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    }
    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }  
    onSubmitForm = (e) => {
        e.preventDefault();
        if(document.getElementsByClassName('help-block').length>=1)
        {
            $('html').animate({scrollTop: 
                window.pageYOffset + document.getElementsByClassName('help-block')[0].getBoundingClientRect().top - 300}, 800);
        }
        let errors = {};
        if (this.state.lastName === '') errors.lastName = "Прізвище повинно бути від 1 до 32 символів!";
        if (this.state.firstName === '') errors.firstName = "Ім'я повинне бути від 1 до 32 символів!";
        if (this.state.surName === '') errors.surName = "По Батькові повинне бути від 1 до 32 символів!";
        if (this.state.password === '') errors.password = "Введіть пароль!";
        if (this.state.email === '') errors.email = "Некоректний адрес електронної пошти!";
        if (this.state.phoneNumber === '' ) errors.phoneNumber = "Не коректний телефон!";
        if (this.state.region === '') errors.region = "Виберіть область!";
        if (this.state.city === '') errors.city = "Виберіть місто!";
        if (this.state.numberDelivery === '') errors.numberDelivery = "Введіть відділення Нової почти!";
        if (!this.state.private_policy) errors.private_policy = 'Необхідно погодитися з умовами використання сайту!';
        const isValid = Object.keys(errors).length === 0;
        if (isValid && this.state.private_policy) {
            const { lastName, firstName, surName, email, password, phoneNumber, region, city, numberDelivery } = this.state;
            this.setState({ isLoading: true });
            this.props.register({ email, password, phoneNumber, region, city, numberDelivery, firstName, lastName, surName })
                .then(
                    () => {
                        $('html').animate({scrollTop: 0},800, 'swing');
                        setAlert({message:"Код для активації особистого кабінету надісланно на ваш Е-Мейл!",type:'succes'});
                        setAlert({ message: 'Аккаунт успішно створено!', type: 'success' });
                        setTimeout(()=>{
                            window.location.pathname = '/account/signin';
                        },2500);
                    },
                    (err) => {
                        this.setState({ errors: err.response.data, isLoading: false });
                        if(Object.keys(this.state.errors).length === 33)
                            setAlert({message:err.response.data, type:'danger'});
                        if(err.response.data === 'Підтвердіть свій аккаунт!'){
                            $('html').animate({scrollTop: 0},800, 'swing');
                            setAlert({ message: 'Аккаунт успішно створено!', type: 'success' });
                            alert("Підтвердіть свій Емейл!");
                        }
                    }
               );
        }
        else {
            this.setState({ errors });
        }
    }
    click_personal_policy=()=>{
        this.setState({private_policy: !this.state.private_policy});
        document.getElementById('personal_policy_btn').className = 
                    document.getElementById('personal_policy_btn').className === '' ? 'agree' : '';
    }
    fillLocationData(name){
         if(name==='city') this.getCities();
         if(name==='region') this.getRegions();
    }
    show_password(){
        document.getElementById('password').type = 'text';
    }   
    hide_password(){
        document.getElementById('password').type = 'password';
    }
    render() {
        const { errors } = this.state;
        var form = (
            <div className='container sign'>
                <div className='row'>
                <Helmet>
                    <meta name="keywords" content={`женщин, мужчин, парням, девушкам, жінок, чоловіків, для, дівчат, хлопців, clothes4u, купить, цены, цена, скидки, Украине, интернет, магазин, купити, в, Україні, ціни`}/>
                    <meta name="Description" content="Купити одяг, взуття, аксесуари та рюкзаки по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
                </Helmet>
                    <div className='col'>
                        <div className='signup box'>
                            <form onSubmit={this.onSubmitForm}>
                                <h1>РЕЄСТРАЦІЯ</h1>
                                <p>
                                    Якщо Ви вже зареєстровані, перейдіть на сторінку авторизації.
                                </p>
                                <div className={classnames('form-group', { 'error': !!errors.lastName })}>
                                    <label>ПРІЗВИЩЕ</label>
                                    <input type="text" className="form-control"
                                        id="lastName"
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.handleChange} />
                                    {!!errors.lastName ? <span className="help-block">{errors.lastName}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.firstName })}>
                                    <label>ІМ'Я</label>
                                    <input type="text" className="form-control"
                                        id="firstName"
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.handleChange} />
                                    {!!errors.firstName ? <span className="help-block">{errors.firstName}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.surName })}>
                                    <label>ПО БАТЬКОВІ</label>
                                    <input type="text" className="form-control"
                                        id="surName"
                                        name="surName"
                                        value={this.state.surName}
                                        onChange={this.handleChange} />
                                    {!!errors.surName ? <span className="help-block">{errors.surName}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.email })}>
                                    <label >EMAIL</label>
                                    <input type="email" className="form-control"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange} />
                                    <small className="form-text text-muted">Ми ніколи не поділимося вашим електронним листом ні з ким іншим.</small>
                                    {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.password })}>
                                    <label >ПАРОЛЬ</label>
                                    <input type="password" className="form-control"
                                        id="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleChange} />
                                    <i className='fa fa-eye' onMouseEnter={()=>this.show_password()}
                                        onMouseLeave={()=>this.hide_password()} />
                                    {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.phoneNumber })}>
                                    <label>ТЕЛЕФОН</label>
                                    <input type="tel" className="form-control"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={this.state.phonenumber}
                                        onChange={this.handleChange}/>
                                    {!!errors.phoneNumber ? <span className="help-block">{errors.phoneNumber}</span> : ''}
                                </div>
                                <div className={classnames('dropdown', { 'error': !!errors.region })}>
                                    <button className='dropdown-toggle' type="button" id="dropbtn_region" name='region'
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        onClick={()=>this.fillLocationData('region')}>
                                        Область
                                    </button>
                                    <div className="dropdown-menu" id='dropdown-item-region' aria-labelledby="dropbtn_region"></div>
                                    {!!errors.region ? <span className="help-block">{errors.region}</span> : ''}
                                </div>
                                <div className={classnames('dropdown', { 'error': !!errors.city })}>
                                    <button className='dropdown-toggle' type="button" id="dropbtn_city" name='city'
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                        onClick={()=>this.fillLocationData('city')}>
                                        Місто
                                    </button>
                                    <div className="dropdown-menu" id='dropdown-item-city' aria-labelledby="dropbtn_city"></div>
                                    {!!errors.city ? <span className="help-block">{errors.city}</span> : ''}
                                </div>
                                <div className={classnames('dropdown', { 'error': !!errors.numberDelivery })}>
                                    <button className='dropdown-toggle' type="button" id="dropbtn_number_delivery"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name='numberDelivery'>
                                        Відділення нової пошти
                                    </button>
                                    <div className="dropdown-menu" id='dropdown-item-number-delivery' aria-labelledby="dropbtn_number_delivery"></div>
                                    {!!errors.numberDelivery ? <span className="help-block">{errors.numberDelivery}</span> : ''}
                                </div>
                                <div className='personal-policy'>
                                    <button type='button' id='personal_policy_btn' onClick={this.click_personal_policy} />
                                    <span>Я згоден з <a href='/personal-data'>умовами використання сайту</a></span>
                                    {!!errors.private_policy ? <span className="error help-block">{errors.private_policy}</span> : ''}
                                </div>
                                <button type="submit" className="btn btn-dark" >Зареєструватися</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
        
        return (
            this.state.done ?
                <Redirect to="/account/signin" /> : form
        )
    }
}
SignUpPage.propTypes =
    {
        register: PropTypes.func.isRequired
    }

export default connect(null, { register })(SignUpPage);