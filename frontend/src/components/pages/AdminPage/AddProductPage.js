import React, { Component } from 'react';
import './AdminPage.css';
import { Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import { connect } from "react-redux";
import { newProduct } from '../../../actions/products';
import { setAlert } from '../../../helpers/setAlert';
import axios from 'axios';


class AddProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            sizes: '',
            color: '',
            gender: 'man',
            linkDropShipping: '',
            price: 110,
            newPrice: 0,
            subcategoryUAName: '',
            brandName: '',
            article: '',
            base64: [],
            errors: {}
        };
    }
    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    }
    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    }
    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        if (this.state.name === '') errors.name = "Прізвище повинно бути від 1 до 32 символів!";
        if (this.state.description === '') errors.description = "Ім'я повинне бути від 1 до 32 символів!";
        if (this.state.color === '') errors.color = "Пароль повинен бути від 4 до 20 символів!";
        if (this.state.gender === '') errors.gender = "Виберіть область!";
        if (this.state.price === 0) errors.price = "Виберіть місто!";
        if (this.state.subcategoryUAName === 0) errors.subcategoryUAName = "Виберіть відділення Нової почти!";
        if (this.state.brandName === 0) errors.brandName = "Виберіть відділення Нової почти!";
        if (this.state.imagesPath === '') errors.imagesPath = "Виберіть відділення Нової почти!";
        if (this.state.linkDropShipping === '') errors.linkDropShipping = 'Посилання на дроп групу';
        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            const { name, description, sizes, color, article, gender, price, newPrice, subcategoryUAName, brandName, base64, linkDropShipping } = this.state;
            this.setState({ isLoading: true });
            this.props.newProduct({
                name, description, sizes, color, gender, price, newPrice, subcategoryUAName,
                brandName, base64, linkDropShipping, article
            })
                .then(
                    () => { setAlert({ message: 'Товар додано!!', type: 'success' }); },
                    (err) => {
                        try {
                            this.setState({ errors: err.response.data });
                            setAlert({ message: err.response.data, type: 'danger' });
                        }
                        catch (mess) { }
                    }
                );
        }
        else {
            this.setState({ errors });
        }

    }

    imgSelect = () => {
        const files = document.getElementById('file').files;
        let base64 = [];
        for (let i = 0; i < files.length; i++) {
            let reader = new FileReader();
            reader.readAsDataURL(files[i]);
            reader.onload = () => base64.push(reader.result);
        }
        this.setState({ base64: base64 });
    }
    onCropChange = (crop) => {
        this.setState({ crop: crop })
    }
    onCropComplete = (croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }
    onZoomChange = (zoom) => {
        this.setState({ zoom: zoom })
    }
    getSubCategories = () => {
        let { gender } = this.state;
        const element = document.getElementById('subcategoryUAName');
        var option = document.createElement('option');
        if (element.childElementCount === 1) {
        axios.get('/api/categories/GetSubcategories_By_Gender/' + gender)
            .then(res => {
                res.data.map((value) => {
                    option = document.createElement('option');
                    option.value = value;
                    option.innerHTML = value;
                    element.appendChild(option);
                });
            });
        }
    }
    getBrands() {
        let element = document.getElementById('brandName');
        var option = document.createElement('option');
        if (element.childElementCount === 1) {
            axios.get('/api/brands/GetBrands')
                .then(res => {
                    res.data.map((value) => {
                        option = document.createElement('option');
                        option.value = value.name;
                        option.innerHTML = value.name;
                        element.appendChild(option);
                    });
                });
        }
    }
    render() {
        const { errors } = this.state;
        var form = (
            <div className='sign collapse'>
                <Row>
                    <Col md={8} lg={6}>
                        <div className='signup box'>
                            <form onSubmit={this.onSubmitForm}>
                                <h3>НОВИЙ ПРОДУКТ</h3>
                                <div className={classnames('form-group', { 'error': !!errors.name })}>
                                    <label>name</label>
                                    <input type="text" className="form-control"
                                        id="name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange} />
                                    {!!errors.name ? <span className="help-block">{errors.name}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.description })}>
                                    <label>description</label>
                                    <textarea type="text" className="form-control"
                                        id="description"
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChange} />
                                    {!!errors.description ? <span className="help-block">{errors.description}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.sizes })}>
                                    <label >size</label>
                                    <input type="text" className="form-control"
                                        id="sizes"
                                        name="sizes"
                                        value={this.state.sizes}
                                        onChange={this.handleChange} />
                                    {!!errors.sizes ? <span className="help-block">{errors.sizes}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.color })}>
                                    <label >color</label>
                                    <input type="text" className="form-control"
                                        id="color"
                                        name="color"
                                        value={this.state.color}
                                        onChange={this.handleChange} />
                                    {!!errors.color ? <span className="help-block">{errors.color}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.gender })}>
                                    <label>gender</label>
                                    <select className="form-control"
                                        id="gender"
                                        name="gender"
                                        value={this.state.gender}
                                        onChange={this.handleChange} >
                                        <option>man</option>
                                        <option>woman</option>
                                        <option>all</option>
                                    </select>
                                    {!!errors.gender ? <span className="help-block">{errors.gender}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.price })}>
                                    <label>price</label>
                                    <input type="text" className="form-control"
                                        id="price"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.handleChange} />
                                    {!!errors.price ? <span className="help-block">{errors.price}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.newPrice })}>
                                    <label>newPrice</label>
                                    <input type="text" className="form-control"
                                        id="newPrice"
                                        name="newPrice"
                                        value={this.state.newPrice}
                                        onChange={this.handleChange} />
                                    {!!errors.newPrice ? <span className="help-block">{errors.newPrice}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.subcategoryUAName })}>
                                    <label>subcategoryUAName</label>
                                    <select className="form-control"
                                        onClick={() => { this.getSubCategories() }}
                                        id="subcategoryUAName"
                                        name="subcategoryUAName"
                                        value={this.state.subcategoryUAName}
                                        onChange={this.handleChange} >
                                            <option>Виберіть категорію</option>
                                    </select>
                                    {!!errors.subcategoryUAName ? <span className="help-block">{errors.subcategoryUAName}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.brandName })}>
                                    <label>brandName</label>
                                    <select className="form-control"
                                        onClick={() => { this.getBrands() }}
                                        id="brandName"
                                        name="brandName"
                                        value={this.state.brandName}
                                        onChange={this.handleChange} >
                                            <option>Виберіть бренд</option>
                                    </select>
                                    {!!errors.brandName ? <span className="help-block">{errors.brandName}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.linkDropShipping })}>
                                    <label>linkDropShipping</label>
                                    <input type="text" className="form-control"
                                        id="linkDropShipping"
                                        name="linkDropShipping"
                                        value={this.state.linkDropShipping}
                                        onChange={this.handleChange} />
                                    {!!errors.linkDropShipping ? <span className="help-block">{errors.linkDropShipping}</span> : ''}
                                </div>
                                <div className={classnames('form-group', { 'error': !!errors.article })}>
                                    <label>article</label>
                                    <input type="text" className="form-control"
                                        id="article"
                                        name="article"
                                        value={this.state.article}
                                        onChange={this.handleChange} />
                                    {!!errors.article ? <span className="help-block">{errors.article}</span> : ''}
                                </div>
                                <input type='file' id="file" name="file" accept=".jpg, .jpeg, .png" onChange={this.imgSelect} multiple />
                                <button type="submit" className="btn btn-dark" >ДОДАТИ</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </div>
        );

        return (
            <div>
                {form}
            </div>
        );
    }
}
export default connect(null, { newProduct })(AddProductPage)