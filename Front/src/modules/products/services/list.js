import { instance } from '../../shared/api/axiosInstance';

export const getProducts = async (search = null, status = null, pageNumber = 1, pageSize = 20 ) => {
  const queryString = new URLSearchParams({
    search,
    status,
    pageNumber,
    pageSize,
  });

  const response = await instance.get(`api/products/admin?${queryString}`);

  return { data: response.data, error: null };
};

export const getPublicProducts = async () => {
  // Llamamos al endpoint público (sin /admin)
const response = await instance.get('api/products');

  // El backend devuelve un array directo en este endpoint, no un objeto paginado
return { data: response.data, error: null };
};