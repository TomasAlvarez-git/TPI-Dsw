import { useEffect, useState } from 'react';
import { getPublicProducts } from '../../products/services/list';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { useCart } from '../../orders/context/CartContext'; // <--- 1. Importar el Contexto

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); // Estado local para los contadores de las tarjetas

  const { addToCart } = useCart(); // <--- 2. Usar el Hook del carrito

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getPublicProducts();
        setProducts(data || []);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Maneja el cambio visual del número en la tarjeta (+ / -)
  const handleQuantityChange = (sku, delta) => {
    setQuantities(prev => {
      const current = prev[sku] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [sku]: newValue };
    });
  };

  // <--- 3. Función para agregar al carrito real
  const handleAddToCart = (product) => {
    const qty = quantities[product.sku] || 0;
    
    if (qty > 0) {
      addToCart(product, qty); // Guardar en el estado global
      
      // Opcional: Reiniciar el contador de la tarjeta a 0 para dar feedback visual de que "ya se envió"
      setQuantities(prev => ({ ...prev, [product.sku]: 0 }));
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl text-gray-500">Cargando productos...</div>;

  return (
    <div>
      {/* Grid Responsiva */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const quantity = quantities[product.sku] || 0;

          return (
            <Card 
              key={product.sku}
              className="shadow-sm border-gray-100 hover:shadow-md transition flex flex-col"
            >
              {/* Imagen Placeholder */}
              <div className="bg-gray-200 aspect-square rounded-lg mb-4 flex items-center justify-center text-gray-400">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>

              {/* Nombre */}
              <h3 className="font-medium text-gray-900 text-lg truncate mb-2" title={product.name}>
                {product.name}
              </h3>

              {/* Precio + Contador + Agregar */}
              <div className="flex items-center justify-between mt-auto">
                
                <span className="text-lg font-bold text-gray-900">
                  ${product.currentPrice || product.currentUnitPrice}
                </span>

                <div className="flex items-center gap-3">

                  {/* Contador */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(product.sku, -1)}
                      className="text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none"
                    >
                      −
                    </button>

                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-sm min-w-[24px] text-center border border-gray-200">
                      {quantity}
                    </span>

                    <button
                      onClick={() => handleQuantityChange(product.sku, 1)}
                      className="text-gray-400 hover:text-gray-600 text-xl font-bold focus:outline-none"
                    >
                      +
                    </button>
                  </div>

                  {/* Botón Agregar (Ahora conectado) */}
                  <Button
                    onClick={() => handleAddToCart(product)} // <--- 4. Usar la nueva función
                    disabled={quantity === 0} // Deshabilitar si es 0 para evitar clicks vacíos
                    className={`border-none text-sm py-1.5 px-4 rounded-md font-medium transition ${
                      quantity > 0 
                        ? "bg-purple-100 text-purple-600 hover:bg-purple-200 cursor-pointer" 
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Agregar
                  </Button>

                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;