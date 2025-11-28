import Button from '../../shared/components/Button';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalCount, totalAmount } = useCart();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center p-10 text-2xl text-gray-500">
        Tu carrito está vacío 🛒
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

      {/* LISTA DE PRODUCTOS */}
      <div className="flex-1 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
              <div className="text-gray-500 text-sm flex flex-wrap gap-x-4 gap-y-1">
                <span>Cantidad: {item.quantity}</span>
                <span>
                  Sub Total: $
                  {(Number(item.price ?? 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">

              {/* Botones + y - */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold pb-1"
                >
                  −
                </button>

                <span className="bg-white border border-gray-200 px-3 py-1 rounded-md font-medium min-w-[30px] text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold pb-1"
                >
                  +
                </button>
              </div>

              <Button
                onClick={() => removeFromCart(item.id)}
                className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none px-4 py-2 rounded-lg font-bold text-sm"
              >
                Borrar
              </Button>

            </div>
          </div>
        ))}
      </div>

      {/* RESUMEN */}
      <div className="lg:w-[380px]">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Detalle de pedido</h2>

          <div className="flex justify-between items-center text-gray-500 mb-3 text-sm">
            <span>Cantidad total</span>
            <span className="font-medium">#{totalCount}</span>
          </div>

          <div className="flex justify-between items-center text-gray-500 mb-8 text-sm">
            <span>Total a pagar:</span>
            <span className="font-bold text-gray-900 text-lg">
              ${Number(totalAmount).toFixed(2)}
            </span>
          </div>

          <Button className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200 border-none py-3 rounded-lg font-bold text-base transition shadow-sm">
            Finalizar Compra
          </Button>
        </div>
      </div>

    </div>
  );
}

export default CartPage;
