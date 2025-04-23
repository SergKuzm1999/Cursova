import React, { Component } from 'react';
import './Search.css';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { connect } from "react-redux";
import { getProductsByParams } from '../../../actions/products';
import Product from '../../Product/Product';
import {Helmet} from "react-helmet";

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeout: false,
            pagination: 1
        };
    }
    componentDidMount =()=> {
        document.title = 'Пошук - Clothes4U';
        window.addEventListener('scroll', this.scrollPagination);
        let params = new URLSearchParams(document.location.search);
        document.getElementById('search_input').value = params.get('name');
        document.getElementById('search_top').value = params.get('name');
        this.props.getProductsByParams('', '', '', '', '', '', '', params.get('name'), '', this.state.pagination)
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            );
    }
    scrollPagination = () => {
        let params = new URLSearchParams(document.location.search);
        if (this.state.timeout) {
            setTimeout(() => {
                this.setState({ timeout: false });
            }, 500);
        }
        else {
            
            let elements = document.getElementsByClassName('product');
            if (elements.length < this.props.count_products && elements.length > 0) {
                if (elements[elements.length - 1].getBoundingClientRect().top < 750) {
                    this.setState({ timeout: true });
                    this.setState({ pagination: this.state.pagination + 1 });
                    this.props.getProductsByParams('', '', '', '', '', '', '', params.get('name'), '', this.state.pagination)
                    .then(
                        () => { },
                        (err) => { console.log("Error get data ", err); }
                    );
                }
            }
        }
    }
    submit = (e) => {
        e.preventDefault();
        let search_param = document.getElementById('search_input').value;
        let params = new URLSearchParams(document.location.search);
        params.set('name', search_param);
        document.location = '/search?' + params.toString();
    }
    render() {
        const { products, count_products } = this.props;
        console.log(this.state);
        return (
            <div className='search-page'>
                <Helmet>
                    <meta name="keywords" content={`${new URLSearchParams(document.location.search).get('name')}, пошук, поиск, женщин, мужчин, парням, девушкам, жінок, чоловіків, для, дівчат, хлопців, clothes4u, купить, цены, цена, скидки, Украине, интернет, магазин, купити, в, Україні, ціни`}/>
                    <meta name="Description" content="Купити одяг, взуття, аксесуари та рюкзаки по величезних знижках. Інтернет-магазин Clothes4U. Оплата після огляду. Доставка по Україні за 24 години." />
                </Helmet>
                <div className='search-text text-center'>
                    <h1>РЕЗУЛЬТАТ ПОШУКУ</h1>
                    {count_products !== undefined && <h6>Всього знайдено:{count_products}</h6>}
                </div>
                <div className='position-relative'>
                    <form>
                        <input type='text' className="form-control" id='search_input' placeholder="Ведіть текст для пошуку" />
                        <button type='submit' onClick={this.submit}><i className="fa fa-search"></i></button>
                    </form>
                </div>
                <div className='container'>
                    <div className='row'>
                        {products !== undefined ? products.map((value, index) =>
                            <div key={index} className='col col-6 col-md-4 ' >
                                <Product product={value} /> 
                            </div>) :
                            <h6 className='text-center'>
                                ТОВАРІВ, ВІДПОВІДНИХ ВАШОМУ ЗАПИТУ, НЕ ВИЯВЛЕНО
                            </h6>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products.products,
        count_products: state.products.products.productsCount
    };
}
export default connect(mapStateToProps, { getProductsByParams })(Search);