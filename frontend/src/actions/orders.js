import axios from 'axios';
import { NEW_ORDER, GET_ORDERS } from './types';

var listOrders = [];
var countOrders = 0;

export function setOrders(orders, countOrders) {
    return {
        type: GET_ORDERS,
        orders: orders,
        count_orders: countOrders
    }
}

export function addOrder(data) {
    return {
        type: NEW_ORDER,
        orders: data
    }
}

export function getOrders() {
    return dispatch => {
        return axios.get('api/orders/All')
            .then(res => {
                dispatch(setOrders(res.data, 0));
            })
    }
}

export function GetOrdersUserCount(userid) {
    return dispatch => {
        return axios.get('api/orders/GetOrdersUserCount/' + userid)
            .then(res => {
                countOrders = res.data;
                dispatch(setOrders(listOrders, res.data));
            })
    }
}

export function getUserOrders(userId, pagination) {
    return dispatch => {
        return axios.get('api/orders/GetUserOrders/' + userId + '/' + pagination)
            .then(res => {
                listOrders = res.data;
                dispatch(setOrders(res.data, countOrders));
            })
    }
}

export function newOrder(orders) {
    return dispatch => {
        return axios.post('/Orders/NewOrder', orders)
            .then(res => {
                dispatch(addOrder(res.data));
            })
    }
}
