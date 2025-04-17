import React, { Component } from 'react';
import './Discounts.css';
import Product from '../../Product/Product';
import { getDiscountsProducts } from '../../../actions/products';
import { connect } from "react-redux";
import Carousel from 'react-elastic-carousel';
import { Helmet } from "react-helmet";

class Discounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: 1,
            timeout: false
        };
        this.breakPoints = [
            { width: 1, itemsToShow: 1, pagination: false },
            { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
            { width: 700, itemsToShow: 3, itemsToScroll: 3 },
            { width: 850, itemsToShow: 4, itemsToScroll: 4 },
            { width: 1150, itemsToShow: 4, itemsToScroll: 4 },
            { width: 1450, itemsToShow: 5 },
            { width: 1750, itemsToShow: 6 },
        ]
    }
    componentDidMount() {
        document.title = 'Знижки - Clothes4U';
        window.addEventListener('scroll', this.scrollPagination);
        if (this.props.carousel) {
            this.getDiscountsProducts(this.props.current_gender);
        }
        this.getDiscountsProducts(this.props.current_gender);
    }
    getDiscountsProducts(gender) {
        this.props.getDiscountsProducts(this.state.pagination, gender)
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            )
    }
    scrollPagination = () => {
        if (this.state.timeout) {
            setTimeout(() => {
                this.setState({ timeout: false });
            }, 500);
        }
        else {
            let elements = document.getElementsByClassName('product');
            if (elements.length < this.props.productsCount && elements.length > 0) {
                if (elements[elements.length - 1].getBoundingClientRect().top < 700) {
                    this.setState({ timeout: true });
                    this.setState({ pagination: this.state.pagination + 1 });
                    this.getDiscountsProducts(this.props.current_gender);
                }
            }
        }
    }
    render() {
        const { products, carousel } = this.props;
        return (
            <div className='discounts'>
                {window.location.pathname !== '/cart' &&
                    <Helmet>
                        <meta name="Description" content="Купити одяг, взуття, аксесуари та рюкзаки по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
                    </Helmet>}
                <h1>знижки</h1>
                {carousel ?
                    <div className='container'>
                        <Carousel enableAutoPlay={false} autoPlaySpeed={5000} breakPoints={this.breakPoints} itemPadding={[0, 10]}>
                            {products !== undefined && products.map((value, index) =>
                                <section key={index}>
                                    <Product product={value} />
                                </section>)}
                        </Carousel>
                    </div>
                    :
                    <div className='row'>
                        {products !== undefined && products.map((value, index) =>
                            <div key={index} className='col col-6 col-sm-4 col-md-3'>
                                <Product product={value} />
                            </div>)}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products.products,
        productsCount: state.products.products.productsCount,
        current_gender: state.current_gender.current_gender
    };
}

export default connect(mapStateToProps, { getDiscountsProducts })(Discounts);