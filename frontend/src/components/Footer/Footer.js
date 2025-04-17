import React, { Component } from 'react';
import './Footer.css';
import { connect } from "react-redux";

class Footer extends Component {
  render() {
    const { current_gender } = this.props;
    return (
      <div className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='col col-12 col-sm-6 col-md-3 col-lg-3'>
              <span className='main-description'>
                категорії
              </span>
              <a href={`/news?gender=${current_gender}`} className='description'>
                Новинки
              </a>
              <a href={`/discounts?gender=${current_gender}`} className='description'>
                Знижки
              </a>
              <a href={`/catalog/search?category=outerwear&gender=${current_gender}`} className='description'>
                Одяг
              </a>
              <a href={`/catalog/search?category=bags-backpacks&gender=${current_gender}`} className='description'>
                Рюкзаки | Сумки
              </a>
              <a href={`/catalog/search?category=accessories&gender=${current_gender}`} className='description'>
                Аксесуари
              </a>
              <a href={`/catalog/search?category=shoes&gender=${current_gender}`} className='description'>
                Взуття
              </a>
            </div>
            <div className='col col-12 col-sm-6 col-md-3 col-lg-3'>
              <span className='main-description'>
                інформація
              </span>
              <a href='/services' className='description'>
                Доставка, оплата та повернення
              </a>
              <a href='/personal-data' className='description'>
                Політика Конфіденційності
              </a>
              <a href='/public-offer-agreement' className='description'>
                Договір публічної оферти
              </a>
              <a href='/reviews' className='description'>
                Відгуки
              </a>
            </div>
            <div className='col col-12 col-sm-6 col-md-3 col-lg-3'>
              <span className='main-description'>
                соціальні  мережі
              </span>
              <a href='https://www.instagram.com/clothes4u_ua/' className='description-icon'><i className="fa fa-instagram"></i></a>
              <a href='https://t.me/Infusser' className='description-icon'><i className="fa fa-telegram"></i></a>
            </div>
            <div className='col col-12 col-sm-6 col-md-3 col-lg-3'>
              <span className='main-description'>
                контакти
              </span>
              <span className='description'>
                <u>
                  Вайбер:
                </u>
                <span>
                  +38(096)787-27-81
                </span>
              </span>
              <span className='description mb-0'>
                <u>
                  Графік роботи:
                </u>
              </span>
              <span className='description mb-0'>
                Пн-пт: 09:00 - 23:00
              </span>
              <span className='description'>
                Сб-нд: 10:00 - 22:00
              </span>
              <span className='description'>
                <u style={{ display: 'block' }}>
                  E-mail:
                </u>
                <span style={{ wordBreak: 'break-word' }}>clothes4u.ua.store@gmail.com</span>
              </span>
            </div>
          </div>
          <div className='row footer-bottom'>
            <a href='/'><h4>Clothes4U</h4></a>
            <span>© Clothes4U 2021 Всі права захищено.</span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    current_gender: state.current_gender.current_gender
  };
}
export default connect(mapStateToProps, {  })(Footer);

