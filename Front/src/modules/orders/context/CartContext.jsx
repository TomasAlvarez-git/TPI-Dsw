// CartContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

// Importante: No exportamos esto para evitar el error de mixed exports
const CartContext = createContext();

export function CartProvider({ children }) {

  // Cargar desde localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cart');

      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error al leer carrito:', e);

      return [];
    }
  });

  // Guardar en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // -------------------------------
  //  IDENTIFICADOR SEGURO
  // -------------------------------
  const getSafeId = (product) => {
    return product.id ?? product.sku;  // si no existe id, usa sku
  };

  // -------------------------------
  //  AGREGAR AL CARRITO
  // -------------------------------
  const addToCart = (product, quantity = 1) => {
    if (quantity < 1) return;

    const productId = getSafeId(product);

    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);

      if (existing) {
        // SUMA si ya existe ese producto
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      // AGREGAR si no existe
      const price = product.currentPrice ?? product.currentUnitPrice ?? 0;

      return [
        ...prev,
        {
          id: productId,   // YA NO FALLA
          name: product.name,
          price,
          quantity,
          sku: product.sku,
        },
      ];
    });
  };

  // -------------------------------
  //  BORRAR PRODUCTO
  // -------------------------------
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // -------------------------------
  //  CAMBIAR CANTIDAD
  // -------------------------------
  const updateQuantity = (productId, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);

          return { ...item, quantity: newQty };
        }

        return item;
      }),
    );
  };

  // -------------------------------
  //  LIMPIAR TODO
  // -------------------------------
  const clearCart = () => setCartItems([]);

  // -------------------------------
  //  TOTALES
  // -------------------------------
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price * item.quantity),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Agregamos este comentario para decirle a ESLint que permita exportar el hook
// junto con el componente. Es seguro hacerlo en archivos de Contexto.
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);