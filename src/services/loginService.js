import httpService from './httpService';

export function loginService(data){
    return httpService.post(`${process.env.REACT_APP_URL}/login`, data);
}

export function getCurrentUser(customer){
    return httpService.get(`${process.env.REACT_APP_URL}/users/${customer}`);
}

export default {
    login: loginService,
    getCurrentUser: getCurrentUser
}