import { apiPublic, apiPrivate } from './axiosConfig';

export const loginRun = (data) => apiPublic.post('/login/', data);
export const registerRun = (data) => apiPublic.post('/register/', data);

export const checkLogin = () => apiPrivate.get('/user/');
export const logoutRun = (data) => apiPrivate.post('/logout/', data);