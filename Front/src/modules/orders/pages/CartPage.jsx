import Button from '../../shared/components/Button';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalCount, totalAmount } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-gray-400 gap-4">
        <svg className="w-16 h-16 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <div className="text-xl">Tu carrito está vacío</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start pb-20">

      {/* SECCIÓN 1: Lista de Items */}
      <div className="w-full flex-1 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4"
          >
            {/* Info Producto */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
              <div className="text-gray-500 text-sm flex flex-col sm:flex-row gap-1 sm:gap-4">
                <span>Cantidad de productos: {item.quantity}</span>
                <span className="hidden sm:inline text-gray-300">|</span>
                <span>
                  Sub Total: <span className="font-medium text-gray-700">${(Number(item.price ?? 0) * item.quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Controles (Stepper + Borrar) */}
            <div className="flex items-center justify-between lg:justify-end gap-4 lg:gap-6 border-t border-gray-100 pt-4 lg:pt-0 lg:border-0 w-full lg:w-auto">

              {/* Stepper Minimalista */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-6 h-6 flex items-center justify-center font-bold text-gray-900 hover:text-gray-600 pb-1"
                >
                  −
                </button>

                <div className="bg-white border border-gray-200 text-gray-700 w-8 h-7 flex items-center justify-center rounded text-sm font-medium">
                  {item.quantity}
                </div>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-6 h-6 flex items-center justify-center font-bold text-gray-900 hover:text-gray-600 pb-1"
                >
                  +
                </button>
              </div>

              {/* Botón Borrar (Lila claro) */}
              <Button
                onClick={() => removeFromCart(item.id)}
                className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none px-4 py-1.5 rounded-lg font-medium text-sm transition-colors"
              >
                Borrar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* SECCIÓN 2: Resumen (Sticky) */}
      <div className="w-full lg:w-[380px] shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Detalle de pedido</h2>

          <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
            <span>Cantidad de en total:</span>
            <span className="font-medium text-gray-800">#{totalCount}</span>
          </div>

          <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
            <span className="text-gray-500 text-sm">Total a pagar:</span>
            <span className="font-bold text-2xl text-gray-900">
              ${Number(totalAmount).toFixed(2)}
            </span>
          </div>

          <div className="mt-8">
            <Button className="w-full bg-purple-200 text-purple-900 hover:bg-purple-300 border-none py-3 rounded-xl font-bold text-base shadow-sm transition-colors">
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default CartPage;