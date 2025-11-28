import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import { getAuthProducts } from '../services/list';

const productStatus = {
  ALL: 'all',
  ENABLED: 'enabled',
  DISABLED: 'disabled',
};

function ListProductsPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState(productStatus.ALL);
  const [pageNumber, setPageNumber] = useState(1);

  // CORRECCIÓN AQUÍ: Quitamos 'setPageSize' porque no se usa en el HTML actual
  const [pageSize] = useState(10);

  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, total, error } = await getAuthProducts(searchTerm, status, pageNumber, pageSize);

      if (error) throw error;

      setTotal(total);
      setProducts(data || []);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, status, pageNumber, pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const totalPages = Math.ceil(total / pageSize) || 1;

  const handleSearch = async () => {
    setPageNumber(1);
    await fetchProducts();
  };

  return (
    <div>
      <Card>
        {/* HEADER */}
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-2xl font-bold text-gray-800'>Productos</h1>
          <Button
            className='bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold px-4 py-2 rounded-lg'
            onClick={() => navigate('/admin/products/create')}
          >
            Crear Producto
          </Button>
        </div>

        {/* FILTROS */}
        <div className='flex flex-col sm:flex-row gap-4 mb-2'>
          <div className='flex items-center gap-2 flex-1'>
            <input
              value={searchTerm}
              onChange={(evt) => setSearchTerm(evt.target.value)}
              type="text"
              placeholder='Buscar'
              className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200'
            />
            <Button className='h-10 w-10 flex items-center justify-center bg-purple-100 rounded-lg' onClick={handleSearch}>
              <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </Button>
          </div>

          <select
            value={status}
            onChange={evt => {
              setStatus(evt.target.value);
              setPageNumber(1);
            }}
            className='border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 bg-white'
          >
            <option value={productStatus.ALL}>Estado de Producto</option>
            <option value={productStatus.ENABLED}>Habilitados</option>
            <option value={productStatus.DISABLED}>Inhabilitados</option>
          </select>
        </div>
      </Card>

      {/* LISTADO */}
      <div className='mt-4 flex flex-col gap-3'>
        {loading ? (
          <div className="text-center py-4 text-gray-500">Cargando productos...</div>
        ) : (Array.isArray(products) && products.length > 0) ? (
          products.map(product => (
            <Card key={product.id || product.sku} className="flex justify-between items-center p-4">
              <div>
                <h3 className='text-lg font-bold text-gray-800'>
                  {product.sku} - {product.name}
                </h3>
                <p className='text-sm text-gray-500 mt-1'>
                    Stock: {product.stockQuantity} - {product.isActive ? 'Habilitado' : 'Inhabilitado'}
                </p>
              </div>
              <button
                className='bg-purple-100 text-purple-700 hover:bg-purple-200 font-semibold text-sm px-6 py-2 rounded-lg transition-colors'
              >
                Ver
              </button>
            </Card>
          ))
        ) : (
          <div className="text-center py-4 text-gray-500">No se encontraron productos.</div>
        )}
      </div>

      {/* PAGINACIÓN CENTRADA */}
      <div className='flex justify-center items-center mt-6 gap-4 text-sm text-gray-600'>
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(p => p - 1)}
          className='hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          <span className={'w-8 h-8 flex items-center justify-center rounded-lg bg-gray-900 text-white font-bold'}>
            {pageNumber}
          </span>
          {pageNumber < totalPages && (
            <span className="w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200 rounded-lg" onClick={() => setPageNumber(pageNumber + 1)}>
              {pageNumber + 1}
            </span>
          )}
          {pageNumber + 1 < totalPages && <span className="flex items-end pb-2">...</span>}
        </div>

        <button
          disabled={pageNumber >= totalPages}
          onClick={() => setPageNumber(p => p + 1)}
          className='hover:text-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center'
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default ListProductsPage;