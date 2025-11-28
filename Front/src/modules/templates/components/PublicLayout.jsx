import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Button from '../../shared/components/Button';

function PublicLayout() {
  const [search, setSearch] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para el menú móvil si se necesitara expandir
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);
    navigate(`/?search=${value}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">

      {/* --- HEADER --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 lg:h-20 flex items-center justify-between gap-4">

          {/* 1. LOGO & NAV (Desktop) */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            {/* Logo Icon */}
            <Link to="/" className="flex items-center">
              <div className="text-black">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            {/* Nav Links (Hidden on Mobile, Visible on Desktop) */}
            <nav className="hidden lg:flex gap-2 text-sm font-medium text-gray-600">

              {/* ENLACE PRODUCTOS */}
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'bg-gray-100 text-gray-900 font-semibold'  // Estilo si estoy en Home
                    : 'hover:text-gray-900 hover:bg-gray-50'     // Estilo si NO estoy en Home
                }`}
              >
    Productos
              </Link>

              {/* ENLACE CARRITO */}
              <Link
                to="/cart"
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  location.pathname === '/cart'
                    ? 'bg-gray-100 text-gray-900 font-semibold'  // Estilo si estoy en Carrito
                    : 'hover:text-gray-900 hover:bg-gray-50'     // Estilo si NO estoy en Carrito
                }`}
              >
    Carrito de compras
              </Link>

            </nav>
          </div>

          {/* 2. SEARCH BAR (Flexible width) */}
          <div className="flex-1 max-w-2xl mx-2 lg:mx-4">
            <div className="relative group">
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search"
                className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-gray-400 focus:ring-0 transition-all shadow-sm group-hover:border-gray-400"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. ACTIONS (Desktop) & MENU TOGGLE (Mobile) */}
          <div className="shrink-0 flex items-center gap-3">

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/login">
                <Button className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none px-5 py-2 rounded-lg font-medium text-sm transition-colors">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-gray-200 text-gray-700 hover:bg-gray-300 border-none px-5 py-2 rounded-lg font-medium text-sm transition-colors">
                  Registrarse
                </Button>
              </Link>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown (Opcional, para completar la funcionalidad móvil) */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white p-4 flex flex-col gap-4 shadow-lg absolute w-full">
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2">Productos</Link>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="text-gray-700 font-medium py-2">Carrito de compras</Link>
            </nav>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-purple-100 text-purple-700 py-2 rounded-lg">Iniciar Sesión</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg">Registrarse</Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content with Padding */}
      <main className="flex-1 container mx-auto px-4 py-6 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

export default PublicLayout;