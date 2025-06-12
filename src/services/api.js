import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_URL = `${BASE_URL}${ENDPOINT}`;

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchItems = async () => {
  try {
    const response = await api.get(ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar itens:', error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await api.post(ENDPOINT, item);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar item:', error);
    throw error;
  }
};