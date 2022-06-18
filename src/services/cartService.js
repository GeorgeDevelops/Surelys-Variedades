import httpService from './httpService';
import { jwtDecoded } from './jwtDecode';
const token = localStorage.getItem('token');
const customer = jwtDecoded(token);

export function addToCart(product){
    return httpService.put(`${process.env.REACT_APP_URL}/cart/new/${customer._id}`, product);
}

export function getCart(){
    if(token){
        return httpService.get(`${process.env.REACT_APP_URL}/cart/${customer._id}`);
    }
}

export function deleteItem(item){
    return httpService.delete(`${process.env.REACT_APP_URL}/cart/delete/${customer._id}/${item}`);
}

export default {
    add: addToCart,
    get: getCart,
    delete: deleteItem
}