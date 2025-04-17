import React, { Component } from 'react';
import './Cart.css';
import { connect } from "react-redux";
import { getCartProducts, deleteProductByCart } from '../../../actions/cart';
import { setAlert } from '../../../helpers/setAlert';
import { Redirect } from 'react-router-dom';
import Discounts from '../Discounts/Discounts';
import {Helmet} from "react-helmet";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectUser: false,
            redirectOrder: false
        };
    }
    componentDidMount(){
        document.title = 'Корзина - Clothes4U';
    }
    getPrice(cartProducts) {
        let priceCart = 0;
        cartProducts.forEach(element => {
            priceCart += element.price * element.count;
        });
        return (
            priceCart
        );
    }
    getCurrentUserId() {
        return this.props.auth.user.id;
    }
    getCountProduct(cartProducts) {
        let count = 0;
        cartProducts.forEach(element => {
            count += element.count;
        });
        return count;
    }

    deleteProduct = (e) => {
        const index = e.target.parentElement.parentElement.parentElement.parentElement.getAttribute('index');
        this.props.deleteProductByCart(index);
        setAlert({ message: 'Товар успішно видаленно з Корзини!', type: 'success' });
        window.location.reload();
    }

    addCartItems(value, index) {
        return (
            <div className='row' key={index}>
                <div className='col col-4 col-sm-3 col-lg-2'>
                    <div className='product-img'>
                        <img src={value.image} alt='product-img' />
                    </div>
                </div>
                <div className='col col-8 col-sm-4 col-lg-4'>
                    <div className='product-title'>
                        <a href={value.hrefProduct}>
                            {value.name}
                        </a>
                    </div>
                    {value.size !== '' ?
                        <div className='product-size'>
                            <span>Розмір: {value.size}</span>
                        </div> : ''}
                </div>
                <div className='col col-5 col-sm-2 col-lg-3'>
                    <div className='product-quantity'>
                        Кількість: {value.count}
                    </div>
                </div>
                <div className='col col-5 col-sm-2 col-lg-2'>
                    <div className='product-price-total'>

                        {value.price} грн.
                    </div>
                </div>
                <div className='col col-2 col-sm-1 col-lg-1'>
                    <div className='product-delete'>
                        <button onClick={this.deleteProduct}><i className="fa fa-trash"></i></button>
                    </div>
                </div>
            </div>
        );
    }

    submit = () => {
        const { isAuthenticated } = this.props.auth;
        if (isAuthenticated) {
            this.setState({ redirectOrder: true });
        }
        else {
            setAlert({ message: 'Увійдіть до аккаунту!', type: 'danger' });
            const timeout_id = setTimeout(() => {
                this.setState({ redirectUser: true });
                clearTimeout(timeout_id);
            }, 2500);
        }

    }

    render() {
        const { cartProducts } = this.props;
        const priceCart = this.getPrice(cartProducts);
        const count = this.getCountProduct(cartProducts);

        return (
            <div style={{ width: '100%' }}>
                <div className='container cart'>
                <Helmet>
                    <meta name="Description" content="Купити одяг, взуття, аксесуари та рюкзаки по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
                </Helmet>
                    {cartProducts.length > 0 ?
                        <div>
                            <div className='header'>
                                <h2>КОШИК ДЛЯ ПОКУПОК</h2>
                            </div>
                            <div className='cart-item'>
                                {cartProducts.length > 0 && cartProducts.map((value, index) => this.addCartItems(value, index))}
                            </div>
                            <div className='result-price'>
                                <div>
                                    <span className='text'>Всього товарів:</span>
                                    <span className='value'>{count} шт.</span><br />
                                    <span className='text'>Ціна товарів:</span>
                                    <span className='value'>{priceCart} грн.</span><br />
                                    <span className='text'>Доставка:</span>
                                    <span className='value'>30-90 грн.</span>
                                </div>

                                <button className="btn btn-dark" onClick={this.submit}>ОФОРМИТИ ЗАМОВЛЕННЯ</button>
                            </div>
                        </div> :
                        <div className='header empty'>
                            <h2>КОШИК ДЛЯ ПОКУПОК ПУСТИЙ</h2>
                            <a href='/catalog/search?'>
                                Ви можете подивитися наш каталог
                            </a>
                            <hr />
                        </div>}
                    {this.state.redirectUser && <Redirect to='/account/signin/' />}
                    {this.state.redirectOrder && (window.location.pathname = '/order')}
                </div>
                {cartProducts.length === 0 && <Discounts carousel={true} />}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cartProducts: state.cartProducts.cartProducts,
        auth: state.auth
    };
}
export default connect(mapStateToProps, { getCartProducts, deleteProductByCart })(Cart)