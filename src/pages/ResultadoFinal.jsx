import React from "react";
import { Link } from "react-router-dom";

function ResultadoFinal({ puntaje = 3, total = 5 }) {
  const porcentaje = Math.round((puntaje / total) * 100);

  const obtenerMensaje = () => {
    if (porcentaje >= 80)
      return "¡Excelente! Identificas correctamente situaciones de hostigamiento laboral.";
    if (porcentaje >= 50)
      return "¡Bien! Aún puedes mejorar tu identificación de situaciones.";
    return "Puedes mejorar. Te recomendamos revisar la guía para aprender más.";
  };

  return (
    <section className="min-h-screen bg-[#FF5A00] flex items-center justify-center text-white">
      <div className="max-w-4xl w-full mx-auto px-6 py-12">
        {/* Tarjeta principal */}
        <div className="bg-white text-gray-800 rounded-3xl shadow-2xl p-10 text-center">
          {/* Icono */}
          <div className="text-6xl mb-4">🏆</div>

          {/* Titulo */}
          <h1 className="text-4xl font-bold text-[#4B1FA3] mb-2">
            Resultado Final
          </h1>

          <p className="text-gray-500 mb-6">
            Has completado la experiencia interactiva
          </p>

          {/* Puntaje */}
          <div className="bg-gray-100 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-2">Tu Puntaje</h2>

            <div className="text-5xl font-bold text-[#FF5A00]">
              {puntaje} / {total}
            </div>

            <p className="text-gray-500 mt-2">
              {porcentaje}% de respuestas correctas
            </p>
          </div>

          {/* Barra progreso */}
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-[#4B1FA3] h-4 rounded-full transition-all"
              style={{ width: `${porcentaje}%` }}
            ></div>
          </div>

          {/* Mensaje */}
          <p className="text-lg font-medium text-gray-700 mb-8">
            {obtenerMensaje()}
          </p>

          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/que-hago"
              className="bg-[#4B1FA3] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#3C1882] transition"
            >
              ¿Qué hago si me pasa?
            </Link>

            <Link
              to="/denuncia"
              className="bg-[#FF5A00] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#e65100] transition"
            >
              Ir a Denuncia
            </Link>

            <Link
              to="/"
              className="border-2 border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResultadoFinal;
