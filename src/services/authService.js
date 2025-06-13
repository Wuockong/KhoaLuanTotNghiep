import axiosClient from './axiosClient';

export const login = (data) => axiosClient.post('/users/login', data);
