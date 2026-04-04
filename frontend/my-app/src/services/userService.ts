import api from './api';

export const getUsers = async () => {
  const response = await api.get('/User/usuarios');

  return response;
};