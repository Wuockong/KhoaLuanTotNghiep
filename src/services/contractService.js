import axiosClient from './axiosClient';

export const getContracts = () => axiosClient.get('/contract');

export const fillContract = (contractId, data) =>
  axiosClient.put(`/contract/${contractId}/fill`, data);
