import React, { Component } from 'react';
import './NavMenu.css';
import { connect } from "react-redux";
import { logout } from '../../actions/auth';
import { getProductsByParams } from '../../actions/products';
import { change_current_gender } from '../../actions/current_gender';

class NavMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_param: '',
      menu_choice: '',
      mobile_menu_choice: 'home'
    }
  }
  componentDidMount() {
    const { current_gender } = this.props;
    const params = new URLSearchParams(window.location.search);
    const pathname = window.location.pathname;
    if (pathname === '/discounts' || pathname === '/news' || pathname === '/catalog/search') {
      if (params.get('gender') !== current_gender) {
        params.set('gender', current_gender);
        window.location.search = params.toString();
      }
    }
    if (current_gender === 'man') {
      document.getElementById('gender_man').classList.add('_current');
      document.getElementById('gender_man_mob').classList.add('_current');
    }
    if (current_gender === 'woman') {
      document.getElementById('gender_woman').classList.add('_current');
      document.getElementById('gender_woman_mob').classList.add('_current');
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
  showMenu = (e, menu_choice) => {
    var hover_element = e;
    if (menu_choice !== undefined) {
      this.setState({ menu_choice: menu_choice });
    }
    var hover_link = document.getElementsByClassName('menu-link');
    if (hover_element.classList[0] === 'nav-link') {
      hover_element.classList.add('-hover');
    }
    if (hover_element.classList[0] === 'navbar-menu') {
      if (this.state.menu_choice === 'одяг')
        hover_link[0].classList.add('-hover');
      if (this.state.menu_choice === 'аксесуари')
        hover_link[1].classList.add('-hover');
      if (this.state.menu_choice === 'рюкзаки')
        hover_link[2].classList.add('-hover');
      if (this.state.menu_choice === 'взуття')
        hover_link[3].classList.add('-hover');
    }
    var shadow = document.getElementById('navbar_menu_shadow');
    var menu = document.getElementById('navbar_menu');
    shadow.classList.replace('collapse', 'show-animation');
    menu.classList.replace('collapse', 'show-animation');
  }
  closeMenu() {
    var menu = document.getElementById('navbar_menu');
    var shadow = document.getElementById('navbar_menu_shadow');
    shadow.classList.replace('show-animation', 'collapse');
    menu.classList.replace('show-animation', 'collapse');

    try {
      var hover_elements = document.getElementsByClassName('-hover');
      hover_elements[0].classList.remove('-hover');
    }
    catch (e) {
      console.log('Error - ', e);
    }
  }
  navbar_menu_content_render(menu_choice) {
    var navbar_menu_content = '';
    const { current_gender } = this.props;
    if (current_gender === 'man') {
      if (menu_choice === 'одяг') {
        navbar_menu_content = (<div className='row'>
          <div className='col'>
            <ul>
              <li>
                <a href={`/catalog/search?category=t-shirts&gender=${current_gender}/`}><span className='menu-categories _header'>Поло | Футболки</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=outerwear&gender=${current_gender}`}><span className='menu-categories'>Верхній Одяг</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=sweatshirts&gender=${current_gender}`}><span className='menu-categories _header'>Світшоти</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=vests&gender=${current_gender}`}><span className='menu-categories'>Жилетки</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=hoodie&gender=${current_gender}`}><span className='menu-categories'>Худі</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=sweater&gender=${current_gender}`}><span className='menu-categories _header'>Кофти, Гольфи</span></a>
              </li>
            </ul>
          </div>
          <div className='col'>
            <ul>
              <li>
                <a href={`/catalog/search?category=classic-trousers&gender=${current_gender}`}><span className='menu-categories _header'>Класичні Штани</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=sport-trousers&gender=${current_gender}`}><span className='menu-categories _header'>Спортивні Штани</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=jeens&gender=${current_gender}`}><span className='menu-categories'>Джинси</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=jogger&gender=${current_gender}`}><span className='menu-categories _header'>Карго, Джогери, Чиноси</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=underwear&gender=${current_gender}`}><span className='menu-categories _header'>Нижня білизна</span></a>
              </li>
            </ul>
          </div>
          <div className='col'>
            <ul>
              <li>
                <a href={`/catalog/search?category=sport-costumes&gender=${current_gender}`}><span className='menu-categories _header'>Спортивні Костюми</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=costumes&gender=${current_gender}`}><span className='menu-categories _header'>Костюми</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=kits&gender=${current_gender}`}><span className='menu-categories _header'>Комплекти</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=shirts&gender=${current_gender}`}><span className='menu-categories'>Сорочки</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=shorts&gender=${current_gender}`}><span className='menu-categories'>Шорти</span></a>
              </li>
              <li>
                <a href={`/catalog/search?category=jeens-shorts&gender=${current_gender}`}><span className='menu-categories'>Джинсові шорти</span></a>
              </li>
              
              
              
            </ul>
          </div>
        </div>);
      }
      if (menu_choice === 'взуття') {
        navbar_menu_content = (
          <div className='row'>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=sneakers&gender=${current_gender}`}><span className='menu-categories _header'>Кросівки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=slippers&gender=${current_gender}`}><span className='menu-categories _header'>Тапочки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=kedi&gender=${current_gender}`}><span className='menu-categories _header'>Кеди</span></a>
                </li>
              </ul>
            </div>
          </div>);
      }
      if (menu_choice === 'аксесуари') {
        navbar_menu_content = (
          <div className='row'>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=socks&gender=${current_gender}`}><span className='menu-categories _header'>Шкарпетки</span></a>
                </li>
                <li className='mg-top'>
                  <a href={`/catalog/search?category=baseball-caps&gender=${current_gender}`}><span className='menu-categories _header'>Кепки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=belts&gender=${current_gender}`}><span className='menu-categories _header'>Ремені</span></a>
                </li>
                <li className='mg-top'>
                  <a href={`/catalog/search?category=watch&gender=${current_gender}`}><span className='menu-categories _header'>Годинники</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=wallets&gender=${current_gender}`}><span className='menu-categories _header'>Гаманці</span></a>
                </li>
                <li className='mg-top'>
                  <a href={`/catalog/search?category=panama&gender=${current_gender}`}><span className='menu-categories _header'>Панами</span></a>
                </li>
              </ul>
            </div>
          </div>);
      }
      if (menu_choice === 'рюкзаки') {
        navbar_menu_content = (
          <div className='row'>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=sport-bags&gender=${current_gender}`}><span className='menu-categories _header'>Спортивні сумки</span></a>
                </li>
                <li className='mg-top'>
                  <a href={`/catalog/search?category=backpacks&gender=${current_gender}`}><span className='menu-categories _header'>Рюкзаки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=bags-on-the-shoulder&gender=${current_gender}`}><span className='menu-categories _header'>Сумки через плече</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=bananki&gender=${current_gender}`}><span className='menu-categories _header'>Сумки на пояс</span></a>
                </li>
              </ul>
            </div>
          </div>);
      }
    }
    if (current_gender === 'woman') {
      if (menu_choice === 'одяг') {
        navbar_menu_content = (<div className='row'>
          <div className='col'>
            <ul>
              <li>
                <a href={`/catalog/search?category=hoodie&gender=${current_gender}`}><span className='menu-categories _header'>Худі</span></a>
              </li>
              <li className='mg-top'>
                <a href={`/catalog/search?category=underwear&gender=${current_gender}`}><span className='menu-categories _header'>Нижня білизна</span></a>
              </li>
              <li className='mg-top'>
                <a href={`/catalog/search?category=sweaters&gender=${current_gender}`}><span className='menu-categories _header'>Кофти | Светри</span></a>
              </li>
            </ul>
          </div>
          <div className='col'>
            <ul>
              <li>
                <a href={`/catalog/search?category=trousers&gender=${current_gender}`}><span className='menu-categories _header'>Штани</span></a>
              </li>
              <li className='mg-top'>
                <a href={`/catalog/search?category=dresses&gender=${current_gender}`}><span className='menu-categories _header'>Сукні</span></a>
              </li>
            </ul>
          </div>
          <div className='col'>
            <ul>
              <li>
                <a href={`/catalog/search?category=shirts&gender=${current_gender}`}><span className='menu-categories _header'>Сорочки</span></a>
              </li>
              <li className='mg-top'>
                <a href={`/catalog/search?category=costumes&gender=${current_gender}`}><span className='menu-categories _header'>Костюми</span></a>
              </li>
            </ul>
          </div>
        </div>);
      }
      if (menu_choice === 'взуття') {
        navbar_menu_content = (
          <div className='row'>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=sneakers&gender=${current_gender}`}><span className='menu-categories _header'>Кросівки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=slippers&gender=${current_gender}`}><span className='menu-categories _header'>Тапочки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=kedi&gender=${current_gender}`}><span className='menu-categories _header'>Кеди</span></a>
                </li>
              </ul>
            </div>
          </div>);
      }
      if (menu_choice === 'аксесуари') {
        navbar_menu_content = (
          <div className='row'>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=socks&gender=${current_gender}`}><span className='menu-categories _header'>Шкарпетки</span></a>
                </li>
                <li className='mg-top'>
                  <a href={`/catalog/search?category=baseball-caps&gender=${current_gender}`}><span className='menu-categories _header'>Кепки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=watch&gender=${current_gender}`}><span className='menu-categories _header'>Годинники</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=belts&gender=${current_gender}`}><span className='menu-categories _header'>Ремені</span></a>
                </li>
              </ul>
            </div>
          </div>);
      }
      if (menu_choice === 'рюкзаки') {
        navbar_menu_content = (
          <div className='row'>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=sport-bags&gender=${current_gender}`}><span className='menu-categories _header'>Спортивні сумки</span></a>
                </li>
                <li className='mg-top'>
                  <a href={`/catalog/search?category=backpacks&gender=${current_gender}`}><span className='menu-categories _header'>Рюкзаки</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=bags-on-the-shoulder&gender=${current_gender}`}><span className='menu-categories _header'>Сумки через плече</span></a>
                </li>
                <li className='mg-top'>
                  <a href={`/catalog/search?category=womens-bags&gender=${current_gender}`}><span className='menu-categories _header'>Сумки Жіночі</span></a>
                </li>
              </ul>
            </div>
            <div className='col'>
              <ul>
                <li>
                  <a href={`/catalog/search?category=bananki&gender=${current_gender}`}><span className='menu-categories _header'>Сумки на пояс</span></a>
                </li>
              </ul>
            </div>
          </div>);
      }
    }
    return navbar_menu_content;
  }
  change_mobile_menu_content(e, mobile_menu_choice) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.setState({ mobile_menu_choice: mobile_menu_choice });
    }
  }
  close_change_mobil_menu(e) {
    e.preventDefault();
    const menu_mobile_changed = document.getElementById('menu_mobile_changed');
    menu_mobile_changed.classList.remove('mobile-show-animation');
    menu_mobile_changed.classList.add('mobile-close-animation');
    setTimeout(() => {
      menu_mobile_changed.classList.add('collapse');
      menu_mobile_changed.classList.remove('mobile-close-animation');
      this.setState({ mobile_menu_choice: 'home' })
    }, 500);

  }
  mobile_menu_content_render = (mobile_menu_choice) => {
    var content = '';
    const { current_gender } = this.props;
    if (mobile_menu_choice !== 'home') {
      const mobile_menu = document.getElementById('menu_mobile_changed');
      mobile_menu.classList.remove('collapse');
      mobile_menu.classList.add('mobile-show-animation');
      if (current_gender === 'man') {
        if (mobile_menu_choice === 'одяг') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=clothes&gender=${current_gender}`}><b>Одяг</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=t-shirts&gender=${current_gender}`}>Поло | Футболки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=outerwear&gender=${current_gender}`}>Верхній Одяг</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sweatshirts&gender=${current_gender}`}>Світшоти</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=vests&gender=${current_gender}`}>Жилетки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=hoodie&gender=${current_gender}`}>Худі</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sweater&gender=${current_gender}`}>Кофти | Гольфи</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=classic-trousers&gender=${current_gender}`}>Класичні Штани</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sport-trousers&gender=${current_gender}`}>Спортивні Штани</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=jeens&gender=${current_gender}`}>Джинси</a>
              </li>
              <li className="nav-item" style={{width:'70vw'}}>
                <a className="nav-link" style={{paddingRight:'0'}} href={`/catalog/search?category=jogger&gender=${current_gender}`}>Карго, Джогери, Чиноси</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sport-costumes&gender=${current_gender}`}>Спортивні Костюми</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=costumes&gender=${current_gender}`}>Костюми</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=kits&gender=${current_gender}`}>Комплекти</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=shirts&gender=${current_gender}`}>Сорочки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=shorts&gender=${current_gender}`}>Шорти</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=jeens-shorts&gender=${current_gender}`}>Джинсові шорти</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=underwear&gender=${current_gender}`}>Нижня білизна</a>
              </li>
              
              
              
              
              
              
            </ul>
          );
        }
        if (mobile_menu_choice === 'аксесуари') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=accessories&gender=${current_gender}`}><b>Аксесуари</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=socks&gender=${current_gender}`}>Шкарпетки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=baseball-caps&gender=${current_gender}`}>Кепки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=panama&gender=${current_gender}`}>Панами</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=belts&gender=${current_gender}`}>Ремені</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=wallets&gender=${current_gender}`}>Гаманці</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=watch&gender=${current_gender}`}>Годинники</a>
              </li>
            </ul>
          );
        }
        if (mobile_menu_choice === 'рюкзаки') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=bags-backpacks&gender=${current_gender}`}><b>Рюкзаки | Сумки</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=backpacks&gender=${current_gender}`}>Рюкзаки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=bananki&gender=${current_gender}`}>Сумки на пояс</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=bags-on-the-shoulder&gender=${current_gender}`}>Сумки через плече</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sport-bags&gender=${current_gender}`}>Спортивні сумки</a>
              </li>
            </ul>
          );
        }
        if (mobile_menu_choice === 'взуття') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=shoes&gender=${current_gender}`}><b>Взуття</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sneakers&gender=${current_gender}`}>Кросівки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=slippers&gender=${current_gender}`}>Тапочки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=kedi&gender=${current_gender}`}>Кеди</a>
              </li>
            </ul>
          );
        }
      }
      if (current_gender === 'woman'){
        if (mobile_menu_choice === 'одяг') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=clothes&gender=${current_gender}`}><b>Одяг</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=hoodie&gender=${current_gender}`}>Худі</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=shirts&gender=${current_gender}`}>Сорочки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=trousers&gender=${current_gender}`}>Штани</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=underwear&gender=${current_gender}`}>Нижня білизна</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=dresses&gender=${current_gender}`}>Сукні</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sweaters&gender=${current_gender}`}>Кофти | Светри</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=costumes&gender=${current_gender}`}>Костюми</a>
              </li>
            </ul>
          );
        }
        if (mobile_menu_choice === 'аксесуари') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=accessories&gender=${current_gender}`}><b>Аксесуари</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=socks&gender=${current_gender}`}>Шкарпетки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=baseball-caps&gender=${current_gender}`}>Кепки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=belts&gender=${current_gender}`}>Ремені</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`catalog/search?category=watch&gender=${current_gender}`}>Годинники</a>
              </li>
            </ul>
          );
        }
        if (mobile_menu_choice === 'рюкзаки') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=bags-backpacks&gender=${current_gender}`}><b>Рюкзаки | Сумки</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=backpacks&gender=${current_gender}`}>Рюкзаки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=bananki&gender=${current_gender}`}>Сумки на пояс</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=bags-on-the-shoulder&gender=${current_gender}`}>Сумки через плече</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sport-bags&gender=${current_gender}`}>Спортивні сумки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=womens-bags&gender=${current_gender}`}>Сумки Жіночі</a>
              </li>
            </ul>
          );
        }
        if (mobile_menu_choice === 'взуття') {
          content = (
            <ul className="navbar-nav justify-content-center mobile">
              <li className="nav-item close-item">
                <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=shoes&gender=${current_gender}`}><b>Взуття</b></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=sneakers&gender=${current_gender}`}>Кросівки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=slippers&gender=${current_gender}`}>Тапочки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/catalog/search?category=kedi&gender=${current_gender}`}>Кеди</a>
              </li>
            </ul>
          );
        }
      }
      if (mobile_menu_choice === 'user') {
        content = (
          <ul className="navbar-nav justify-content-center mobile">
            <li className="nav-item close-item">
              <a className="nav-link" href='/close_click' onClick={(e) => { this.close_change_mobil_menu(e) }}>Назад</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/profile/orders?page=1'><b>Мої замовлення</b></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/profile/edit'>Змінити контакти</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/profile/changePassword'>Змінити пароль</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/profile/changeAddress'>Змінити адресу</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href='/' onClick={this.logout}><b>Вийти</b></a>
            </li>
          </ul>
        );
      }
    }
    return content;
  }
  change_gender = (e, current_gender) => {
    e.preventDefault();
    window.location.reload();
    this.props.change_current_gender(current_gender);
  }
  render() {
    const countItemCart = this.props.cartProducts.length;
    const { menu_choice, mobile_menu_choice } = this.state;
    const { isAuthenticated, user } = this.props.auth;
    const { current_gender } = this.props;
    console.log(this.props);
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
      
       <div className='dropdown drop-down-user_options' 
       onMouseEnter={()=>{document.getElementById('drop-menu_user').classList.add('show')}}
       onMouseLeave={()=>{document.getElementById('drop-menu_user').classList.remove('show')}}>
          <button className='dropdown-toggle'
              type="button"
              id="dopbtn_user"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              {isAuthenticated ? user.email.toUpperCase() : ''}
          </button>
            <div className='dropdown-menu' id='drop-menu_user' aria-labelledby="dopbtn_user">
            <a href='/profile/orders?page=1'>
                <span><b>Мої замовлення</b></span>
            </a>
            <a href='/profile/edit'>
                <span>Редагувати контактні дані</span>
            </a>
            <a href='/profile/changePassword'>
                <span>Змінити пароль</span>
            </a>
            <a href='/profile/changeAddress'>
                <span>Змінити адресу</span>
            </a>
            <a href='/account/signin' onClick={this.logout}>
                <span><b>ВИЙТИ</b></span>
            </a>
          </div>
      </div>
     
      
    </div>)
    var navbar_menu_content = this.navbar_menu_content_render(menu_choice);
    var mobile_menu_content = this.mobile_menu_content_render(mobile_menu_choice);
    return (
      <div style={{ width: '100%' }}>
        <div style={{ borderRadius: '0' }} className='navbar top'>
          <nav>
            <div className='container'>
              <div style={{ float: 'left', marginLeft: '0.7%', marginTop: '3.5px' }} className='phone'>
                <a href="tel:+3800967872781" className='phone'>
                  <i className="fa fa-phone"></i>
                  +38 (096) 787 27 81
                </a>
              </div>
              <div style={{ float: 'left', marginLeft: '1%', paddingTop: '1px', marginTop: '3.5px' }}>
                <a href='/services' className='services'> Доставка, оплата, повернення</a>
              </div>
              <div className='search-form'>
                <form onSubmit={this.sumbitSearch} >
                  <input type="text" id='search_top' className="form-control"
                    onChange={this.changeSearch} placeholder="Пошук..." />
                  <button><i className="fa fa-search"></i></button>
                </form>
              </div>
            </div>
          </nav>
        </div>
        <div style={{ borderRadius: '0' }} className='navbar middle'>
          <nav>
            <div className='container' >
              <div className='row'>
                <div className='col col-md-6 col-lg-7'>
                  <div className='logo text-center'>
                    <a href='/'>
                      <h2>Clothes4U</h2>
                      <div>
                        <span>
                          The clothest, that live your life.
                        </span>
                      </div>
                    </a>
                  </div>
                </div>
                <div className='col col-md-6 col-lg-5'>
                  <div className='right'>
                    {isAuthenticated ? userElem : guestElem}
                  </div>
                  <div className='right'>
                    <div className='gender-choice'>
                      <a href='/' onClick={(e) => { this.change_gender(e, 'man') }} id='gender_man'>Для хлопців</a>
                      <a href='/' onClick={(e) => { this.change_gender(e, 'woman') }} id='gender_woman'>Для дівчат</a>
                    </div>
                  </div>
                </div>
              </div>
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
            onClick={()=>{document.getElementsByTagName('body')[0].style.overflow = 'hidden';}}>
            <label className='btn-menu-show text'> Меню</label>
          </button>
          <div className='logo mobile'>
            <a href='/' >
              <h2>Clothes4U</h2>
              <span style={{ display: 'block' }}>
                The clothest, that live your life.
              </span>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="mob-navbar-menu">
            <ul className="navbar-nav justify-content-center">
              <li className="nav-item mobile close-menu">
                <a className="nav-link" href="#close_navbar"
                  data-toggle="collapse"
                  data-target="#mob-navbar-menu, .mob-navbar-shadow"
                  aria-controls="mob-navbar-menu, mob-navbar-shadow"
                  aria-expanded="false"
                  onClick={()=>{
                    document.getElementsByTagName('body')[0].style.overflow = 'auto';
                    document.getElementsByTagName('body')[0].style.overflowX = 'hidden';
                    }}>Закрити</a>
              </li>
              <li className="nav-item mobile gender-item">
                <a className="nav-link mob-gender" onClick={(e) => { this.change_gender(e, 'man') }} id='gender_man_mob' href='/'>Для Хлопців</a>
                <a className="nav-link mob-gender" onClick={(e) => { this.change_gender(e, 'woman') }} id='gender_woman_mob' href='/'>Для Дівчат</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/discounts?gender=${current_gender}`}>Знижки</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href={`/news?gender=${current_gender}`}>Новинки</a>
              </li>
              <li className="nav-item">
                <a onMouseOver={(e) => { this.showMenu(e.target, 'одяг') }}
                  onMouseLeave={() => { this.closeMenu() }}
                  onClick={(e) => { this.change_mobile_menu_content(e, 'одяг') }}
                  className="nav-link menu-link" href={`/catalog/search?category=clothes&gender=${current_gender}`}>Одяг</a>
              </li>
              <li className="nav-item" >
                <a onMouseOver={(e) => { this.showMenu(e.target, 'аксесуари') }}
                  onMouseLeave={() => { this.closeMenu() }}
                  onClick={(e) => { this.change_mobile_menu_content(e, 'аксесуари') }}
                  className="nav-link menu-link" href={`/catalog/search?category=accessories&gender=${current_gender}`}>Аксесуари</a>
              </li>
              <li className="nav-item">
                <a onMouseOver={(e) => { this.showMenu(e.target, 'рюкзаки') }}
                  onMouseLeave={() => { this.closeMenu() }}
                  onClick={(e) => { this.change_mobile_menu_content(e, 'рюкзаки') }}
                  className="nav-link menu-link" href={`/catalog/search?category=bags-backpacks&gender=${current_gender}`}>Рюкзаки | Сумки</a>
              </li>
              <li className="nav-item">
                <a onMouseOver={(e) => { this.showMenu(e.target, 'взуття') }}
                  onMouseLeave={() => { this.closeMenu() }}
                  onClick={(e) => { this.change_mobile_menu_content(e, 'взуття') }}
                  className="nav-link menu-link" href={`/catalog/search?category=shoes&gender=${current_gender}`}>Взуття</a>
              </li>
              <li className="nav-item mobile">
                <a className="nav-link" href="/reviews">Відгуки</a>
              </li>
              <li className="nav-item mobile">
             
                 {isAuthenticated ? 
                  <a onClick={(e) => { this.change_mobile_menu_content(e, 'user') }}
                  className="nav-link menu-link user-name" href='/profile'>{user.email.toUpperCase()}</a>
                  :
                  <a className="nav-link" href="/account/signin" ><u>Особистий кабінет</u></a>}
              </li>
              <li className="nav-item mobile">
                <a className="nav-link" href="/services">Доставка, оплата, повернення</a>
              </li>
            </ul>
            <div className='menu-mobile_changed collapse' id='menu_mobile_changed'>
              {mobile_menu_content}
            </div>
          </div>
          <div className='mobile navbar-items'>
            
            <a href='/search'>
               <i className='fa fa-search'></i>
            </a>
            <a href='/cart' id='cart'>
              <i className="fa fa-shopping-cart"></i>
              <span className='cart-item-count'>{countItemCart}</span>
            </a>
          </div>
          <div className='mob-navbar-shadow collapse'></div>
        </nav>
        <div className='navbar-menu collapse' id='navbar_menu'
          onMouseLeave={() => { this.closeMenu() }}
          onMouseEnter={(e) => { this.showMenu(e.target) }}>
          {navbar_menu_content}
        </div>
        <div className='navbar-menu-shadow collapse' id='navbar_menu_shadow'></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    cartProducts: state.cartProducts.cartProducts,
    products: state.products.products,
    current_gender: state.current_gender.current_gender
  };
}
export default connect(mapStateToProps, { change_current_gender, logout, getProductsByParams })(NavMenu);