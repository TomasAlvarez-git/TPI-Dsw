import { useState } from 'react';
import Button from '../../shared/components/Button';

function CartPage() {
  // Datos mock para visualizar el diseño (luego lo conectarás al Context)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Nombre de producto', quantity: 2, price: 500 },
    { id: 2, name: 'Nombre de producto', quantity: 1, price: 500 },
    { id: 3, name: 'Nombre de producto', quantity: 3, price: 500 },
  ]);

  const totalAmount = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Columna Izquierda: Lista de Productos */}
      <div className="flex-1 flex flex-col gap-4">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <div className="text-gray-500 text-sm flex gap-4">
                <span>Cantidad de productos: {item.quantity}</span>
                <span>Sub Total: ${item.price * item.quantity},00</span>
              </div>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-auto">
              {/* Contador */}
              <div className="flex items-center gap-3">
                <button className="text-gray-400 hover:text-gray-600 text-2xl font-bold pb-1">−</button>
                <span className="bg-gray-100 px-3 py-1 rounded text-gray-700 font-medium">{item.quantity}</span>
                <button className="text-gray-400 hover:text-gray-600 text-2xl font-bold pb-1">+</button>
              </div>
              
              {/* Botón Borrar */}
              <Button className="bg-purple-100 text-purple-600 hover:bg-purple-200 border-none px-4 py-2 rounded-md font-medium">
                Borrar
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Columna Derecha: Detalle de Pedido */}
      <div className="lg:w-1/3">
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Detalle de pedido</h2>
          
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Cantidad de en total</span>
            <span>#{totalCount}</span>
          </div>
          
          <div className="flex justify-between text-gray-600 mb-8">
            <span>Total a pagar:</span>
            <span className="font-bold text-gray-900">${totalAmount},00</span>
          </div>

          <Button className="w-full bg-purple-100 text-purple-600 hover:bg-purple-200 border-none py-3 rounded-md font-bold text-lg">
            Finalizar Compra
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;