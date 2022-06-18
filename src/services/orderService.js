import httpService from "./httpService";

export function sendOrder(data){
    return httpService.post(`${process.env.REACT_APP_URL}/orders/new`, data);
}

export function updateOrder(customer, order, data){
    return httpService.put(`${process.env.REACT_APP_URL}/orders/update/${customer}/${order}`, { status: data});
}

export default {
    send: sendOrder,
    update: updateOrder
}