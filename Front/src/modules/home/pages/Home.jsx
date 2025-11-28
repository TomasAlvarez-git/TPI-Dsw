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
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase() || '';

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await getPublicProducts();
        setProducts(data || []);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search),
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
    return <div className="text-center mt-20 text-gray-400">Cargando productos...</div>;

return (
    <div className="pb-10">
      {/* CAMBIO 1: Contenedor 
         Quitamos 'grid grid-cols...' y usamos 'flex flex-wrap'.
         Mantenemos 'gap-6' (24px).
      */}
      <div className="flex flex-wrap gap-6">
        
        {filteredProducts.map((product) => {
          const quantity = quantities[product.sku] || 0;

          return (
            <Card
              key={product.sku}
              /* CAMBIO 2: Clases de la Card
                 - flex-grow: Permite que la tarjeta se estire si es la última de la fila.
                 - w-full: Base para móvil (1 columna).
                 - sm:w-[calc(50%-12px)]: Para tablet (2 col), resta la mitad del gap (24px/2).
                 - lg:w-[calc(25%-18px)]: Para desktop (4 col), resta 3/4 del gap.
              */
              className={`
                bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full
                flex-grow 
                w-full 
                sm:w-[calc(50%-12px)] 
                lg:w-[calc(25%-18px)]
              `}
            >
              {/* ... El resto del contenido de la Card se mantiene igual ... */}
              
              <div className="bg-gray-200 aspect-square rounded-lg mb-4 flex items-center justify-center relative overflow-hidden text-gray-300">
                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
                 </svg>
              </div>

<div className="flex flex-col flex-1">
  
  {/* TÍTULO */}
  <h3 className="text-gray-800 font-medium text-base leading-tight mb-2 line-clamp-2" title={product.name}>
    {product.name}
  </h3>

  {/* Spacer para empujar el contenido hacia abajo */}
  <div className="flex-1"></div>

  {/* --- CAMBIOS AQUÍ: FOOTER --- */}
  {/* Usamos 'flex items-center justify-between' para separar Precio (Izquierda) de Controles (Derecha) */}
  <div className="mt-3 flex items-center justify-between">
      
      {/* 1. PRECIO (A la izquierda) */}
      <span className="text-lg font-bold text-gray-900">
        ${product.currentPrice || product.currentUnitPrice}
      </span>

      {/* 2. CONTROLES (A la derecha: Stepper + Botón) */}
      <div className="flex items-center gap-2">
        
        {/* Botón Menos (Texto simple, sin borde) */}
        <button
          onClick={() => handleQuantityChange(product.sku, -1)}
          className="w-6 h-6 flex items-center justify-center text-xl font-bold text-gray-800 hover:text-purple-600 transition-colors pb-1"
        >
          −
        </button>
        
        {/* Cajita del número (Estilo 'pill' pequeño con borde gris) */}
        <div className="w-8 h-6 flex items-center justify-center text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-md">
          {quantity}
        </div>

        {/* Botón Más (Texto simple, sin borde) */}
        <button
          onClick={() => handleQuantityChange(product.sku, 1)}
          className="w-6 h-6 flex items-center justify-center text-xl font-bold text-gray-800 hover:text-purple-600 transition-colors pb-1"
        >
          +
        </button>

        {/* Botón Agregar (Compacto, estilo lila suave como la imagen) */}
        <Button
          onClick={() => handleAddToCart(product)}
          disabled={quantity === 0}
          className={`
            ml-1 px-3 py-1 rounded-lg text-sm font-medium transition-colors
            ${quantity > 0 
              ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
          `}
        >
          Agregar
        </Button>
      </div>
  </div>
  {/* --- FIN CAMBIOS --- */}

</div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;