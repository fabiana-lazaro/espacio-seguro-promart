import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#4B1FA3] text-white mt-10">

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Sección Principal */}
        <div className="grid md:grid-cols-3 gap-8 items-center">

          {/* Logo */}
          <div className="text-center md:text-left">
            <img
              src="https://promart.vteximg.com.br/arquivos/promart-homecenter-logo.png?v=636854959088970000"
              alt="Promart Logo"
              className="h-16 mb-3 mx-auto md:mx-0"
            />

            <h3 className="text-lg font-semibold">
              Espacio Seguro Promart
            </h3>

            <p className="text-sm text-white/80 mt-2">
              Promovemos un entorno laboral respetuoso, inclusivo y libre de hostigamiento.
            </p>
          </div>

          {/* Frase */}
          <div className="text-center">
            <p className="text-lg font-medium">
              "Un ambiente seguro permite que todos crezcamos juntos"
            </p>

            <p className="text-sm text-white/80 mt-2">
              Promart Homecenter
            </p>
          </div>

          {/* Botones */}
          <div className="flex flex-col gap-3 items-center md:items-end">

            <Link
              to="/"
              className="bg-white text-[#4B1FA3] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Inicio
            </Link>

            <Link
              to="/que-hago"
              className="bg-white text-[#4B1FA3] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              ¿Qué hago si me pasa?
            </Link>

          </div>

        </div>

        {/* Línea inferior */}
        <div className="border-t border-white/20 mt-8 pt-4 text-center text-sm text-white/80">
          © 2026 Promart Homecenter | Espacio Seguro Laboral
        </div>

      </div>

    </footer>
  );
}

export default Footer;