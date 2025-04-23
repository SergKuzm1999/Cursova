import React, { Component } from 'react';
import './Order.css';
import { connect } from "react-redux";
import { GetUserInfoById } from '../../../actions/users';
import { setAlert } from '../../../helpers/setAlert';
import { newOrder } from '../../../actions/orders';
import { clearCart } from '../../../actions/cart';

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    document.title = 'Замовлення - Clothes4U';
    const { id } = this.props.auth;
    this.props.GetUserInfoById(id)
      .then(
        () => { },
        (err) => { console.log("Error get data ", err); }
      );
    if(this.props.cartProducts.length === 0)
        window.location = '/NotFound';
  }

  cancelOrder = () => {
    const timeout_id = setTimeout(() => {
      this.props.history.push('/cart');
      clearTimeout(timeout_id);
    }, 2500);
    setAlert({ message: 'Замовлення відмінено!', type: 'danger' });
  }

  successOrder = () => {
    const { cartProducts } = this.props;
    const userId = this.props.auth.id;
    const full_price = this.getFullPriceOrder(cartProducts);
    console.log(cartProducts);
    this.props.newOrder({ cartProducts, userId,  full_price}).then(
      () => {
        const timeout_id = setTimeout(() => {
          window.location.href = '/profile/orders?page=1';
          clearTimeout(timeout_id);
        }, 2500);
        setAlert({ message: 'Замовлення успішно додано!', type: 'success' });
      },
      (err) => { console.log("Error get data ", err); }
    );
    document.getElementById('submit-btn').disabled = true;
    this.props.clearCart();


  }

  getFullPriceOrder(cartProducts) {
    let priceCart = 0;
    cartProducts.forEach(element => {
      priceCart += element.price * element.count;
    });
    return priceCart;
  }
  render() {
    const { cartProducts } = this.props;
    const user = this.props.users;
    console.log("USER",user);
    return (
      <div className='container order'>
        <div className='row'>
          <h1>
            Оформлення Замовлення
              </h1>
        </div>
        <div className='row'>
          <div className='col col-12 col-sm-12 col-md-12 col-lg-6 user-info'>
            <div className='row header'>
              <span>Покупець</span>
            </div>
            <div className='row'>
              <div className='col col-lg-6 col-sm-6'>
                <span>ПІБ</span>
              </div>
              <div className='col col-lg-6 col-sm-6'>
                <span>{user.last_name}  {user.first_name}</span>
              </div>
            </div>
            <div className='row'>
              <div className='col col-lg-6 col-sm-6 col-6'>
                <span>Email</span>
              </div>
              <div className='col col-lg-6 col-sm-6 col-6'>
                <span style={{wordWrap:'break-word'}}>{user.email}</span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <span>Моб. телефон</span>
              </div>
              <div className='col'>
                <span>{user.phone}</span>
              </div>
            </div>
            <div className='row header'>
              <span>Адреса доставки</span>
            </div>
            <div className='row'>
              <div className='col'>
                <span>Область</span>
              </div>
              <div className='col'>
                <span>{user.region}</span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <span>Місто</span>
              </div>
              <div className='col'>
                <span>{user.city}</span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <span>Відділення нової пошти</span>
              </div>
              <div className='col'>
                <span>{user.number_delivery}</span>
              </div>
            </div>
          </div>
          <div className='col col-12 col-sm-12 col-md-12 col-lg-6 order-info'>
            <hr />
            {cartProducts.length > 0 && cartProducts.map((value, index) =>
            <div className='row' key={index}>
              <div className='col col-4 col-lg-3'>
                <img src={value.image} alt={value}/>
              </div>
              <div className='col col-8 col-lg-9'>
                <div className='row'>
                  <div className='col'>
                    <a className='name' href={value.hrefProduct}>{value.name}</a>
                    {value.size !== '' && <span className='size'>Розмір: {value.size}</span>}
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <span className='price'>{value.price} UAH</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <strong className='count'>X {value.count}</strong>
                  </div>
                </div>
                <div className='row'>
                  <div className='col'>
                    <span className='price full-price'>{value.price * value.count} UAH</span>
                  </div>
                </div>
              </div>
            </div>
            )}
            <hr />
            <div className='row'>
              <div className='col'>
                <span className='header'><strong>РАЗОМ</strong></span>
              </div>
              <div className='col text-right'>
                <span className='price'><strong>{this.getFullPriceOrder(cartProducts)} UAH</strong></span>
              </div>
            </div>
            <hr />
            <div className='row'>
              <div className='col'>
                <span className='header'><strong>ДОСТАВКА</strong></span>
              </div>
              <div className='col text-right'>
                <span className='price'><strong>30-80 UAH</strong></span>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <i className="fa fa-exclamation-circle"></i>
                <span className='description'>
                  Остаточна вартість перевезення може відрізнятися від розрахованої
                </span>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <div className='row float-right buttons'>
          <button className='btn' onClick={this.cancelOrder}>СКАСУВАТИ</button>
          <button className='btn' id='submit-btn' onClick={this.successOrder}>ОК</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cartProducts: state.cartProducts.cartProducts,
    users: state.users.users,
    auth: state.auth.user
  };
}
export default connect(mapStateToProps, { GetUserInfoById, newOrder, clearCart })(Order)