import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import classnames from 'classnames';
import { changePassword } from '../../../../actions/profile';
import { connect } from "react-redux";
import '../EditInfoPage/EditInformation.css';
import './ChangePassword.css';
import { setAlert } from '../../../../helpers/setAlert';

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPassword: '',
            newPassword: '',
            errors: {
            },
            isLoading: false
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
        let errors = {};
        if (this.state.oldPassword === '') errors.oldPassword = "Це поле не може бути пустим!";
        if (this.state.oldPassword === this.state.newPassword) errors.newPassword = "Новий пароль не має містити старий пароль";
        if (this.state.newPassword === '') errors.newPassword = "Це поле не може бути пустим!";

        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const { oldPassword, newPassword } = this.state;
            const clientId = this.props.auth.user.id;
            this.setState({ isLoading: true });
            this.props.changePassword({ clientId, oldPassword, newPassword })
                .then(
                    () => {
                        this.setState({ done: true });
                        setAlert({ message: 'Данні успішно змінено', type: 'success' });
                    },
                    (err) => {
                        if(err.response.data !== 'Пароль не вірний!'){
                            errors.newPassword = err.response.data.errors.NewPassword[0];
                            this.setState({ errors: errors, isLoading: false });
                        }
                        else{
                            this.setState({ errors: err.response.data, isLoading: false });
                            setAlert({ message: err.response.data, type: 'danger' });
                        }
                      
                    }
                );
        }
        else {
            this.setState({ errors });
        }

    }
    render() {
        const { errors, isLoading } = this.state;
        
        console.log(errors);
        return (
            <div className='edit-info container'>
                <h1>ЗМІНИТИ ПАРОЛЬ</h1>
                <Row>
                    <form onSubmit={this.onSubmitForm}>
                        <div className='center'>
                            <div>
                                <div className={classnames('form-group', { 'error': !!errors.oldPassword })}>
                                    <label>СТАРИЙ ПАРОЛЬ</label>
                                    <input type="password" className="form-control" placeholder="Старий пароль"
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={this.state.oldPassword}
                                        onChange={this.handleChange} />
                                    {!!errors.oldPassword ? <span className="help-block">{errors.oldPassword}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.newPassword })}>
                                    <label>НОВИЙ ПАРОЛЬ</label>
                                    <input type="password" className="form-control" placeholder="Новий пароль"
                                        id="newPassword"
                                        name="newPassword"
                                        value={this.state.newPassword}
                                        onChange={this.handleChange} />
                                    {!!errors.newPassword ? <span className="help-block">{errors.newPassword}</span> : ''}
                                </div>
                                <button type='submit'>ЗМІНИТИ</button>
                            </div>
                        </div>
                    </form>

                </Row>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}
export default connect(mapStateToProps, { changePassword })(ChangePassword);