import { apiPrivate } from './axiosConfig';

export const createPost = (postData) => apiPrivate.post('/posts/', postData);
export const fetchCart = () => apiPrivate.get('/cart/');
export const actualizeCart = () => apiPrivate.get('/cart/');
export const attachCart = (id, data) => apiPrivate.post(`/add-cart/${id}/`, data);
export const incDecCart = (id, data) => apiPrivate.post(`/add-cart/${id}/`, data);
export const eraseCart = (id) => apiPrivate.delete(`/delete-cart/${id}/`);
