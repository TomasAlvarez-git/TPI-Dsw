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

export const getAuthProducts = async (searchTerm = '', status = 'all', page = 1, pageSize = 10) => {
  try {
    const params = new URLSearchParams();

    params.append('page', page);
    params.append('pageSize', pageSize);

    if (searchTerm) params.append('searchTerm', searchTerm);

    if (status && status !== 'all') params.append('status', status);

    const response = await instance.get(`/api/products/admin?${params.toString()}`);

    // DEBUG
    console.log('Datos recibidos:', response.data);

    let rawList = [];
    let totalCount = 0;

    // --- CORRECCIÓN AQUÍ ---
    // Tu backend devuelve: { productItems: [...], total: 24 }
    if (response.data && Array.isArray(response.data.productItems)) {
      rawList = response.data.productItems;
      totalCount = response.data.total || 0;
    }
    // Fallbacks por si la estructura cambia en el futuro
    else if (Array.isArray(response.data)) {
      rawList = response.data;
      totalCount = response.data.length;
    } else if (response.data && Array.isArray(response.data.items)) {
      rawList = response.data.items;
      totalCount = response.data.totalCount || 0;
    }

    // NORMALIZACIÓN (Blindaje contra Mayúsculas/Minúsculas)
    const normalizedList = rawList.map(item => ({
      // IDs
      id: item.id || item.Id,
      sku: item.sku || item.Sku,

      // Textos
      name: item.name || item.Name,
      description: item.description || item.Description,

      // Valores numéricos
      currentUnitPrice: item.currentUnitPrice || item.CurrentUnitPrice || item.Price || 0,
      stockQuantity: item.stockQuantity || item.StockQuantity || item.Stock || 0,

      // Booleano
      isActive: item.isActive !== undefined ? item.isActive : (item.IsActive !== undefined ? item.IsActive : false),
    }));

    return {
      data: normalizedList,
      total: totalCount,
      error: null,
    };

  } catch (error) {
    console.error('Error cargando productos admin:', error);

    return {
      data: [],
      total: 0,
      error,
    };
  }
};