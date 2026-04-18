import React from "react";
import { Link } from "react-router-dom";

const APP_NAME = "Espacio Seguro Promart";
const HERO_TITLE = "¿Esto es hostigamiento?";
const HERO_DESCRIPTION =
  "Reconoce situaciones de hostigamiento en el trabajo y descubre cómo identificarlas a tiempo.";

const HOME_BUTTON_TEXT = "Descubre si puedes identificarlo";
const HERO_IMAGE = `${import.meta.env.BASE_URL}images/interactive-case.png`;

function Home() {
  return (
    <section
      className="min-h-screen text-white flex items-center"
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
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* TEXTO CON FUENTES AGRANDADAS (TAMAÑO TIPO REFERENCIA) */}
          <div className="mx-auto w-full max-w-2xl text-center lg:mx-0 lg:text-left">
            
            {/* Etiqueta superior más grande */}
            <div className="mb-8 inline-flex items-center rounded-xl bg-white/95 px-5 py-3 shadow-lg">
              <div className="mr-3 flex h-6 w-6 items-center justify-center rounded bg-[#FF5A00] text-white">
                <span style={{ fontSize: '12px' }}>🛡️</span>
              </div>
              <span className="text-base font-bold text-[#FF5A00] tracking-wide">
                {APP_NAME}
              </span>
            </div>

            {/* Título de gran impacto */}
            <h1 className="mb-6 text-6xl font-black leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
              {HERO_TITLE}
            </h1>

            {/* Descripción con mejor lectura */}
            <p className="mx-auto mb-10 max-w-xl text-xl leading-relaxed text-white/95 sm:text-2xl lg:mx-0">
              {HERO_DESCRIPTION}
            </p>

            {/* Botón más robusto */}
            <div className="mb-12">
              <Link
                to="/intro"
                className="inline-flex items-center rounded-xl bg-[#2d2d44] px-10 py-4 text-lg sm:text-xl font-bold text-white shadow-2xl transition duration-300 hover:bg-[#1a1a2e] hover:scale-105 active:scale-95"
              >
                {HOME_BUTTON_TEXT}
                <span className="ml-4 text-2xl">›</span>
              </Link>
            </div>

            {/* Lista de beneficios con texto más grande */}
            <div className="flex flex-col gap-5">
              {[
                "Identifica situaciones reales",
                "Aprende a actuar correctamente",
                "Protege tu entorno laboral"
              ].map((text, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start">
                  <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#8bc34a] shadow-md">
                    <span className="text-sm font-bold text-white">✓</span>
                  </div>
                  <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGEN MANTENIDA */}
          <div className="mx-auto flex w-full max-w-2xl justify-center lg:justify-end">
            <img
              src={HERO_IMAGE}
              alt="Escena laboral"
              className="h-auto max-h-[500px] w-full rounded-3xl object-contain shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:max-h-[550px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;