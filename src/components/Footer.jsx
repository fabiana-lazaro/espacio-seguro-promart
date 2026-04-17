import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#1F1F2E] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 justify-items-center gap-10">
          {/* Marca */}
          <div>
            <img
              src="https://marana.pe/wp-content/uploads/2022/10/logo-promart.svg"
              alt="Promart"
              className="h-16 mb-4 object-contain"
            />

            <p className="text-sm text-white/70">
              Espacio seguro laboral para prevenir el hostigamiento.
            </p>
          </div>

          {/* FRASE NUEVA */}
          <div className="flex flex-col justify-center">
            <h4 className="font-semibold mb-3">Nuestro propósito</h4>

            <p className="text-sm text-white/80 italic leading-relaxed">
              💡 “Llevamos a la luz lo que otros prefieren ignorar”
            </p>
          </div>

          {/* Ayuda */}
          <div>
            <div className="flex flex-col items-center text-center"></div>
            <h4 className="font-semibold mb-3">Ayuda</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="hover:text-white cursor-pointer transition">
                Canal de denuncia
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Soporte interno
              </li>
              <li className="hover:text-white cursor-pointer transition">
                Confidencialidad 🔒
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold mb-3">Nuestro compromiso</h4>

            <p className="text-sm text-white/70 mb-4">
              “Un ambiente seguro permite que todos crezcamos juntos”
            </p>

            <Link
              to="/que-hago"
              className="bg-[#FF6A00] text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
            >
              Obtener ayuda
            </Link>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-gray-700 mt-10 pt-5 text-center text-xs text-white/60">
          © 2026 Promart Homecenter | Espacio Seguro
        </div>
      </div>
    </footer>
  );
}

export default Footer;
