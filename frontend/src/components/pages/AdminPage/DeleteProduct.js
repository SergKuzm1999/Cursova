import React, { Component } from 'react';
import './AdminPage.css';
import { connect } from "react-redux";
import {deleteProduct} from '../../../actions/products';

class DeleteProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    deleteProduct=()=>{
        const id = document.getElementById('product_id').value;
        this.props.deleteProduct(id);
    }
    render() {
        return (
            <div className='delete-product'>
                 <div className='row' style={{width:'100%'}}>
                 <h3>Видалити продукт по ID:</h3>
                   <div className='col-lg-2 col-4'>
                       <input type='text' id='product_id'></input>
                   </div>
                   <div className='col-lg-10 col-8'>
                    <button onClick={this.deleteProduct}>Видалити</button>
                   </div>
                </div>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products.products
    };
}
export default connect(mapStateToProps, { deleteProduct })(DeleteProduct);