import React, { Component } from 'react';
import { getOrders } from '../../../actions/orders';
import { getProductById } from '../../../actions/products';
import { GetUserInfoById } from '../../../actions/users';
import { connect } from "react-redux";
import axios from 'axios';
import classnames from 'classnames';

class GetAllOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: ''
        };
    }
    componentDidMount() {
        this.props.getOrders()
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            )
    }
    clickOrderInfo = (e) => {
        document.getElementById('detail-order').className = '';
        const target = e.currentTarget;
        const userId = target.querySelector('#userId').innerHTML;
        const orderId = target.querySelector('#id').innerHTML;
        this.props.GetUserInfoById(userId)
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            );
        this.setState({ selectedOrder: this.props.orders.find(x => x.id == orderId) });
    }
    closeOrderInfo() {
        document.getElementById('detail-order').className = 'collapse';
    }
    setStatusOrder=()=>{
        axios.put('api/orders/setstatus/' + this.state.selectedOrder.id);
        window.location.reload();
    }
    render() {
        const { orders } = this.props;
        const clientInfo = this.props.users;
        const { selectedOrder } = this.state;
        return (
            <div className='view-all-orders collapse'>
                <h1>ЗАМОВЛЕННЯ</h1>
                <div className='row text-center'>
                    <div className='col-lg-1 col-2'>
                        № ЗАМОВЛЕННЯ
                    </div>
                    <div className='col-lg-5 col-5'>
                        ID КЛІЄНТА
                    </div>
                    <div className='col-lg-3 col-3'>
                        ДАТА
                    </div>
                    <div className='col-lg-3 col-2'>
                        ЦІНА
                    </div>
                </div>
                {orders.map((value,id) =>
                    <div key={id} className={classnames('row order',{'accepted':value.status==='Прийнято'})} onClick={(e) => this.clickOrderInfo(e)}>
                        <div id='id' className='col-lg-1 col-2'>
                            {value.id}
                        </div>
                        <div id='userId' className='col-lg-5 col-5'>
                            {value.userId}
                        </div>
                        <div id='date' className='col-lg-3 col-3'>
                            {new Date(value.date).getHours() + ':' + new Date(value.date).getMinutes() + ' - ' +
                                new Date(value.date).getDate() + '.0' + new Date(value.date).getMonth() +
                                '.' + new Date(value.date).getFullYear()}
                        </div>
                        <div id='fullPrice' className='col-lg-3 col-2'>
                            {value.fullPrice} грн.
                            </div>
                    </div>
                )}
                <div  id='detail-order' className='collapse'>
                    <div className='info-order'>
                        <h4 className='text-center'>ІНФОРМАЦІЯ ПРО ЗАМОВЛЕННЯ</h4>
                        <div className='row'>
                            <div className='col'>
                                <h5>Інформація про клієнта </h5>
                                <p>ПІБ : {clientInfo.lastName + ' ' + clientInfo.firstName}</p>
                                <p>Номер телефону : {clientInfo.phoneNumber}</p>
                                <p>Email : {clientInfo.email}</p>
                                <p>Адреса : {clientInfo.region + ', ' + clientInfo.city}</p>
                                <p>Відділення Нової Пошти :{clientInfo.numberDelivery} </p>
                            </div>
                        </div>
                        {selectedOrder !== '' && selectedOrder !== undefined ?
                            selectedOrder.ordersProducts.map((value,index) => 
                                <div className='row' key={index}>
                                    <div className='col'>
                                        <h5>Інформація про замовлений товар <b>№{index + 1}</b> </h5>
                                        <p>Product Id : {value.product.id}</p>
                                        <p>Назва : {value.product.name}</p>
                                        <p>Кількість : {value.count}</p>
                                        <p>Розмір : {value.size}</p>
                                        <p>Розмірні дані : {value.sizeInfo}</p>
                                        <p>Ціна : {value.product.newPrice !== 0 ?
                                            value.product.newPrice :
                                            value.product.price}грн</p>
                                        <p>Постачальник : {value.product.linkDropShipping}</p>
                                        <p>Постачальник : {value.product.article}</p>
                                    </div>
                                </div>
                            ) : ''}
                        <div className='row'>
                            <div className='col'>
                                <button className='btn' onClick={this.setStatusOrder}>Принято</button>
                                <button className='btn' onClick={this.closeOrderInfo}>Переглянуто</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        products: state.products.products,
        users: state.users.users
    };
}

export default connect(mapStateToProps, { getOrders, getProductById, GetUserInfoById })(GetAllOrders);
