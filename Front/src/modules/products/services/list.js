// import { instance } from '../../shared/api/axiosInstance';

// export const getPublicProducts = async () => {
//   try {
//     const response = await instance.get("api/products");

//     // El backend devuelve un ARRAY directo, así que nos aseguramos de enviarlo como tal
//     const list = Array.isArray(response.data) ? response.data : [];

//     return {
//       data: list,
//       error: null,
//     };

//   } catch (error) {
//     console.error("Error cargando productos públicos:", error);

//     return {
//       data: [],
//       error,
//     };
//   }
// };

import { instance } from '../../shared/api/axiosInstance';

export const getPublicProducts = async () => {
  try {
    const response = await instance.get('api/products');

    // El backend devuelve un ARRAY directo
    const list = Array.isArray(response.data) ? response.data : [];

    return {
      data: list,
      error: null,
    };

  } catch (error) {
    console.error('Error cargando productos públicos:', error);

    return {
      data: [],
      error,
    };
  }
};
