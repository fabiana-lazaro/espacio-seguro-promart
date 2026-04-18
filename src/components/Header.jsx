import { Link } from "react-router-dom";
import { Home, User } from "lucide-react";

function Header({ user }) {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <img
          src="https://marana.pe/wp-content/uploads/2022/10/logo-promart.svg"
          alt="Promart"
          className="h-25 object-contain"
        />

        {/* Navegación */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-semibold tracking-widest uppercase">
          <Link
            to="/"
            className="group relative flex items-center gap-2 text-black hover:text-[#FF6A00] transition no-underline"
          >
            <Home
              size={18}
              className="text-gray-500 group-hover:text-[#FF6A00]"
            />
            INICIO
          </Link>

          <Link
            to="/que-hago"
            className="group relative flex items-center gap-2 text-black hover:text-[#FF6A00] transition no-underline"
          >
            <User
              size={18}
              className="text-gray-500 group-hover:text-[#FF6A00]"
            />
            PROTOCOLO
          </Link>
        </nav>

        {/* FRASE CENTRAL */}
        <div className="hidden lg:block text-sm text-gray-500 italic">
          “Un entorno seguro empieza con información y acción.”
        </div>

        {/* Usuario */}
        <div>
          {user ? (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-full">
              <img
                src={user.photoURL}
                alt="usuario"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-gray-700 hidden md:block">
                {user.displayName}
              </span>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-[#FF6A00] text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition no-underline"
            >
              INICIAR SESIÓN
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
