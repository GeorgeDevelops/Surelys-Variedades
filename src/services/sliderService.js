import httpService from './httpService';

export function getSliderContent(){
    return httpService.get(`${process.env.REACT_APP_URL}/slider/get/images`);
}

export function postSliderImage(data, options){
    return httpService.post(`${process.env.REACT_APP_URL}/slider/post/image`, data, options);
}

export function deleteSliderImage(id){
    return httpService.delete(`${process.env.REACT_APP_URL}/slider/delete/image/${id}`);
}

export default {
    getSliderContent: getSliderContent,
    postSliderImage: postSliderImage,
    deleteSliderImage: deleteSliderImage
}