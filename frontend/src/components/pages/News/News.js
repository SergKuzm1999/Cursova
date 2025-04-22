import React, { Component } from 'react';
import './News.css';
import Product from '../../Product/Product';
import { getNewsProducts } from '../../../actions/products';
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: 1,
            timeout: false
        };
    }
    componentDidMount() {
        if (window.location.pathname !== '/') {
            document.title = 'Новинки - Clothes4U';
        }
        this.getNewsProducts(this.props.current_gender);
        window.addEventListener('scroll', this.scrollPagination);
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
                    this.getNewsProducts(this.props.current_gender);
                }
            }
        }
    }
    getNewsProducts(gender) {
        this.props.getNewsProducts(this.state.pagination, gender)
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            )
    }
    render() {
        const { products } = this.props;
        return (
            <div className='news'>
                {window.location.pathname !== '/' &&
                    <Helmet>
                        <meta name="Description" content="Новинки. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
                    </Helmet>}
                <h1>НОВИНКИ</h1>
                <div className='row'>
                {products !== undefined && Array.isArray(products.products) && products.products.map((value, index) =>
                        <div key={index} className='col col-6 col-sm-4 col-md-3'>
                            <Product product={value} />
                        </div>)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products,
        productsCount: state.products.products.productsCount,
        current_gender: state.current_gender.current_gender
    };
}

export default connect(mapStateToProps, { getNewsProducts })(News);