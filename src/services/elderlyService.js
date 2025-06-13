import axiosClient from './axiosClient';

export const getElderly = () => axiosClient.get('/elderly');
