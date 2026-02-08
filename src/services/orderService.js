import { apiPrivate } from './axiosConfig';

export const createOrder = () => apiPrivate.post('/create-order/');
export const orderIdItems = (id) => apiPrivate.get(`/order-items/${id}/`);
export const ordersByUser = () => apiPrivate.get('/orders/');