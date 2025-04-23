import React, { Component } from 'react';
import './ProductPage.css';
import { Button } from "react-bootstrap";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Dot, DotGroup, ImageWithZoom, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import AddReview from './AddReview';
import { getProductById } from '../../../actions/products';
import { getRecommendedProducts } from '../../../actions/recommended_products';
import { addProductToCart } from '../../../actions/cart';
import { connect } from "react-redux";
import Product from '../../Product/Product';
import { setAlert } from '../../../helpers/setAlert';
import $ from 'jquery';
import Carousel from 'react-elastic-carousel';
import axios from 'axios';
import { Helmet } from "react-helmet";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idProduct: 0,
            currentSlide: 0,
            size: '',
            count: 1,
            category_by_subcategory: '',
            size_input_f_text: '',
            size_input_s_text: '',
            simular_products: []
        };
        this.breakPoints = [
            { width: 1, itemsToShow: 1, pagination: false },
            { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
            { width: 700, itemsToShow: 3, itemsToScroll: 3 },
            { width: 850, itemsToShow: 4, itemsToScroll: 4 },
            { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
            { width: 1450, itemsToShow: 4, itemsToScroll: 4 },
            { width: 1750, itemsToShow: 4, itemsToScroll: 4 },
        ]
    }
    componentDidMount() {
        const { id, category } = this.props.match.params;
        this.setState({ idProduct: id });
        this.props.getProductById(id)
            .then(
                () => { },
                (err) => {
                    if (err.response.data === 'Не найдено продуктів')
                        window.location.pathname = '/notFound';
                }
            );
        this.props.getRecommendedProducts(category, id, 4, this.props.current_gender)
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            );

        // axios.get('/api/products/GetProducts_Similars/' + id).then(
        //     res => { this.setState({ simular_products: res.data }); }
        // );
    }
    imageZoom(type, e) {
        const modal = document.getElementById('modal');
        if (type === 'show') {
            modal.setAttribute('class', 'modal');
            modal.style.display = 'block';
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }
        if (type === 'hide') {
            modal.style.display = 'block';
            modal.setAttribute('class', ' ');
            document.getElementsByTagName('body')[0].style.overflow = 'auto';
        }
    }
    setCurrentSlide = () => {
        const carousel = document.getElementsByClassName('carousel');
        const slideElements = Array.from(carousel[0].getElementsByClassName("slide___3-Nqo slideHorizontal___1NzNV carousel__slide"));
        slideElements.forEach((element, index) => {
            if (element.getAttribute('aria-selected') === 'true') this.setState({ currentSlide: index })
        });
    }
    hide_show(e, id) {
        const elem = document.getElementById(id);
        if (elem.getAttribute('class') === 'hidden') {
            elem.setAttribute('class', 'visible');
            if (e != null)
                e.target.setAttribute('active', 'active');
        }
        else {
            elem.setAttribute('class', 'hidden');
            if (e != null)
                e.target.setAttribute('active', '');
        }
    }
    scrollTop(e) {
        e.preventDefault();
        var pos = $('#add-review-form').offset().top - 200;
        $('html,body').animate({ scrollTop: pos }, 1200, 'swing');
    }
    animationMoveToCart() {
        const elem = document.getElementsByClassName('move_to_cart')[0];
        const cart_elem = document.getElementById('cart');

        let pos_cart = cart_elem.getBoundingClientRect();
        let pos_img = elem.getBoundingClientRect();
        let pos_left = 0;
        let pos_top = 0;

        elem.style.visibility = 'visible';

        const id_interval = setInterval(function () {
            if (pos_left + pos_img.x >= pos_cart.left) {
                clearInterval(id_interval);
                elem.style.visibility = 'hidden';
                elem.style.top = 0;
                elem.style.left = 10 + 'px';
            }
            else {
                pos_left += 6;
                elem.style.left = pos_left + 'px';
                pos_top -= 1.5;
                elem.style.top = pos_top + 'px';

            }
        });
    }
    addProductToCart = (e) => {
        e.preventDefault();
        const { cartProducts } = this.props;
        const product = this.props.products;
        const id = product.id;
        console.log("CART",product);
        const { name, new_price } = product;
        let price = 0;
        if (new_price == 0) price = product.price;
        else price = new_price;
        const image = product.images[0];
        const { size, count, size_input_f_text, size_input_s_text } = this.state;
        const sizeInfo = size_input_f_text + ' | ' + size_input_s_text;
        const hrefProduct = `/catalog/${product.gender}/${product.subcategory}/${product.brand}/p${product.id}`;
        if (!cartProducts.find(value => {
            if (value.id === id && value.size === size) {
                return true;
            }
            else {
                return false
            }
        })) {
            setAlert({ message: 'Товар додано до Кошика', type: 'success' });
            this.props.addProductToCart({ id, hrefProduct, image, name, price, size, sizeInfo, count });
            this.animationMoveToCart();
        }
        else {
            setAlert({ message: 'Товар вже доданий в Кошик', type: 'danger' });
        }
    }
    size_text_change(e) {
        if (e.target.id === 'size_input_f') this.setState({ size_input_f_text: e.target.value });
        if (e.target.id === 'size_input_s') this.setState({ size_input_s_text: e.target.value });
    }
    render() {
        
        const products_dot_images = document.getElementsByClassName('dot-image');
        if (products_dot_images.length > 0) {
            if (products_dot_images.length <= 4) {
                document.getElementsByClassName('rec-arrow-down')[0].style.display = "none";
                document.getElementsByClassName('rec-arrow-up')[0].style.display = "none";
            }
        }

        const product = this.props.products;

        const { currentSlide, category_by_subcategory, size, simular_products } = this.state;
        const { size_input_f_text, size_input_s_text } = this.state;
        let { recommended_products } = this.props;
        var sizes = "";
        if (typeof sizes === 'string') {
            sizes = product ? product.sizes : '';
        }

        var reviews = product && product.reviews ? product.reviews : '';
        var rating = 0;
        if (reviews && reviews.length > 0) reviews.map((value) => rating = rating + value.rating);
        rating = rating / reviews.length;
        var sale_procent, saleElement;

        if (product) {
            sale_procent = 100 - (product.new_price * 100 / product.price);
            sale_procent = sale_procent.toString().split('.');
            saleElement = product.new_price != 0 ? <div className='sale-product'>-{sale_procent[0]}%</div> : '';
        }
        if (product && product.description && product.description.indexOf(';') > 0) {
            var descriptionArr = product.description.split(';');
        }
        if (product && product.description && product.description.indexOf('.') > 0) {
            var descriptionArr = product.description.split('.');
        }
        if (product) {
            var priceContent;
            if (product.new_price == 0) {
                priceContent = <div><h2 className='price'>{product && product.price} грн</h2></div>;
            }
            else {
                priceContent = (<div>
                    <h2 className='price' style={{ color: 'red' }}>{product && product.new_price} грн</h2>
                    <h4 className='price'><strike>{product && product.price} грн</strike></h4>
                </div>);
            }
        }
        var size_inputs_content = '';
        if (category_by_subcategory != '') {
            if (category_by_subcategory === 'clothes') {
                size_inputs_content = (
                    <div className='set-size-field'>
                        <label>Для визначення розміру вкажіть : </label>
                        <br />
                        <input type='text' className="form-control" placeholder={'Ваш ріст (см)'}
                            onChange={(e) => this.size_text_change(e)} id='size_input_f' />
                        <input type='text' className="form-control" placeholder={'Ваша вага (кг)'}
                            onChange={(e) => this.size_text_change(e)} id='size_input_s' />
                    </div>
                );
            }
            if (category_by_subcategory === 'shoes') {
                size_inputs_content = (
                    <div className='set-size-field'>
                        <label>Для визначення розміру вкажіть : </label>
                        <br />
                        <input type='text' className="form-control" placeholder={'Довжина устілки (см)'}
                            onChange={(e) => this.size_text_change(e)} id='size_input_f' style={{ maxWidth: '100%' }} />
                    </div>
                );
            }
            if (category_by_subcategory !== 'clothes' && category_by_subcategory !== 'shoes') {
                size_inputs_content = '';
            }
        }
        var size_input_f = document.getElementById("size_input_f");
        var size_input_s = document.getElementById('size_input_s');
        var cart_btn_text = 'В КОРЗИНУ';
        if (size !== '' && size_input_f_text != '') cart_btn_text = 'В КОРЗИНУ';
        if (size_input_f != null) {
            if (size_input_s != null) {
                if (size_input_f_text === '' || size_input_s_text === '')
                    cart_btn_text = 'Вкажіть дані для визначення розміру';
            }
            else {
                if (size_input_f_text === '')
                    cart_btn_text = 'Вкажіть дані для визначення розміру';
            }
        }
        if (sizes && size === '') cart_btn_text = 'Виберіть розмір';
        if (product) {
            document.title = product.name + ' - Clothes4U';
        }
        let recommended_products_reserve = [];
        if (recommended_products.length > 0) {
            for (let i = recommended_products.length - 1; i >= 0; i--) {
                recommended_products_reserve.push(recommended_products[i]);
            }
        }
        const product_id_now = window.location.pathname.split('/p')[1];
        return (
            <div className='product-page container'>
                <Helmet>
                    <meta name="Description" content={`Купити ${product && product.name} по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години.`} />
                    <meta name="Description" content={`${product && product.name}`} />
                </Helmet>
                <div className='row'>
                    <div className='col col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div>
                            <CarouselProvider onClick={this.setCurrentSlide} hasMasterSpinner={true} isPlaying={false}
                                interval={7500} naturalSlideWidth={70} naturalSlideHeight={95}
                                totalSlides={product && product.images && product.images.length}>
                                {saleElement}
                                <div>
                                    <i className='fa fa-search-plus' onClick={(e) => this.imageZoom('show', e)}></i>
                                </div>
                                <Slider>
                                    {product && product.images && product.images.map((value, index, array) =>
                                        <Slide key={index} index={index}><ImageWithZoom index={index} src={value} onClick={(e) => this.imageZoom('show', e)} /></Slide>)}
                                </Slider>
                                <ButtonBack className='button-move back' />
                                <ButtonNext className='button-move next' />

                                <DotGroup className='dot-group' />
                                <div className='dot-group-image' >
                                    <Carousel verticalMode={true} itemsToShow={4} itemToScroll={1}
                                        enableSwipe={false} enableMouseSwipe={false} focusOnSelect={true}>
                                        {product && product.images &&  product.images.map((value, index, array) =>
                                            <div key={index}>
                                                <Dot slide={index} className='dot-image'>
                                                    <Image
                                                        src={value}>
                                                    </Image>
                                                </Dot>
                                                {index === 0 && <img alt={value} src={value.path} style={{ visibility: 'hidden' }} className='move_to_cart' />}
                                            </div>
                                        )}
                                    </Carousel>
                                </div>
                            </CarouselProvider>
                        </div>
                        <div id='modal'>
                            <div className='row'>
                                <CarouselProvider hasMasterSpinner={true} currentSlide={currentSlide} naturalSlideWidth={70} naturalSlideHeight={93}
                                    totalSlides={product && product.images && product.images.length}>
                                    <Slider>
                                        {product && product.images && product.images.map((value, index, array) =>
                                            <Slide key={index} index={index + 1}><ImageWithZoom src={value} /></Slide>)}
                                    </Slider>
                                    <ButtonBack className='button-move back' />
                                    <ButtonNext className='button-move next' />
                                    <button type='button' onClick={() => this.imageZoom('hide', null)} className='close-modal'><i className="fa fa-times"></i></button>
                                </CarouselProvider>
                            </div>
                        </div>
                    </div>
                    <div className='col col-lg-6 col-md-6 col-sm-12 col-12'>
                        <div className='content'>
                            <form onSubmit={this.addProductToCart}>
                                <div>
                                    <h1 className='title'>
                                        {product && product.name}
                                        {product ? product.brand !== "Без бренду" && " / " : ''}
                                        {product ? product.brand !== "Без бренду" && product.brand : ''}
                                    </h1>
                                </div>
                                {priceContent}
                                <div className='review'>
                                    {rating >= 1 ? <i style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star"></i> :
                                        <i className="fa fa-star"></i>}
                                    {rating >= 2 ? <i style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star"></i> :
                                        <i className="fa fa-star"></i>}
                                    {rating >= 3 ? <i style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star"></i> :
                                        <i className="fa fa-star"></i>}
                                    {rating >= 4 ? <i style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star"></i> :
                                        <i className="fa fa-star"></i>}
                                    {rating >= 5 ? <i style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star"></i> :
                                        <i className="fa fa-star"></i>}
                                    <span>
                                        {reviews.length + ' відгуків'}
                                    </span>
                                </div>
                                <div className='color-products'>
                                    {simular_products.length > 0 && simular_products[0].map((value) =>
                                        value.id != product_id_now &&
                                        <a href={`${window.location.pathname.replace(product_id_now, value.id)}`} key={value.id}>
                                            <img src={value.images[0].path} alt={value.id} />
                                        </a>
                                    )}
                                </div>
                                <div className='size'>
                                    {sizes && sizes != '' ?
                                        <span>Розмір:</span> : ''}
                                    <br />
                                    {sizes && typeof sizes == 'object' &&
                                        sizes.map((value, index) => <input type='radio'
                                            onClick={(e) => { this.setState({ size: e.target.value }) }}
                                            value={value} name='size' id={`size-${value}`} key={index} />)}
                                </div>
                                {size_inputs_content}
                                <div className='counter'>
                                    <div className='row'>
                                        <div className='col col-lg-4 col-md-5 col-sm-4 col-12'>
                                            <div className='button-number row'>
                                                <div className='col col-'>
                                                    <Button type='button' onClick={() => {
                                                        if (this.state.count > 1) {
                                                            this.setState({ count: this.state.count - 1 });
                                                            document.getElementById('count_input').value = this.state.count - 1;
                                                        }
                                                        else {
                                                            this.setState({ count: this.state.count });
                                                            document.getElementById('count_input').value = this.state.count;
                                                        }
                                                    }}
                                                        id='decrement'>-</Button>
                                                </div>
                                                <div className='col col-'>
                                                    <input type='text' id='count_input' defaultValue='1' />
                                                </div>
                                                <div className='col col-'>
                                                    <Button type='button' onClick={() => {
                                                        this.setState({ count: this.state.count + 1 });
                                                        document.getElementById('count_input').value = this.state.count + 1
                                                    }}
                                                        id='increment'>+</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col col-lg-8 col-md-7 col-sm-8 col-12'>
                                            <Button type="submit" disabled={cart_btn_text !== 'В КОРЗИНУ'} className='order-btn'>
                                                {cart_btn_text}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className='description'>
                                {product && descriptionArr && descriptionArr.map((item, index) => {
                                    return <p key={index}>{item}</p>
                                })}
                            </div>
                            <div className='add-review'>
                                <Button type='button' onClick={() => this.hide_show(null, 'new-review')}>
                                    ВІДГУКІВ ({reviews.length >= 0 && reviews.length})
                                </Button>
                                <div className='hidden' id='new-review'>
                                    <div className='reviews'>
                                        <span>ВІДГУКИ КЛІЄНТІВ</span>
                                        <span style={{ float: 'right', cursor: 'pointer' }} onClick={this.scrollTop}>Написати відгук</span>
                                        {reviews.length > 0 && reviews.map((value, index) =>
                                            <div className='row' key={index}>
                                                <div className='col col-lg-2 col-3 col-sm-2 col-md-3'>
                                                    <div className='fa fa-user' />
                                                </div>
                                                <div className='col col-lg-10 col-9 col-sm-10 col-md-9'>
                                                    <div>
                                                        {value.rating >= 1 ? <div style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star" /> :
                                                            <div className="fa fa-star" style={{ color: 'rgb(207, 207, 207)' }} />}
                                                        {value.rating >= 2 ? <div style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star" /> :
                                                            <div className="fa fa-star" style={{ color: 'rgb(207, 207, 207)' }} />}
                                                        {value.rating >= 3 ? <div style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star" /> :
                                                            <div className="fa fa-star" style={{ color: 'rgb(207, 207, 207)' }} />}
                                                        {value.rating >= 4 ? <div style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star" /> :
                                                            <div className="fa fa-star" style={{ color: 'rgb(207, 207, 207)' }} />}
                                                        {value.rating >= 5 ? <div style={{ color: 'rgb(44, 44, 44)' }} className="fa fa-star" /> :
                                                            <div className="fa fa-star" style={{ color: 'rgb(207, 207, 207)' }} />}
                                                    </div>
                                                    <div className='name'>
                                                        
                                                        {value.user_name + ' '} 
                                                        {new Date(value.date).toLocaleString()}
                                                    </div>
                                                    <div className='text'>
                                                        {value.text}
                                                    </div>
                                                </div>
                                            </div>)}
                                        <AddReview idProduct={this.state.idProduct} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                {recommended_products.length > 0 ?
                    <div className='recomended-products'>
                        <h4>СХОЖІ ТОВАРИ</h4>
                        <Carousel enableAutoPlay={false} breakPoints={this.breakPoints}
                            enableMouseSwipe={false} itemPadding={[0, 10]}>
                            {recommended_products_reserve.map((value, index) =>
                                <section key={index}>
                                    <Product product={value} />
                                </section>)}
                        </Carousel>
                    </div> : ''}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        cartProducts: state.cartProducts.cartProducts,
        recommended_products: state.recommended_products.recommended_products,
        current_gender: state.current_gender.current_gender
    };
}
export default connect(mapStateToProps, { getProductById, addProductToCart, getRecommendedProducts })(ProductPage);