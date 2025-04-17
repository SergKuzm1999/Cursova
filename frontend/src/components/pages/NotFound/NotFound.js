import React, { Component } from 'react';
import './NotFound.css';
import Discounts from '../Discounts/Discounts';

class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        document.title = 'Помилка - Clothes4U';
    }
    render() {
        return (
            <div className='container'>
                <div className='not-found'>
                    <div className='row '>
                        <div className='text-center'>
                            <h1>НА ЖАЛЬ, ЗАПИТУВАНА ВАМИ СТОРІНКА НЕ ЗНАЙДЕНА. ЙМОВІРНО, ВИ ВКАЗАЛИ НЕІСНУЮЧУ АДРЕСУ, СТОРІНКА БУЛА ВИЛУЧЕНА, ПЕРЕМІЩЕНА АБО ЗАРАЗ ВОНА ТИМЧАСОВО НЕДОСТУПНА!</h1>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <a className='btn btn-home' href='/'>На головну</a>
                        </div>
                    </div>
                    <hr/>
                    <div className='row'>
                        <Discounts carousel={true}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default NotFound;