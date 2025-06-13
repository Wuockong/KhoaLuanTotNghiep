import axiosClient from './axiosClient';

export const getMatching = () => axiosClient.get('/matching');
export const postMatching = (data) => axiosClient.post('/matching', data);
