import { Outlet, Link } from 'react-router-dom';
import Button from '../../shared/components/Button';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      {/* Header Fijo */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center gap-8">
          
          {/* IZQUIERDA: Logo y Navegación */}
          <div className="flex items-center gap-8">
            {/* Logo Icono */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              <div className="bg-black text-white rounded-lg p-1 w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
            </Link>

            {/* Links de Navegación */}
            <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
              <Link to="/" className="hover:text-purple-600 transition">Productos</Link>
              <Link to="/cart" className="hover:text-purple-600 transition">Carrito de compras</Link>
            </nav>
          </div>

          {/* CENTRO: Barra de Búsqueda */}
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">Search</span> 
              </span>
              <input 
                type="text" 
                className="w-full bg-gray-100 text-gray-800 rounded-lg pl-16 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
            </div>
          </div>

          {/* DERECHA: Botones de Acción */}
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none text-sm px-4 py-2 rounded-md font-medium">
                Iniciar Sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-none text-sm px-4 py-2 rounded-md font-medium">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Contenido Principal Dinámico */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer (Opcional, simplificado según diseño) */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto hidden">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} E-commerce TPI.</p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;