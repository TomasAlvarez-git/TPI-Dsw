import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../shared/components/Button';

function PublicLayout() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Redirigimos a Home con ?search=xxx
    navigate(`/?search=${value}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center gap-8">
          
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-gray-800">
              <div className="bg-black text-white rounded-lg p-1 w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
            </Link>

            <nav className="hidden md:flex gap-6 text-gray-600 font-medium">
              <Link to="/" className="hover:text-purple-600 transition">Productos</Link>
              <Link to="/cart" className="hover:text-purple-600 transition">Carrito de compras</Link>
            </nav>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex-1 max-w-lg hidden md:block">
            <div className="relative">
              <input 
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Buscar productos..."
                className="w-full bg-gray-100 text-gray-800 rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>
          </div>

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

      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;
