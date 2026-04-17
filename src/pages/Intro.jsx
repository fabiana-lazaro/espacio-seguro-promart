import React from "react";
import { Link } from "react-router-dom";

const APP_NAME = "Espacio Seguro Promart";
const INTRO_TAG = "Antes de empezar";
const INTRO_TITLE = "¿Puedes reconocer el hostigamiento laboral?";
const INTRO_TEXT =
  "Pon a prueba tu criterio con situaciones inspiradas en casos reales del entorno laboral.";

const BACK_TEXT = "Volver";
const START_BUTTON_TEXT = "Empezar";

function Intro() {
  return (
    <section
      className="min-h-screen text-white"
      style={{
        background: `linear-gradient(
          180deg,
          #ff5f00 0%,
          #ff6a00 25%,
          #ff7a00 50%,
          #ff8c1a 75%,
          #ffa322 100%
        )`,
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-6 md:grid-cols-2 md:gap-8">
          {/* IZQUIERDA */}
          <div className="w-full max-w-xl text-center md:text-left">
            <span className="font-body mb-3 inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#FF5A00] shadow-sm">
              {APP_NAME}
            </span>

            <p className="font-body mb-2 text-xs font-semibold uppercase tracking-wider text-white/80">
              {INTRO_TAG}
            </p>

            <h1 className="font-title mb-2 text-4xl leading-tight sm:text-5xl">
              {INTRO_TITLE}
            </h1>

            <p className="font-body mb-3 text-base leading-7 text-white/95">
              {INTRO_TEXT}
            </p>

            <div className="mt-2 flex justify-center gap-4">
              <Link
                to="/"
                className="font-body rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#4B1FA3] no-underline shadow-lg transition hover:-translate-y-0.5 hover:bg-[#FFF3EC]"
              >
                {BACK_TEXT}
              </Link>

              <Link
                to="/game"
                className="font-body rounded-full bg-gray-700 px-7 py-3 text-sm font-semibold text-white no-underline shadow-lg transition hover:-translate-y-0.5 hover:bg-gray-800"
              >
                {START_BUTTON_TEXT}
              </Link>
            </div>
          </div>

          {/* DERECHA */}
          <div className="w-full max-w-xl md:justify-self-end">
            <div className="rounded-2xl bg-white p-6 text-gray-800 shadow-xl sm:p-7">
              {/* INSTRUCCIÓN 1 */}
              <div className="mb-4">
                <p className="font-body text-base font-semibold text-[#2B0B57]">
                  Analiza cada situación
                </p>
                <p className="font-body mt-1 text-sm leading-6 text-gray-700">
                  Avanza por{" "}
                  <span className="font-semibold text-[#FF5A00]">
                    3 niveles
                  </span>{" "}
                  con distintos casos que deberás evaluar.
                </p>
              </div>

              {/* INSTRUCCIÓN 2 */}
              <div className="mb-4">
                <p className="font-body text-base font-semibold text-[#2B0B57]">
                  Responde a tiempo
                </p>
                <p className="font-body mt-1 text-sm leading-6 text-gray-700">
                  Tendrás{" "}
                  <span className="font-semibold text-[#FF5A00]">
                    12 segundos
                  </span>{" "}
                  para responder cada pregunta.
                </p>
              </div>

              {/* INSTRUCCIÓN 3 */}
              <div className="mb-4">
                <p className="font-body text-base font-semibold text-[#2B0B57]">
                  Compara tu desempeño
                </p>
                <p className="font-body mt-1 text-sm leading-6 text-gray-700">
                  Podrás comparar tus resultados con otras tiendas, distritos y
                  ciudades de Promart.
                </p>
              </div>

              {/* INSTRUCCIÓN 4 */}
              <div>
                <p className="font-body text-base font-semibold text-[#2B0B57]">
                  Sigue aprendiendo
                </p>
                <p className="font-body mt-1 text-sm leading-6 text-gray-700">
                  Después de cada pregunta podrás acceder a{" "}
                  <span className="font-semibold text-[#4B1FA3]">Aprender</span>{" "}
                  y profundizar en cada situación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
