import React, { Component } from 'react';
import './UserOrders.css';
import { getUserOrders, GetOrdersUserCount } from '../../../../actions/orders';
import { connect } from "react-redux";
import Discounts from '../../Discounts/Discounts';

class UserOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paginationScrollValue: 1,
            userId: {},
            countOrders: 0,
            err: {
            },
        };
    }

    componentDidMount() {

        window.addEventListener('scroll', this.scrollPagination);

        const userId = this.props.auth.user.id;
        this.setState({ userId: userId });
        this.props.getUserOrders(userId, 1)
            .then(
                () => { },
                (err) => { console.log("Error get data ", err); }
            );
        this.props.GetOrdersUserCount(userId)
            .then(
                () => { this.setState({ countOrders: this.props.count_orders }); },
                (err) => { console.log("Error get data ", err); }
            );


    }
    scrollPagination = () => {
        const { userId, paginationScrollValue, countOrders } = this.state;
        let elements = document.getElementsByClassName('order-info');
        if (elements.length < countOrders) {
            if (elements[elements.length - 1]
                .getBoundingClientRect().top < 700) {
                this.setState({ paginationScrollValue: this.state.paginationScrollValue + 1 });
                this.props.getUserOrders(userId, paginationScrollValue)
                    .then(
                        () => { },
                        (err) => { console.log("Error get data ", err); }
                    );
            }
        }
    }
    render() {
        const { orders } = this.props;
        return (
            <div className='container user-orders'>
                {orders.length > 0 && <h1 className='text-center'>МОЇ ЗАМОВЛЕННЯ</h1>}
                {orders.length > 0 ? orders.map((value, index) =>
                    <div className='order-info' key={index}>
                        <div className='row info'>
                            <div className='col col-6 col-md-5 col-lg-4 col-xl-3'>
                                <h4><b>Замовлення №{value.id}</b></h4>
                            </div>
                            <div className='col col-6 col-md-5 col-lg-4 col-xl-3'>
                                <h4>Дата: {value.date.split('T')[0] + ' ' + value.date.split('T')[1].split('.')[0]}</h4>
                            </div>

                        </div>
                        {value.ordersProducts.length > 0 && value.ordersProducts.map((v, i) =>
                            <div className='row order-content' key={i}>
                                <div className='col col-6 col-lg-3'>
                                    <img src={v.product.images[0].path} alt='product-img' />
                                </div>
                                <div className='col col-6 col-lg-9'>
                                    <div className='row'>
                                        <div className='col'>
                                            <span className='name' >{v.product.name}</span>
                                            {v.size !== '' && <span className='size'>Розмір: {v.size}</span>}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            {v.product.newPrice === 0 ? <span className='price'>{v.product.price} UAH</span> : 
                                            <span className='price'>{v.product.newPrice} UAH</span>}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <strong className='count'>X {v.count}</strong>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                        {v.product.newPrice === 0 ? <span className='full-price'>{v.product.price * v.count} UAH</span> : 
                                            <span className='full-price'>{v.product.newPrice * v.count} UAH</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='row info'>
                            <div className='col col-6 col-md-5 col-lg-4 col-xl-3'>
                                <h4 className='full-price'>Вартість: {value.fullPrice} UAH</h4>
                            </div>
                            <div className='col col-6 col-md-5 col-lg-4 col-xl-3'>
                                <h4 className='status'>Статус: <b>{value.status}</b></h4>
                            </div>
                        </div>
                    </div>
                ) :
                    <div className='empty-orders'>
                        <div style={{marginBottom:'75px'}} >
                            <h2>Замовлень немає</h2>
                            <a href='/catalog/search?'>Перейдіть у католог та виберіть товар.</a>
                        </div>
                       
                        <Discounts/>
                    </div>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        orders: state.orders.orders,
        count_orders: state.orders.count_orders,

    };
}
export default connect(mapStateToProps, { getUserOrders, GetOrdersUserCount })(UserOrders);