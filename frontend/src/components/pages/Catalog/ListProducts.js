import React, { Component } from 'react';
import Product from '../../Product/Product';
import './ListProducts.css';
import { getProducts, getProductsByParams } from '../../../actions/products';
import { getCategories } from '../../../actions/categories';
import { connect } from "react-redux";
import axios from 'axios';
import { Helmet } from "react-helmet";

class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            pagination: 1,
            filter_colors: [],
            filter_brands: [],
            filter_sizes: [],
            count_shoes: 0,
            count_clothes: 0,
            count_bags_backpacks: 0,
            count_accessories: 0,

            count_sneakers: 0,
            count_kedi: 0,
            count_slippers: 0,
            count_t_shirts: 0,
            count_outerwear: 0,
            count_sweatshirts: 0,
            count_sport_costumes: 0,
            count_hoodie: 0,
            count_shirts: 0,
            count_sport_trousers: 0,
            count_jeens: 0,
            count_jogger: 0,
            count_shorts: 0,
            count_jeens_shorts: 0,
            count_kits: 0,

            count_vests: 0,
            count_sweaters: 0,
            count_costumes: 0,
            count_dresses: 0,
            count_underwear: 0,
            count_trousers: 0,

            count_sweater: 0,
            count_classic_trousers: 0,

            count_sport_bags: 0,
            count_backpacks: 0,
            count_bags_on_the_shoulder: 0,
            count_womens_bags: 0,
            count_bananki: 0,
            count_panama: 0,

            count_socks: 0,
            count_belts: 0,
            count_wallets: 0,
            count_baseball_caps: 0,
            count_watch: 0,

            timeout: false
        };
    }
    componentDidMount = () => {
        let category_now = this.input_category_now().toLowerCase();
        let {current_gender} = this.props;
        if(current_gender === 'man')current_gender = 'для хлопців';
        if(current_gender === 'woman')current_gender = 'для дівчат';
        if(category_now !== ''){
            category_now = this.input_category_now().toLowerCase();
            category_now = category_now.charAt(0).toUpperCase() + category_now.slice(1);
            document.title = category_now + ' ' + current_gender + ' - Clothes4U';
        }
        if(category_now === ''){
            setTimeout(()=>{
                category_now = this.input_category_now().toLowerCase();
                category_now = category_now.charAt(0).toUpperCase() + category_now.slice(1);
                document.title = category_now + ' ' + current_gender + ' - Clothes4U';
            },1000);
        }
        window.addEventListener('scroll', this.scrollPagination);
        this.getCategories();
        this.getProductsByParams();
        this.get_product_count();
        this.set_filter_class('color', 'filter_color');
        this.set_filter_class('brand', 'filter_brand');
        this.set_filter_class('size', 'filter_size');
        this.set_filter_class_price();
        this.set_mob_filters_values();
    }
    set_mob_filters_values() {
        const params = new URLSearchParams(window.location.search);
        if (params.get('color') !== null) {
            document.getElementById('filter_mob_color').setAttribute('selected_value', params.get('color'));
        }
        if (params.get('brand') !== null) {
            document.getElementById('filter_mob_brand').setAttribute('selected_value', params.get('brand'));
        }
        if (params.get('size') !== null) {
            document.getElementById('filter_mob_size').setAttribute('selected_value', params.get('size'));
        }
        if (params.get('minprice') !== null && params.get('maxprice') !== null) {
            document.getElementById('filter_mob_price').setAttribute('selected_value',
                params.get('minprice') + ' - ' + params.get('maxprice'));
        }
    }
    set_filter_class(filter_name, filter_id) {
        let params = new URLSearchParams(window.location.search);
        if (params.get(filter_name) !== null) {
            const element = document.getElementById(filter_id);
            element.innerText = params.get(filter_name);
            element.classList.remove('not_selected');
            element.classList.add('selected');
        }
    }
    set_filter_class_price() {
        let params = new URLSearchParams(window.location.search);
        const element = document.getElementById('filter_price');
        if (params.get('minprice') !== null && params.get('maxprice') !== null) {
            element.innerText = 'Ціна: ' + params.get('minprice') + ' - ' + params.get('maxprice');
            element.classList.remove('not_selected');
            element.classList.add('selected');
        }
    }
    get_product_count() {
        const { current_gender } = this.props;
        if (current_gender === 'man') {
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=костюми&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_costumes: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=кофти, гольфи&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sweater: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=класичні штани&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_classic_trousers: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=одяг&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_clothes: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=взуття&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_shoes: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=кросівки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sneakers: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=кеди&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_kedi: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=тапочки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_slippers: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=футболки, поло&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_t_shirts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=верхній одяг&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_outerwear: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=світшоти&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sweatshirts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=спортивні костюми&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sport_costumes: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=худі&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_hoodie: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=сорочки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_shirts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=спортивні штани&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sport_trousers: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=джинси&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_jeens: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=карго, джогери, чиноси&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_jogger: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=шорти&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_shorts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=джинсові шорти&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_jeens_shorts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=комплекти&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_kits: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=рюкзаки, сумки&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_bags_backpacks: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=спортивні сумки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sport_bags: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=рюкзаки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_backpacks: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=сумки через плече&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_bags_on_the_shoulder: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=сумки на пояс&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_bananki: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=аксесуари&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_accessories: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=шкарпетки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_socks: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Ремені&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_belts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=гаманці&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_wallets: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=кепки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_baseball_caps: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Годинники&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_watch: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Нижня білізна&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_underwear: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Жилетки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_vests: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Панами&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_panama: res.data });
                });
        }
        if (current_gender === 'woman') {
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=одяг&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_clothes: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=взуття&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_shoes: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=кросівки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sneakers: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=кеди&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_kedi: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=тапочки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_slippers: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=худі&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_hoodie: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=сорочки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_shirts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=штани&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_trousers: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Кофти, Светри&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sweaters: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Костюми&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_costumes: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Сукні&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_dresses: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Нижня Білизна&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_underwear: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=рюкзаки, сумки&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_bags_backpacks: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=сумки жіночі&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_womens_bags: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=спортивні сумки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_sport_bags: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=рюкзаки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_backpacks: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=сумки через плече&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_bags_on_the_shoulder: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=сумки на пояс&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_bananki: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=аксесуари&isCategory=true&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_accessories: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=шкарпетки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_socks: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Ремені&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_belts: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=кепки&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_baseball_caps: res.data });
                });
            axios.get('/api/products/Get_Count_Product_Categories?subcategory=Годинники&isCategory=false&gender=' + current_gender)
                .then(res => {
                    this.setState({ count_watch: res.data });
                });
        }
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
                if (elements[elements.length - 1].getBoundingClientRect().top < 750) {
                    this.setState({ timeout: true });
                    this.setState({ pagination: this.state.pagination + 1 });
                    this.getProductsByParams();
                }
            }
        }
    }
    getProductsByParams() {
        const search = window.location.search;
        let gender = (new URLSearchParams(search)
            .get("gender")) != null ? (new URLSearchParams(search).get("gender")) : "";
        let brand = (new URLSearchParams(search)
            .get("brand")) != null ? (new URLSearchParams(search).get("brand")) : "";
        let category = (new URLSearchParams(search)
            .get("category")) != null ? (new URLSearchParams(search).get("category")) : "";
        let color = (new URLSearchParams(search)
            .get("color")) != null ? (new URLSearchParams(search).get("color")) : "";
        let size = (new URLSearchParams(search)
            .get("size")) != null ? (new URLSearchParams(search).get("size")) : "";
        let minprice = (new URLSearchParams(search)
            .get("minprice")) != null ? (new URLSearchParams(search).get("minprice")) : "";
        let name = (new URLSearchParams(search)
            .get("name")) != null ? (new URLSearchParams(search).get("name")) : "";
        let maxprice = (new URLSearchParams(search)
            .get("maxprice")) != null ? (new URLSearchParams(search).get("maxprice")) : "";
        let sort = (new URLSearchParams(search)
            .get("sort")) != null ? (new URLSearchParams(search).get("sort")) : "";

        let { pagination } = this.state;
        this.props.getProductsByParams(gender, category, brand, color, size, minprice, maxprice, name, sort, pagination)
            .then(
                () => { },
                (err) => this.setState({ error: err.response.data })
            )
    }
    getCategories() {
        this.props.getCategories()
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            )
    }
    modal_submit = () => {
        const brand = document.getElementById('filter_mob_brand').getAttribute('selected_value');
        const color = document.getElementById('filter_mob_color').getAttribute('selected_value');
        const size = document.getElementById('filter_mob_size').getAttribute('selected_value');
        const min_price = document.getElementById('min_mob_price').value;
        const max_price = document.getElementById('max_mob_price').value;
        const params = new URLSearchParams(window.location.search);
        if (brand !== null) {
            params.set('brand', brand);
        }
        if (size !== null) {
            params.set('size', size);
        }
        if (color !== null) {
            params.set('color', color);
        }
        if (min_price !== '' && max_price !== '') {
            if (parseInt(min_price, 10) > parseInt(max_price, 10)) {
                params.set('minprice', max_price);
                params.set('maxprice', min_price);
            }
            else {
                params.set('minprice', min_price);
                params.set('maxprice', max_price);
            }
        }
        window.location.search = params.toString();
    }
    modal_reset() {
        let dropdown_toggles = document.getElementsByClassName('dropdown-toggle');
        const params = new URLSearchParams(window.location.search);
        for (let i = 0; i < dropdown_toggles.length; i++) {
            dropdown_toggles[i].removeAttribute('selected_value');
        }
        params.delete('color');
        params.delete('brand');
        params.delete('size');
        params.delete('minprice');
        params.delete('maxprice');
        window.location.search = params.toString();

    }
    click_sort_btn(e, sort_name) {
        let location = document.location.search;
        let sort_value = new URLSearchParams(location).get('sort');
        if (sort_value === null) {
            if (location === '') {
                location = 'sort=' + sort_name;
            }
            else {
                location += '&sort=' + sort_name;
            }
        }
        location = location.replace(sort_value, sort_name);
        document.location.search = location;
        this.getProductsByParams();
        let selected_value = e.target.value;
        const element = document.getElementById('dropbtn_sort');
        element.setAttribute('selected_value', selected_value);
    }
    input_category_now = () => {
        const category_name = new URLSearchParams(document.location.search).get('category');
        const all_categories = this.props.categories.categories;
       
        let return_value = '';
        if (category_name === null) return_value = 'Одяг, Аксесуари, Сумки, Взуття';
        if (all_categories && all_categories.length > 0) {
            all_categories.forEach(e => {
                if (e.name === category_name) {
                    return_value = e.ua_name;
                }
                else {
                    e.subcategories.map(s => {
                        if (s.name === category_name) {
                            return_value = s.ua_name;
                        }
                    })
                }
            });
        }
        return return_value;
    }
    category_click(e) {
        var target = e.target;
        if (target.classList[1] !== 'clicked') {
            target.classList.remove('not_clicked');
            target.classList.add("clicked");
        }
        else {
            target.classList.remove('clicked');
            target.classList.add("not_clicked");
        }
    }
    get_filter_colors() {
        if (this.props.filter_colors !== undefined) {
            this.props.filter_colors.sort();
            this.setState({ filter_colors: this.props.filter_colors });
        }
    }
    get_filter_brands() {
        if (this.props.filter_brands !== undefined) {
            this.props.filter_brands.sort();
            this.setState({ filter_brands: this.props.filter_brands });
        }
    }
    get_filter_sizes() {
        let filter_sizes = [];
        if (this.props.filter_sizes !== undefined) {
            this.props.filter_sizes.map((value) => {
                value.map((size) => {
                    filter_sizes.push(size);
                });
            })
            filter_sizes = Array.from(new Set(filter_sizes));
            if (filter_sizes.indexOf('XS') > 0) {
                filter_sizes.splice(filter_sizes.indexOf('XS'),1);
                filter_sizes.unshift('XS');
            }
            this.setState({ filter_sizes: filter_sizes });
        }
    }
    get_filter_price() {
        let prices;
        let min, max;
        if (this.props.filter_prices !== undefined) {
            prices = this.props.filter_prices.map((value) => {
                return value;
            })
            min = Math.min(...prices);
            max = Math.max(...prices);
            document.getElementById('min_price').value = min;
            document.getElementById('max_price').value = max;
            document.getElementById('min_mob_price').value = min;
            document.getElementById('max_mob_price').value = max;
        }
    }
    click_filter = (filter_id, filter_name) => {
        const element = document.getElementById(filter_id);
        const params = new URLSearchParams(window.location.search);
        if (element.classList[3] === 'selected') {
            if (filter_id === 'filter_price') {
                params.delete('minprice');
                params.delete('maxprice');
            }
            else {
                params.delete(filter_name);
            }
            window.location.search = params.toString();
        }
        if (element.classList[3] === 'not_selected') {
            switch (filter_id) {
                case 'filter_color':
                    this.get_filter_colors();
                    break;
                case 'filter_brand':
                    this.get_filter_brands();
                    break;
                case 'filter_size':
                    this.get_filter_sizes();
                    break;
                case 'filter_price':
                    this.get_filter_price();
                    break;
                default:
                    break;
            }
        }
    }
    click_mob_filter = (filter_id) => {
        switch (filter_id) {
            case 'filter_mob_color':
                this.get_filter_colors();
                break;
            case 'filter_mob_brand':
                this.get_filter_brands();
                break;
            case 'filter_mob_size':
                this.get_filter_sizes();
                break;
            case 'filter_mob_price':
                this.get_filter_price();
                break;
            default:
                break;
        }
    }
    choose_filter(e, filter_name) {
        let params = new URLSearchParams(window.location.search);
        params.set(filter_name, e.target.innerHTML);
        window.location.search = params.toString();
    }
    choose_filter_price() {
        let params = new URLSearchParams(window.location.search);
        const min = document.getElementById('min_price').value;
        const max = document.getElementById('max_price').value;
        if (min !== '' && max !== '') {
            if (parseInt(min, 10) > parseInt(max, 10)) {
                params.set('minprice', max);
                params.set('maxprice', min);
            }
            else {
                params.set('minprice', min);
                params.set('maxprice', max);
            }
        }
        window.location.search = params.toString();
    }
    choose_mob_filter(e, filter_id) {
        if (filter_id === 'filter_mob_price') {
            const min = document.getElementById('min_mob_price').value;
            const max = document.getElementById('max_mob_price').value;
            document.getElementById(filter_id).setAttribute('selected_value', min + ' - ' + max);
        }
        else {
            document.getElementById(filter_id).setAttribute('selected_value', e.target.innerHTML);
            this.modal_submit();
        }
    }
    render() {
        let { current_gender } = this.props;
        let category_now = this.input_category_now();
        const products = this.props.products;
        const { error, filter_colors, filter_sizes, filter_brands } = this.state;
        const selected_sort_value = new URLSearchParams(window.location.search).get('sort');
        return (
            <div className='list-products'>
                <Helmet>
                    <meta name="Description" content={`Купити ${category_now.toLowerCase()} по величезних знижках. Інтернет-магазин Clothes4U. Доставка по Україні за 24 години.`} />
                </Helmet>

                <div className='row mobile-filters' style={{ width: '100%' }}>
                    <div className='row justify-content-end' style={{ width: '100%', margin: '0' }}>
                        <div className='col text-right mobile-filter-btns'>
                            <button className='btn' id='filter'
                                type="button"
                                data-toggle="collapse"
                                data-target="#modal-filter, #shadow"
                                aria-controls="modal-filter, shadow"
                                aria-expanded="false"
                                onClick={() => { document.getElementsByTagName('body')[0].style.overflow = 'hidden'; }}>
                                фільтр
                            </button>
                            <button className='btn' id='sort'
                                type="button"
                                data-toggle="collapse"
                                data-target="#modal-sort, #shadow"
                                aria-controls="modal-sort, shadow"
                                aria-expanded="false"
                                onClick={() => { document.getElementsByTagName('body')[0].style.overflow = 'hidden'; }}>
                                {selected_sort_value === 'MIN_PRICE' && <span>Від дешевих</span>}
                                {selected_sort_value === 'MAX_PRICE' && <span>Від дорогих</span>}
                                {selected_sort_value === 'NEW' && <span>Спочатку нові</span>}
                                {selected_sort_value === 'OLDER' && <span>Спочатку старі</span>}
                                {selected_sort_value === null && <span>Сортувати</span>}
                            </button>
                        </div>
                    </div>
                    <div id='modal-filter' className='collapse modal'>
                        <div className='row'>
                            <h4><b>фільтр</b></h4>
                            <button id='close-modal-filter' className='close-btn'
                                data-toggle="collapse"
                                data-target="#modal-filter, #shadow, .shadow"
                                aria-controls="modal-filter, shadow"
                                aria-expanded="false"
                                onClick={() => {
                                    document.getElementsByTagName('body')[0].style.overflow = 'auto';
                                    document.getElementsByTagName('body')[0].style.overflowX = 'hidden';
                                }}>
                            </button>
                        </div>
                        <div className='dropdown' >
                            <button className='btn dropdown-toggle' id='filter_mob_brand'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_mob_filter('filter_mob_brand')}>
                                Бренд
                            </button>
                            <div className='dropdown-menu' aria-labelledby="filter_mob_brand">
                                {filter_brands.length > 0 && filter_brands.map((value, index) =>
                                    <button key={index} className="dropdown-item" aria-expanded="false"
                                        onClick={(e) => { this.choose_mob_filter(e, 'filter_mob_brand') }}>
                                        {value}
                                    </button>)}
                            </div>
                        </div>
                        <div className='dropdown' >
                            <button className='btn dropdown-toggle' id='filter_mob_price'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_mob_filter('filter_mob_price')}>
                                Ціна
                            </button>
                            <div className='dropdown-menu price-filter' aria-labelledby="filter_mob_price">
                                <div className='row'>
                                    <div className='col'>
                                        <span>Від </span><input type='text' id='min_mob_price'></input>
                                    </div>
                                    <div className='col'>
                                        <span>До </span><input type='text' id='max_mob_price'></input>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <button onClick={(e) => { this.choose_mob_filter(e, 'filter_mob_price') }}>Застосувати</button>
                                </div>

                            </div>
                        </div>
                        <div className='dropdown' >
                            <button className='btn dropdown-toggle' id='filter_mob_size'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_mob_filter('filter_mob_size')}>
                                Розмір
                            </button>
                            <div className='dropdown-menu' aria-labelledby="filter_mob_size">
                                {filter_sizes.length > 0 && filter_sizes.map((value, index) =>
                                    <button key={index} className="dropdown-item" aria-expanded="false"
                                        onClick={(e) => { this.choose_mob_filter(e, 'filter_mob_size') }}>
                                        {value}
                                    </button>)}
                            </div>
                        </div>
                        <div className='dropdown' >
                            <button className='btn dropdown-toggle' id='filter_mob_color'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_mob_filter('filter_mob_color')}>
                                Колір
                            </button>
                            <div className='dropdown-menu' aria-labelledby="filter_mob_color">
                                {filter_colors.length > 0 && filter_colors.map((value, index) =>
                                    <button key={index} className="dropdown-item" aria-expanded="false"
                                        onClick={(e) => { this.choose_mob_filter(e, 'filter_mob_color') }}>
                                        {value}
                                    </button>)}
                            </div>
                        </div>
                        <div className='row float-right'>
                            <button className='btn btn-form' onClick={() => this.modal_submit()}>Ок</button>
                        </div>
                        <div className='row float-left'>
                            <button className='btn btn-form' onClick={() => this.modal_reset()}>Скинути</button>
                        </div>
                    </div>
                    <div id='modal-sort' className='collapse modal'>
                        <div className='row'>
                            <h4><b>сортувати</b></h4>
                            <button id='close-modal-sort' className='close-btn'
                                data-toggle="collapse"
                                data-target="#modal-sort, #shadow, .shadow"
                                aria-controls="modal-sort, shadow"
                                aria-expanded="false"
                                onClick={() => {
                                    document.getElementsByTagName('body')[0].style.overflow = 'auto';
                                    document.getElementsByTagName('body')[0].style.overflowX = 'hidden';
                                }}>
                            </button>
                        </div>
                        <div className='row'>
                            <div className='dropdown'>
                                <button className='dropdown-toggle'
                                    type="button"
                                    id="dropbtn_sort"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    сортувати
                                </button>
                                <div className='dropdown-menu' aria-labelledby="dropbtn_sort">
                                    <button className="dropdown-item"
                                        data-toggle="collapse"
                                        data-target="#modal-sort, #shadow"
                                        aria-controls="modal-sort, shadow"
                                        aria-expanded="false"
                                        value='від дешевих до дорогих'
                                        onClick={(e) => this.click_sort_btn(e, 'MIN_PRICE')}>
                                        від дешевих до дорогих
                                    </button>
                                    <button className="dropdown-item"
                                        data-toggle="collapse"
                                        data-target="#modal-sort, #shadow"
                                        aria-controls="modal-sort, shadow"
                                        aria-expanded="false"
                                        value='від дорогих до дешевих'
                                        onClick={(e) => this.click_sort_btn(e, "MAX_PRICE")}>
                                        від дорогих до дешевих
                                    </button>
                                    <button className="dropdown-item"
                                        data-toggle="collapse"
                                        data-target="#modal-sort, #shadow"
                                        aria-controls="modal-sort, shadow"
                                        aria-expanded="false"
                                        value='спочатку нові'
                                        onClick={(e) => this.click_sort_btn(e, "NEW")}>
                                        спочатку нові
                                    </button>
                                    <button className="dropdown-item"
                                        data-toggle="collapse"
                                        data-target="#modal-sort, #shadow"
                                        aria-controls="modal-sort, shadow"
                                        aria-expanded="false"
                                        value='спочатку старі'
                                        onClick={(e) => this.click_sort_btn(e, "OLDER")}>
                                        спочатку старі
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='shadow' className='shadow collapse'></div>
                </div>
                {products === 'undefined' ? '' : <h1>{category_now}</h1>}
                <div className='row justify-content-end container-filters' style={{ paddingRight: '12%', marginTop: '35px' }}>
                    <div className='col-lg-' style={{ marginRight: '15px' }}>
                        <div className='dropdown' >
                            <button className='btn sort-big dropdown-toggle not_selected' id='filter_brand'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_filter('filter_brand', 'brand')}>
                                Бренд
                            </button>
                            <div className='dropdown-menu' aria-labelledby="filter_brand">
                                {filter_brands.length > 0 && filter_brands.map((value, index) =>
                                    <button key={index} className="dropdown-item" aria-expanded="false"
                                        onClick={(e) => { this.choose_filter(e, 'brand') }}>
                                        {value}
                                    </button>)}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-' style={{ marginRight: '15px' }}>
                        <div className='dropdown' >
                            <button className='btn sort-big dropdown-toggle not_selected' id='filter_price'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_filter('filter_price', 'price')}>
                                Ціна
                            </button>
                            <div className='dropdown-menu price-filter' aria-labelledby="filter_price">
                                <span>Від </span><input type='text' id='min_price'></input>
                                <span>До </span><input type='text' id='max_price'></input>
                                <button onClick={() => this.choose_filter_price()}>Застосувати</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-' style={{ marginRight: '15px' }}>
                        <div className='dropdown' >
                            <button className='btn sort-big dropdown-toggle not_selected' id='filter_size'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_filter('filter_size', 'size')}>
                                Розмір
                            </button>
                            <div className='dropdown-menu' aria-labelledby="filter_size">
                                {filter_sizes.length > 0 && filter_sizes.map((value, index) =>
                                    <button key={index} className="dropdown-item" aria-expanded="false"
                                        onClick={(e) => { this.choose_filter(e, 'size') }}>
                                        {value}
                                    </button>)}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-' style={{ marginRight: '15px' }}>
                        <div className='dropdown' >
                            <button className='btn sort-big dropdown-toggle not_selected' id='filter_color'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                                onClick={() => this.click_filter('filter_color', 'color')}>
                                Колір
                            </button>
                            <div className='dropdown-menu' aria-labelledby="filter_color">
                                {filter_colors.length > 0 && filter_colors.map((value, index) =>
                                    <button key={index} className="dropdown-item" aria-expanded="false"
                                        onClick={(e) => { this.choose_filter(e, 'color') }}>
                                        {value}
                                    </button>)}
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-'>
                        <div className='dropdown' id='modal-sort-big'>
                            <button className='btn sort-big dropdown-toggle' id='sort_big'
                                type="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                {selected_sort_value === 'MIN_PRICE' && <span>Від дешевих</span>}
                                {selected_sort_value === 'MAX_PRICE' && <span>Від дорогих</span>}
                                {selected_sort_value === 'NEW' && <span>Спочатку нові</span>}
                                {selected_sort_value === 'OLDER' && <span>Спочатку старі</span>}
                                {selected_sort_value === null && <span>Сортування</span>}
                            </button>
                            <div className='dropdown-menu' aria-labelledby="sort_big">
                                <button className="dropdown-item"
                                    aria-expanded="false"
                                    value='від дешевих до дорогих'
                                    onClick={(e) => this.click_sort_btn(e, 'MIN_PRICE')}>
                                    Від дешевих до дорогих
                                </button>
                                <button className="dropdown-item"
                                    aria-expanded="false"
                                    value='від дорогих до дешевих'
                                    onClick={(e) => this.click_sort_btn(e, "MAX_PRICE")}>
                                    Від дорогих до дешевих
                                </button>
                                <button className="dropdown-item"
                                    aria-expanded="false"
                                    value='спочатку нові'
                                    onClick={(e) => this.click_sort_btn(e, "NEW")}>
                                    Спочатку нові
                                </button>
                                <button className="dropdown-item"
                                    aria-expanded="false"
                                    value='спочатку старі'
                                    onClick={(e) => this.click_sort_btn(e, "OLDER")}>
                                    Спочатку старі
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div id='div-filter' className='col-7 col-lg-2 filter'>
                        <div className='filter-navigation'>
                            <a className='filter-title_link' href='/catalog/search?category=shoes'>Взуття</a>
                            <span className='count-products-in-category'>{this.state.count_shoes}</span>
                            <button className="filter-title not_clicked"
                                data-toggle="collapse"
                                data-target="#category_shoes"
                                aria-controls="category_shoes"
                                aria-expanded="false"
                                onClick={(e) => this.category_click(e)}>
                            </button>
                        </div>
                        <div className="collapse filter-modal" id="category_shoes">
                            <a className="filter-modal_link" href="/catalog/search?category=sneakers">
                                Кросівки
                                <span className='count-products-in-category'>{this.state.count_sneakers}</span>
                            </a>
                            <a className="filter-modal_link" href="/catalog/search?category=slippers">
                                Тапочки
                                <span className='count-products-in-category'>{this.state.count_slippers}</span>
                            </a>
                            <a className="filter-modal_link" href="/catalog/search?category=kedi">
                                Кеди
                                <span className='count-products-in-category'>{this.state.count_kedi}</span>
                            </a>
                        </div>
                        <div className='filter-navigation'>
                            <a className='filter-title_link' href='/catalog/search?category=clothes'>Одяг</a>
                            <span className='count-products-in-category'>{this.state.count_clothes}</span>
                            <button className="filter-title not_clicked"
                                data-toggle="collapse"
                                data-target="#category_clothes"
                                aria-controls="category_clothes"
                                aria-expanded="false"
                                onClick={(e) => this.category_click(e)}>
                            </button>
                        </div>
                        <div className="collapse filter-modal" id="category_clothes">
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=t-shirts">
                                    Футболки, Поло
                                    <span className='count-products-in-category'>{this.state.count_t_shirts}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=outerwear">
                                    Верхній одяг
                                    <span className='count-products-in-category'>{this.state.count_outerwear}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=sweatshirts">
                                    Світшоти
                                    <span className='count-products-in-category'>{this.state.count_sweatshirts}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=vests">
                                    Жилетки
                                    <span className='count-products-in-category'>{this.state.count_vests}</span>
                                </a>}
                            {current_gender === 'woman' &&
                                <a className="filter-modal_link" href="/catalog/search?category=dresses">
                                    Сукні
                                    <span className='count-products-in-category'>{this.state.count_dresses}</span>
                                </a>}
                            <a className="filter-modal_link" href="/catalog/search?category=hoodie">
                                Худі
                                <span className='count-products-in-category'>{this.state.count_hoodie}</span>
                            </a>
                            {current_gender === 'woman' &&
                                <a className="filter-modal_link" href="/catalog/search?category=sweaters">
                                    Кофти | Светри
                                    <span className='count-products-in-category'>{this.state.count_sweaters}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=sweater">
                                    Кофти | Гольфи
                                    <span className='count-products-in-category'>{this.state.count_sweater}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=classic-trousers">
                                    Класичні Штани
                                    <span className='count-products-in-category'>{this.state.count_classic_trousers}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=sport-trousers">
                                    Спортивні Штани
                                    <span className='count-products-in-category'>{this.state.count_sport_trousers}</span>
                                </a>}
                            {current_gender === 'woman' &&
                                <a className="filter-modal_link" href="/catalog/search?category=trousers">
                                    Штани
                                    <span className='count-products-in-category'>{this.state.count_trousers}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=jeens">
                                    Джинси
                                    <span className='count-products-in-category'>{this.state.count_jeens}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=jogger">
                                    Карго, джогери, чиноси
                                    <span className='count-products-in-category'>{this.state.count_jogger}</span>
                                </a>}
                            <a className="filter-modal_link" href="/catalog/search?category=underwear">
                                Нижня білизна
                                <span className='count-products-in-category'>{this.state.count_underwear}</span>
                            </a>
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=sport-costumes">
                                    Спортивні костюми
                                    <span className='count-products-in-category'>{this.state.count_sport_costumes}</span>
                                </a>}
                            <a className="filter-modal_link" href="/catalog/search?category=costumes">
                                Костюми
                                <span className='count-products-in-category'>{this.state.count_costumes}</span>
                            </a>
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=kits">
                                    Комплекти
                                    <span className='count-products-in-category'>{this.state.count_kits}</span>
                                </a>}
                            <a className="filter-modal_link" href="/catalog/search?category=shirts">
                                Сорочки
                                <span className='count-products-in-category'>{this.state.count_shirts}</span>
                            </a>
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=shorts">
                                    Шорти
                                    <span className='count-products-in-category'>{this.state.count_shorts}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=jeens-shorts">
                                    Джинсові шорти
                                    <span className='count-products-in-category'>{this.state.count_jeens_shorts}</span>
                                </a>}
                        </div>
                        <div className='filter-navigation'>
                            <a className='filter-title_link' href='/catalog/search?category=bags-backpacks'>Рюкзаки | Сумки</a>
                            <span className='count-products-in-category'>{this.state.count_bags_backpacks}</span>
                            <button className="filter-title not_clicked"
                                data-toggle="collapse"
                                data-target="#category_bags-backpacks"
                                aria-controls="category_bags-backpacks"
                                aria-expanded="false"
                                onClick={(e) => this.category_click(e)}>
                            </button>
                        </div>
                        <div className="collapse filter-modal" id="category_bags-backpacks">
                            <a className="filter-modal_link" href="/catalog/search?category=sport-bags">
                                Спортивні сумки
                                <span className='count-products-in-category'>{this.state.count_sport_bags}</span>
                            </a>
                            <a className="filter-modal_link" href="/catalog/search?category=backpacks">
                                Рюкзаки
                                <span className='count-products-in-category'>{this.state.count_backpacks}</span>
                            </a>
                            <a className="filter-modal_link" href="/catalog/search?category=bags-on-the-shoulder">
                                Сумки через плече
                                <span className='count-products-in-category'>{this.state.count_bags_on_the_shoulder}</span>
                            </a>
                            {current_gender === 'woman' &&
                                <a className="filter-modal_link" href="/catalog/search?category=womens-bags">
                                    Жіночі сумки
                                    <span className='count-products-in-category'>{this.state.count_womens_bags}</span>
                                </a>}
                            <a className="filter-modal_link" href="/catalog/search?category=bananki">
                                Сумки на пояс
                                <span className='count-products-in-category'>{this.state.count_bananki}</span>
                            </a>
                        </div>
                        <div className='filter-navigation'>
                            <a className='filter-title_link' href='/catalog/search?category=accessories'>Аксесуари</a>
                            <span className='count-products-in-category'>{this.state.count_accessories}</span>
                            <button className="filter-title not_clicked"
                                data-toggle="collapse"
                                data-target="#category_accessories"
                                aria-controls="category_accessories"
                                aria-expanded="false"
                                onClick={(e) => this.category_click(e)}>
                            </button>
                        </div>
                        <div className="collapse filter-modal" id="category_accessories">
                            <a className="filter-modal_link" href="/catalog/search?category=socks">
                                Шкарпетки
                                <span className='count-products-in-category'>{this.state.count_socks}</span>
                            </a>
                            <a className="filter-modal_link" href="/catalog/search?category=belts">
                                Ремені
                                <span className='count-products-in-category'>{this.state.count_belts}</span>
                            </a>
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=wallets">
                                    Гаманці
                                    <span className='count-products-in-category'>{this.state.count_wallets}</span>
                                </a>}
                            {current_gender === 'man' &&
                                <a className="filter-modal_link" href="/catalog/search?category=panama">
                                    Панами
                                    <span className='count-products-in-category'>{this.state.count_panama}</span>
                                </a>}
                            <a className="filter-modal_link" href="/catalog/search?category=baseball-caps">
                                Кепки
                                <span className='count-products-in-category'>{this.state.count_baseball_caps}</span>
                            </a>
                            <a className="filter-modal_link" href="/catalog/search?category=watch">
                                Годинники
                                <span className='count-products-in-category'>{this.state.count_watch}</span>
                            </a>
                        </div>
                    </div>
                    <div id='div-products' className='container-products col- col-lg-10'>
                        <div className='row'>
                            {!!error ? <div className='no-products'><h3>{error}!</h3></div> : ''}
                            {products !== undefined && products.map((value, index) =>
                                <div key={index} className='col-6 col-md-3'>
                                    <Product product={value} />
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        products: state.products.products.products,
        productsCount: state.products.products.productsCount,
        categories: state.categories.categories,
        current_gender: state.current_gender.current_gender,
        filter_brands: state.products.products.filter_brands,
        filter_colors: state.products.products.filter_colors,
        filter_sizes: state.products.products.filter_sizes,
        filter_prices: state.products.products.filter_prices

    };
}
export default connect(mapStateToProps, { getProducts, getProductsByParams, getCategories })(ListProducts);