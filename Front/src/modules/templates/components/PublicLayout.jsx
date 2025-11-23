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
              <div className="bg-white text-black rounded-lg p- w-8 h-8 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 48 48" 
                  className="w-6 h-6 fill-current"
                >
                  <path d="M36 35a4 4 0 0 0 4-4V17a5 5 0 0 0 1-3 1 1 0 0 0-.08-.39l-3-7A1 1 0 0 0 37 6H11a1 1 0 0 0-.92.6l-3 7A1 1 0 0 0 7 14a5 5 0 0 0 1 3v14a4 4 0 0 0 4 4h6.5v2a3.74 3.74 0 0 0-3.5 3.74V41a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-.26A3.74 3.74 0 0 0 29.5 37v-2zm2-7H10v-9.42a3.94 3.94 0 0 0 .48.18 4.43 4.43 0 0 0 .49.13A5 5 0 0 0 16 17a5 5 0 0 0 8 0 5 5 0 0 0 8 0 5 5 0 0 0 5 1.89 4.43 4.43 0 0 0 .49-.13 3.94 3.94 0 0 0 .48-.18zM9 14.19 11.66 8h24.68L39 14.19a3 3 0 0 1-6-.19 1 1 0 0 0-2 0 3 3 0 0 1-6 0 1 1 0 0 0-2 0 3 3 0 0 1-6 0 1 1 0 0 0-2 0 3 3 0 0 1-6 .19zM30.83 40H17.17a1.72 1.72 0 0 1 1.57-1h10.52a1.72 1.72 0 0 1 1.57 1zM20.5 37v-2h7v2zM12 33a2 2 0 0 1-2-2v-1h28v1a2 2 0 0 1-2 2z"/>
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
            <Link to="/signup">
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
