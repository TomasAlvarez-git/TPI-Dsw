import { useEffect, useState } from 'react';
import { getPublicProducts } from '../../products/services/list';
import Card from '../../shared/components/Card';
import Button from '../../shared/components/Button';
import { useCart } from '../../orders/context/CartContext';
import { useSearchParams } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});

  const { addToCart } = useCart();

  // 🔍 1) Leer parámetro ?search=
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";

  // useEffect(() => {
  //   async function loadData() {
  //     try {
  //       const { data } = await getPublicProducts();
  //       setProducts(data || []);
  //     } catch (error) {
  //       console.error("Error cargando productos:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   loadData();
  // }, []);

  useEffect(() => {
  async function loadData() {
    try {
      const { data } = await getPublicProducts();
      setProducts(data || []); // <- ahora SIEMPRE es un array
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  }
  loadData();
}, []);


  // 🔎 2) Filtrado de productos según búsqueda
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  const handleQuantityChange = (sku, delta) => {
    setQuantities(prev => {
      const current = prev[sku] || 0;
      const newValue = Math.max(0, current + delta);
      return { ...prev, [sku]: newValue };
    });
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product.sku] || 0;

    if (qty > 0) {
      addToCart(product, qty);
      setQuantities(prev => ({ ...prev, [product.sku]: 0 }));
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-xl text-gray-500">Cargando productos...</div>;

  return (
    <div>
      {/* Grid Responsiva */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {/* 🔍 3) Usamos filteredProducts en lugar de products */}
        {filteredProducts.map((product) => {
          const quantity = quantities[product.sku] || 0;

          return (
            <Card 
              key={product.sku}
              className="shadow-sm border-gray-100 hover:shadow-md transition flex flex-col"
            >

              <div className="bg-gray-200 aspect-square rounded-lg mb-4 flex items-center justify-center text-gray-400">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>

              <h3 className="font-medium text-gray-900 text-lg truncate mb-2" title={product.name}>
                {product.name}
              </h3>

              <div className="flex items-center justify-between mt-auto">
                
                <span className="text-lg font-bold text-gray-900">
                  ${product.currentPrice || product.currentUnitPrice}
                </span>

                <div className="flex items-center gap-3">

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

                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={quantity === 0}
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
