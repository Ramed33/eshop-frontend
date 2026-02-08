import { apiPublic } from './axiosConfig';

export const fetchProducts = () => apiPublic.get('/products/');
