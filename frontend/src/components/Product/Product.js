import React, { Component } from 'react';
import './Product.css';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getDayOfYear(day) {
        let now = new Date();
        let start = new Date(now.getFullYear(), 0, day);
        let diff = now - start;
        let oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
    render() {
        console.log(this.props)
        const { product } = this.props;
        const currentDayOfYear = this.getDayOfYear(new Date().getDate());
        //if date from server format == d/m/y
        const dateOfProduct = product.date.split('.');
        const searchDayOfYear = this.getDayOfYear(dateOfProduct[0]);
        let sale_procent = 0;
        const newElement = searchDayOfYear - currentDayOfYear >= 0 && searchDayOfYear - currentDayOfYear <= 7 ? <div className='new-product'>NEW</div> : '';
        if(product.new_price != 0.00 ){
            sale_procent = 100 - (product.new_price * 100 / product.price);
            sale_procent = sale_procent.toString().split('.');
        }
        const saleElement = product.new_price != 0.00 ? <div className='sale-product'>-{sale_procent[0]}%</div> : '';
        let sizes = '';
        
        if (product.sizes && Array.isArray(product.sizes)) {
            sizes = product.sizes.map((value, index) => {
                let sizeString = value;
                if (index < product.sizes.length - 1) sizeString += ', ';
                return sizeString;
            }).join('');
        }
        return (
            
            <div className='product'>
                <div style={{ textAlign: 'center' }}>
                    <div className='image-box'>
                        {saleElement}
                        {newElement}
                        <a href={`/catalog/${product.gender}/${product.subcategory}/${product.brand}/p${product.id}`}>
                            {product.images.length > 0 && <img src={product.images[0]}
                                className='first-image'
                                alt='product-img-first' />}
                            {product.images.length > 1 && <img src={product.images[1]}
                                className='second-image'
                                alt='product-img-second' />}
                        </a>
                    </div>
                    <div className='description'>
                        <div className='product-name'>
                            <a href={`/catalog/${product.gender}/${product.subcategory}/${product.brand}/p${product.id}`}>
                                {product.name}
                            </a>
                        </div>
                        {product.new_price == 0 ? <div className='price'>{product.price} грн</div> :
                        <section>
                        <div className='sale-price'>{product.new_price} грн</div>
                        <div className='old-price'>{product.price} грн</div>
                        </section>
                    }
                        <div className='size'>
                            <span>{sizes}</span>
                        </div>
                    </div>
                </div>
            </div >

        );
    }
}

export default Product