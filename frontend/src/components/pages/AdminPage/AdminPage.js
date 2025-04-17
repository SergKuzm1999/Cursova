import React, { Component } from 'react';
import './AdminPage.css';
import AddProductPage from './AddProductPage';
import GetAllOrders from './GetAllOrders';
import GetAllUsers from './GetAllUsers';
import DeleteProduct from './DeleteProduct';
import { connect } from "react-redux";
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
        const { user } = this.props.auth;
        if(user!=null){
            if(user.roles !== 'Admin'){
                window.location = '/notfound';
            }
        }
    }
    openPage(page_id){  
        if(page_id !== ''){
            var element = document.getElementsByClassName(page_id)[0];
            if(element.classList[1] === 'collapse') element.classList.replace('collapse','show');
            else element.classList.replace('show', 'collapse');
        }
    }
    render() {
        return (
            <div className='container admin-page'>
                <div className='row'>
                    <DeleteProduct/>
                </div>
                <div className='row panel'>
                    <div className='col-lg-4 col-sm-12'>
                        <button type='button' onClick={()=>this.openPage('sign')}>Add Product</button>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <button type='button' onClick={()=>this.openPage('view-all-orders')}>Get All Orders</button>
                    </div>
                    <div className='col-lg-4 col-sm-12'>
                        <button type='button' onClick={()=>this.openPage('view-all-users')}>Get All Users</button>
                    </div>
                </div>
                <AddProductPage/>
                <GetAllOrders/>
                <GetAllUsers/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    };
}
export default connect(mapStateToProps)(AdminPage);