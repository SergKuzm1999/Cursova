import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormControl, Row, Col, Navbar, NavItem } from "react-bootstrap";
import './NavMenu.css';
import './NavMenu.media.css';
import { connect } from "react-redux";
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';
import { getProductsByParams } from '../../actions/products';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_param: ''
    }

  }

  logout = (e) => {
    this.props.logout();
  }
  sumbitSearch = (e) => {
    e.preventDefault();
    window.location = `/search?name=${this.state.search_param}`;
  }

  changeSearch = (e) => {
    this.setState({ search_param: e.target.value });
  }

  render() {
    const countItemCart = this.props.cartProducts.length;
    const { isAuthenticated, user } = this.props.auth;
    var guestElem = (<div>
      <a href='/cart' id='cart'>
        <i className="fa fa-shopping-cart"></i>
        <span>КОРЗИНА</span>
        <span className='cart-item-count'>{countItemCart}</span>
      </a>
      <a href='/account/signin'>
        <i className="fa fa-user"></i>
        <span>УВІЙТИ</span>
      </a>
      <a href='/account/signup'>
        <i className="fa fa-user-plus"></i>
        <span>ЗАРЕЄСТРУВАТИСЯ</span>
      </a>
    </div>);
    var userElem = (<div>
      <a href='/cart' id='cart'>
        <i className="fa fa-shopping-cart"></i>
        <span>КОРЗИНА</span>
        <span className='cart-item-count'>{countItemCart}</span>
      </a>
      <a href='/profile'>
        <span>{isAuthenticated ? user.name.toUpperCase() : ''}</span>
      </a>
      <a href='/' onClick={this.logout}>
        <span>ВИЙТИ</span>
      </a>
    </div>)
    return (
      <div style={{ width: '100%' }}>
        <div style={{ borderRadius: '0' }} className='navbar top'>
          <nav>
            <div className='container'>
              <div style={{ float: 'left', marginTop: '3.5px' }}>
                <i className="fa fa-phone" style={{ fontSize: '25px' }}></i>
              </div>
              <div style={{ float: 'left', marginLeft: '0.7%', marginTop: '3.5px' }} className='phone'>
                <a href="tel:+3800967872781" className='phone'>+38 (096) 787 27 81</a>
              </div>
              <div style={{ float: 'left', marginLeft: '1%', paddingTop: '1px', marginTop: '3.5px' }}>
                <Link to='/services' className='services'> Доставка, оплата, повернення</Link>
              </div>
              <div className='search-form'>
                <form onSubmit={this.sumbitSearch} >
                  <input type="text" className="form-control"
                    onChange={this.changeSearch} placeholder="Пошук..." />
                  <span></span>
                  <div id='search' className='search-container'></div>
                </form>
              </div>
            </div>
          </nav>
        </div>
        <div style={{ borderRadius: '0' }} className='navbar middle'>
          <nav>
            <div className='container' >
              <Row>
                <Col md={8}>
                  <div className='logo'>
                    <a href='/'>
                      <img src='/img/logo.png' height='70px' alt='logo' />
                      <div>
                        <span>
                          The clothest, that live your life.
                        </span>
                      </div>
                    </a>
                  </div>
                </Col>
                <Col lg={4} >
                  <div className='right'>
                    {isAuthenticated ? userElem : guestElem}
                  </div>
                </Col>
              </Row>
            </div>
          </nav>
        </div>
        <nav className="navbar bot navbar-expand-lg navbar-light bg-light" >
          <button id='btn-menu-show'
            className="navbar-toggler mobile"
            type="button"
            data-toggle="collapse"
            data-target="#mob-navbar-menu, .mob-navbar-shadow"
            aria-controls="mob-navbar-menu, mob-navbar-shadow"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg"
              width="30" height="30"
              viewBox="0 0 30 30" role="img"
              focusable="false">
              <title>Menu</title>
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="2"
                d="M4 7h22M4 15h22M4 23h22">
              </path>
            </svg>
            <label className='btn-menu-show text' for='btn-menu-show'> Меню</label>
          </button>
          <div className='logo mobile'>
            <a href='/' >
              <img src='/img/logo.png' alt='logo-mobile' />
              <span style={{ display: 'block' }}>
                The clothest, that live your life.
              </span>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="mob-navbar-menu">
            <ul className="navbar-nav justify-content-center">
              <li className="nav-item mobile">
                <a className="fa fa-times" data-toggle="collapse" data-target="#mob-navbar-menu, .mob-navbar-shadow"
                  aria-controls="mob-navbar-menu, mob-navbar-shadow" />
              </li>
              <li className="nav-item">
                <a className="nav-link" href='/'>Головна</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href='/catalog/search?gender=man'>Чоловіче</a>
              </li>
              <li className="nav-item" >
                <a className="nav-link" href="/catalog/search?gender=woman">Жіноче</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/catalog/search?category=backpacks">Рюкзаки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/catalog/search?category=bananki">Бананки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/news">Новинки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/discounts">Знижки</a>
              </li>
              <li className="nav-item mobile">
                <a className="nav-link" href="/services">Доставка, оплата, повернення</a>
              </li>
              <li className="nav-item mobile">
                <a className="nav-link" href="/cart">Корзина</a>
              </li>
              <li className="nav-item mobile">
                <a className="nav-link" href="/account/signin">Увійти</a>
              </li>
              <li className="nav-item mobile">
                <a className="nav-link" href="/account/signup">Зареєструватися</a>
              </li>
            </ul>
          </div>
          <div className='mob-navbar-shadow collapse'/>
        </nav>

      </div>
    );
  }
}
NavMenu.propTypes =
{
  logout: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cartProducts: state.cartProducts.cartProducts,
    products: state.products.products
  };
}
export default connect(mapStateToProps, { logout, getProductsByParams })(NavMenu);