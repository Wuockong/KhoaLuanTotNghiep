import axiosClient from './axiosClient';

export const submitSurvey = (data) => axiosClient.post('/survey/submit', data);
