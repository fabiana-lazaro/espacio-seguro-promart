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
    <section className="min-h-screen bg-[#FF5A00] text-white flex items-center">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* TEXTO */}
          <div className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
            <span className="font-body mb-3 inline-block rounded-full bg-white px-6 py-2 text-sm font-semibold text-[#FF5A00] shadow-sm">
              {APP_NAME}
            </span>

            <h1 className="font-title mb-3 text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {HERO_TITLE}
            </h1>

            <p className="font-body mx-auto mb-3 max-w-lg text-base leading-7 text-white/95 sm:text-lg lg:mx-0">
              {HERO_DESCRIPTION}
            </p>

            <Link
              to="/intro"
              className="font-body inline-block rounded-full bg-[#4B1FA3] px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-[#3C1882] sm:px-7 sm:text-base"
            >
              {HOME_BUTTON_TEXT}
            </Link>
          </div>

          {/* IMAGEN */}
          <div className="mx-auto flex w-full max-w-xl justify-center">
            <img
              src={HERO_IMAGE}
              alt="Escena laboral"
              className="h-auto max-h-[420px] w-full max-w-md rounded-xl object-contain shadow-xl lg:max-w-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
