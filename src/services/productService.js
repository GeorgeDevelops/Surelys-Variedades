import httpService from './httpService';

export function getProduct(id){
    return httpService.get(`${process.env.REACT_APP_URL}/products/${id}`);
}

export function getProducts(){
    return httpService.get(`${process.env.REACT_APP_URL}/products`);
}

export function postProduct(data, options){
    return httpService.post(`${process.env.REACT_APP_URL}/products/new`, data, options);
}

export function deleteProduct(id){
    return httpService.delete(`${process.env.REACT_APP_URL}/products/delete/${id}`);
}

export default {
    getProduct: getProduct,
    getProducts: getProducts,
    postProduct: postProduct,
    deletePost: deleteProduct
}