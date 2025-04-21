import React, { Component } from 'react';
import { login } from "../../../actions/auth";
import { connect } from "react-redux";
import axios from 'axios';
import { setAlert } from '../../../helpers/setAlert';

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
            done: false,
            nextStep_changePassword: false,
            code_confirm: false
        };
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
            );

        }
        else {
            this.setState(
                { [name]: value });
        }
    }
    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.email === '') errors.email = "Це поле не може бути пустим!"
        if (this.state.password === '') errors.password = "Це поле не може бути пустим!"

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            const { email, password } = this.state;
            this.setState({ isLoading: true });
            this.props.login({ email: email, password: password })
                .then(
                    () => {
                        this.setState({ done: true });
                        setAlert({ message: 'Вхід успішно виконано!', type: 'success' });
                    },
                    (err) => {
                        this.setState({ errors: err.response.data, isLoading: false });
                        setAlert({ message: err.response.data, type: 'danger' })
                    });
        }
        else {
            this.setState({ errors });
        }

    }
    closeForgotWindow() {
        document.getElementById('shadow').classList.replace('show', 'collapse');
        document.getElementById('forgot_password_window').classList.replace('show', 'collapse');
    }
    forgotPassword_show_hide() {
        const shadow = document.getElementById('shadow');
        const window = document.getElementById('forgot_password_window');
        if (window.classList[1] === 'collapse') {
            window.classList.replace('collapse', 'show');
            shadow.classList.replace('collapse', 'show');
        }
        else {
            window.classList.replace('show', 'collapse');
            shadow.classList.replace('show', 'collapse');
        }
    }
    resetPassword() {
        var email = document.getElementById('forgot_password').value;
        if (!this.state.nextStep_changePassword) {
            if (email !== '') {
                axios.post('api/client/CreateCode_ForgotPassword?email=' + email)
                    .then(
                        (response) => {
                            this.setState({ nextStep_changePassword: true });
                            setAlert({ message: response.data, type: 'success' })
                        },
                        (err) => { setAlert({ message: err.response.data, type: 'danger' }) });
            }
            else {
                setAlert({ message: 'Поле не може бути пустим!', type: 'danger' });
            }
        }
        if (this.state.nextStep_changePassword && !this.state.code_confirm) {
            var code = document.getElementById('reset_pass_code').value;
            if (code !== '') {
                axios.get('api/client/CheckCode_ForgotPassword?email=' + email + '&confirmCode=' + code).then(
                    (response) => {
                        setAlert({ message: response.data, type: 'success' });
                        this.setState({ code_confirm: true });
                    },
                    (error) => {
                        setAlert({ message: error.response.data, type: 'danger' });
                        this.setState({ code_confirm: false });
                    });
            }
        }
        if (this.state.code_confirm) {
            const new_password = document.getElementById('new_pass').value;
            const confirm_new_password = document.getElementById('confirm_new_pass').value;
            if (new_password !== confirm_new_password) setAlert({ message: 'Паролі не збігаються!', type: 'danger' });
            else {
                if (new_password.length < 6) setAlert({ message: 'Пароль повинен містити більше ніж 6 символів!', type: 'danger' });
                else {
                    axios.post('api/client/ChangePassword_ForgotPassword?email=' + email + '&newPassword=' + new_password)
                        .then(
                            (response) => {
                                this.setState({ nextStep_changePassword: false });
                                this.setState({ code_confirm: false });
                                setAlert({ message: response.data, type: 'success' });
                                this.closeForgotWindow();
                            },
                            (err) => { setAlert({ message: err.response.data, type: 'danger' }) });
                }
            }
        }
    }
    render() {
        const { errors } = this.state;
        const { nextStep_changePassword, code_confirm } = this.state;
        var resetPasswordContent = '';
        var resetPasswordCodeContent = '';
        if (nextStep_changePassword) {
            resetPasswordCodeContent = (<div id='code_container' className='code-container'>
                <label style={{ marginTop: '5px' }}>Код підтвердження</label>
                <input type='text' id='reset_pass_code' className='form-control' placeholder="Введіть ваш код" />
            </div>);
        }
        if (code_confirm) {
            resetPasswordCodeContent = '';
            resetPasswordContent = (<div className='change-password'>
                <label>Введіть новий пароль</label>
                <input type='password' id='new_pass' className='form-control'
                    placeholder='Введіть новий пароль' />
                <label>Підтвердіть пароль</label>
                <input type='password' id='confirm_new_pass' className='form-control'
                    placeholder='Підтвердіть пароль' />
            </div>)
        }
        return (
            this.state.done ? window.location = '/' :
                <form onSubmit={this.onSubmitForm}>
                    <div className='signin box'>
                        <h1>УВІЙТИ</h1>
                        <p>
                            Увійти в Особистий Кабінет
                        </p>
                        <div className="form-group">
                            <label>E-MAIL</label>
                            <input type='email' className='form-control' id='email' name='email'
                                value={this.state.email} onChange={this.handleChange} aria-describedby="emailHelp" placeholder="E-Mail" />
                            {!!errors.email ? <span className="help-block">{errors.email}</span> : ''}
                        </div>
                        <div className="form-group">
                            <label>ПАРОЛЬ</label>
                            <input type="password" className="form-control" id="password" name='password'
                                value={this.state.password} onChange={this.handleChange} placeholder="Пароль" />
                            {!!errors.password ? <span className="help-block">{errors.password}</span> : ''}
                        </div>
                        <div style={{ width: '100%', textAlign: 'right' }}>
                            <span className='forgot-pass' onClick={() => this.forgotPassword_show_hide()}>Забули пароль?</span>
                        </div>
                        <div className='shadow collapse' id='shadow'></div>
                        <div className='forgot-pass-window collapse' id='forgot_password_window'>
                            <h3>Відновлення доступу</h3>
                            <button type='button' onClick={() => this.closeForgotWindow()} className='close-btn'></button>
                            <label>E-Mail</label>
                            <input type="email" className='form-control' id='forgot_password'
                                placeholder="Введіть E-Mail від особистого кабінету" />
                            {resetPasswordCodeContent}
                            {resetPasswordContent}
                            <div className='get-pass'>
                                <button type='button' onClick={() => this.resetPassword()} className='get-pass-btn'>Продовжити</button>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-dark">УВІЙТИ</button>
                    </div>
                </form>
        )
    }
}
export default connect(null, { login })(SignInForm);