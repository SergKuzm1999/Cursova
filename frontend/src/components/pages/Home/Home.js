import React, { Component } from 'react';
import './Home.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const News = React.lazy(() => import('../News/News'));

class Home extends Component {
  componentDidMount(){
    document.title = 'Купити одяг, взуття, сумки, аксесуари в інтернет-магазині Clothes4U';
  }
  render() {
    const { current_gender } = this.props;
    return (
      <div>
        <Helmet>
          <meta name="Description" content="Купити одяг, взуття, аксесуари та рюкзаки по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
        </Helmet>
        <div className='grid' id='grid'>
          {window.innerWidth >= 769 &&
          <div className='item1'>
            <div className='background-main-img'>
              <img src={current_gender === 'man' ? '/img/home/carousel/1big-1920x500.jpg' : 
              '/img/home/carousel/woman_home.jpg'} alt='main_home_img' />
              <div className='shadow-text'>
                <div className='shadow-text-op'>
                  <h2>Clothes4U</h2>
                  <br />
                  <span>Більш ніж 1000 товарів</span>
                  <br />
                  <span>Понад 25% товару зі знижкою</span>
                  <br />
                  <span>Все для Вас по оптимальній ціні</span>
                </div>
              </div>
            </div>
          </div>}
          <div className='item item2'>
            <div>
              {current_gender === 'man' &&
              <a href={`/catalog/search?category=bags-backpacks&gender=${current_gender}`} >
                <img src={window.innerWidth <= 450 ? '/img/home/backpacks-mob.jpg' : '/img/home/backpacks.jpg'}
                 alt='backpacks' />
                <div className='tt-description'><span>СУМКИ | РЮКЗАКИ</span></div></a>}
                {current_gender === 'woman' &&
                <a href={`/catalog/search?category=womens-bags&gender=${current_gender}`} >
                <img src={window.innerWidth <= 450 ? '/img/home/bags_woman-mob.jpg' : '/img/home/bags_woman.jpg'}
                 alt='woman-bags' />
                <div className='tt-description'><span>СУМКИ ЖІНОЧІ</span></div></a>}
            </div>
          </div>
          <div className='item item3'>
            <div>
            {current_gender === 'man' &&
              <a href={`/catalog/search?category=t-shirts&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/t-shirt-mob.jpg' : '/img/home/t-shirt.jpg'}
                 alt='accessories' />
                <div className='tt-description'><span>ФУТБОЛКИ</span></div></a>}
            {current_gender === 'woman' &&
              <a href={`/catalog/search?category=costumes&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/costumes_woman-mob.jpg' : '/img/home/costumes_woman.jpg'}
                 alt='costumes' />
                <div className='tt-description'><span>КОСТЮМИ</span></div></a>}
            </div>
          </div>
          <div className='item item4'>
            <div>
            {current_gender === 'man' &&
              <a href={`/catalog/search?category=outerwear&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/outerwear-mob.jpg' : '/img/home/outerwear.jpg'}
                alt='outerwear' />
                <div className='tt-description'><span>ВЕРХНІЙ ОДЯГ</span></div></a>}
                {current_gender === 'woman' &&
              <a href={`/catalog/search?category=dresses&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/dresses_woman-mob.jpg' : '/img/home/dresses_woman.jpg'}
                alt='dresses' />
                <div className='tt-description'><span>СУКНІ</span></div></a>}
            </div>
          </div>
          <div className='item item5'>
            <div>
            {current_gender === 'man' &&
              <a href={`/catalog/search?category=sport-trousers&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/trousers-mob.jpg' : '/img/home/trousers.jpg'}
                alt='trousers' />
                <div className='tt-description'><span>СПОРТИВНІ ШТАНИ</span></div></a>}
            {current_gender === 'woman' &&
              <a href={`/catalog/search?category=hoodie&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/hoodie_woman-mob.jpg' : '/img/home/hoodie_woman.jpg'}
                 alt='hoodie' />
                <div className='tt-description'><span>ХУДІ</span></div></a>}
            </div>
          </div>
          <div className='item item6'>
            <div>
            {current_gender === 'man' &&
              <a href={`/catalog/search?category=hoodie&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/hudi-mob.jpg' : '/img/home/hudi.jpg'}
                alt='hudi' />
                <div className='tt-description'><span>ХУДІ</span></div></a>}
                {current_gender === 'woman' &&
              <a href={`/catalog/search?category=jeens&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/jeens_woman-mob.jpg' : '/img/home/jeens_woman.jpg'}
                 alt='jeens' />
                <div className='tt-description'><span>ДЖИНСИ</span></div></a>}
            </div>
          </div>
          <div className='item item7'>
            <div>
            {current_gender === 'man' &&
              <a href={`/catalog/search?category=shoes&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/shoes-mob.jpg' : '/img/home/shoes.jpg'}
                 alt='shoes' />
                <div className='tt-description'><span>ВЗУТТЯ</span></div></a>}
                {current_gender === 'woman' &&
              <a href={`/catalog/search?category=shoes&gender=${current_gender}`}>
                <img src={window.innerWidth <= 450 ? '/img/home/shoes_woman-mob.jpg' : '/img/home/shoes_woman.jpg'}
                alt='shoes' />
                <div className='tt-description'><span>ВЗУТТЯ</span></div></a>}
            </div>
          </div>
        </div>
        <News />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    current_gender: state.current_gender.current_gender
  };
}
export default connect(mapStateToProps, {  })(Home);
