import React, { Component } from 'react';
import './BreadCrumb.css';
import { connect } from "react-redux";
import { getCategories } from '../../actions/categories';

class BreadCrumb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            countSymbol: 0,
            re_render:false
        };

    }
    componentDidMount() {
        this.props.getCategories();
        this.setState({ show: window.location.pathname !== '/' });
        if (window.location.pathname === '/admin') this.setState({ show: false });
        if (this.state.show) {
            let count = 0;
            for (var i = 0; i < window.location.pathname.length; i++) {
                if (window.location.pathname[i] === '/') {
                    count = count + 1;
                }
            }
            this.setState({ countSymbol: count });
        }
    }

    input_category_now = () => {
        const category_name = new URLSearchParams(document.location.search).get('category');
        if (category_name != null) {
            const all_categories = this.props.categories;
            let return_value = '';
            if (window.location.pathname.search('/catalog', 0) >= 0) {
                if (category_name === null) return_value = 'Одяг, Аксесуари, Сумки, Взуття';
                all_categories.forEach(e => {
                    if (e[0].name === category_name) {
                        return_value = e[0].uaName;
                    }
                    else {
                        e[0].subcategories.map(s => {
                            if (s.name === category_name) {
                                return_value = s.uaName;
                            }
                        })
                    }
                });
            }
            return return_value;
        }
        return '';
    }
    render() {
        const { show, countSymbol } = this.state;
            if (show) {
                var categoryNow = '';
                const { products } = this.props;
                const pathName = window.location.pathname;
                var breadcrumContent, headerText, breadcrumGender, header, productId;
                var categoryName = this.input_category_now();
                console.log(this.props);
                if (products) categoryNow = products.subcategory;
                if (categoryName === '') header = document.getElementsByTagName('h1')[0];
                else header = categoryName;
                if (header !== '' && pathName !== '/cart' && header !== undefined) {
                    if (categoryName === '')
                        headerText = header.innerText.toLowerCase();
                    else headerText = header.toLowerCase();
                    if (headerText.search('не знайдена', 0) >= 0) {
                        breadcrumContent = (<section>
                            <li className="breadcrumb-item"><a href="/">Головна</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Сторінка не знайдена.</li>
                        </section>);
                    }
                    if (countSymbol === 1) {
                        breadcrumContent = (<section>
                            <li className="breadcrumb-item"><a href="/">Головна</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{headerText}</li>
                        </section>);
                    }
                    if (countSymbol === 2) {
                        if (pathName.search('/account', 0) >= 0 || pathName.search('/profile', 0) >= 0) {
                            breadcrumContent = (<section>
                                <li className="breadcrumb-item"><a href="/">Головна</a></li>
                                <li className="breadcrumb-item active">{headerText}</li>
                            </section>);
                            if (pathName.search('/profile', 0) >= 0) {
                                breadcrumContent = (<section>
                                    <li className="breadcrumb-item"><a href="/">Головна</a></li>
                                    <li className="breadcrumb-item"><a href="/profile">Обліковий запис</a></li>
                                    <li className="breadcrumb-item active">{headerText}</li>
                                </section>);
                            }
                        }
                        else {
                            breadcrumGender = this.props.current_gender;
                            if (breadcrumGender != null) {
                                breadcrumContent = (<section>
                                    <li className="breadcrumb-item"><a href="/">Головна</a></li>
                                    {breadcrumGender === 'man' ?
                                        <li className="breadcrumb-item"><a href={"/catalog/search?gender=" + breadcrumGender}>Для хлопців</a></li>
                                        : <li className="breadcrumb-item"><a href={"/catalog/search?gender=" + breadcrumGender}>Для дівчат</a></li>
                                    }
                                    <li className="breadcrumb-item active">{headerText}</li>
                                </section>);
                            }
                            else {
                                breadcrumContent = (<section>
                                    <li className="breadcrumb-item"><a href="/">Головна</a></li>
                                    <li className="breadcrumb-item"><a href={"/catalog/search?gender=" + breadcrumGender}>Для
                                {breadcrumGender === 'man' ? ' хлопців' : ' дівчат'}</a></li>
                                    <li className="breadcrumb-item active">{headerText}</li>
                                </section>);
                            }
                        }
                    }
                    if (countSymbol === 5) {
                        breadcrumGender = this.props.current_gender;
                        productId = pathName.split('/')[5];
                        breadcrumContent = (<section>
                            <li className="breadcrumb-item"><a href="/">Головна</a></li>
                            <li className="breadcrumb-item"><a href={"/catalog/search?gender=" + breadcrumGender}>Для
                                {breadcrumGender === 'man' ? ' хлопців' : ' дівчат'}</a></li>
                            <li className="breadcrumb-item"><a href={"/catalog/search?category=" + categoryNow.name}>{categoryNow.uaName}</a></li>
                            <li className="breadcrumb-item active">{productId}</li>
                        </section>);
                    }
                }
                if (pathName === '/cart') {
                    breadcrumContent = (<section>
                        <li className="breadcrumb-item"><a href="/">Головна</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Корзина</li>
                    </section>);
                }
                //ДЛЯ ПЕРЕЗАГРУЗКИ РЕНДЕРА!!
                setTimeout(()=>{
                    if(header === undefined)
                        this.setState({re_render:true});
                },500);
        }
       
        return (
            <nav aria-label="breadcrumb" className='nav-breadcrumb'>
                {show === true ?
                    <ul className="breadcrumb">
                        {countSymbol === 0 ? <li className='breadcrumb-item'><a href='/'>Головна / </a></li> : breadcrumContent}
                    </ul>
                    : ''}
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        categories: state.categories.categories,
        products: state.products.products,
        current_gender: state.current_gender.current_gender
    };
}
export default connect(mapStateToProps, { getCategories })(BreadCrumb);

