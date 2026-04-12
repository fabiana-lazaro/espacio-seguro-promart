import React from "react";
import { Link } from "react-router-dom";

const APP_NAME = "Espacio Seguro";
const INTRO_TAG = "Antes de empezar";
const INTRO_TITLE = "¿Puedes reconocer el hostigamiento laboral?";
const INTRO_TEXT =
  "Analiza situaciones inspiradas en casos reales y decide si pueden considerarse hostigamiento laboral.";

const STEP_ONE = "Observa la situación";
const STEP_TWO = "Analiza el contexto";
const STEP_THREE = "Toma una decisión";

const NOTE_TEXT =
  "Recuerda: no solo importa la intención, sino también cómo puede afectar a la otra persona.";

const START_BUTTON_TEXT = "Empezar";
const BACK_TEXT = "Volver";

function Intro() {
  return (
    <section className="min-h-screen bg-[#FF5A00] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-5 py-6 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-6 md:grid-cols-2 md:gap-8">
          {/* IZQUIERDA */}
          <div className="w-full max-w-xl text-center md:text-left">
            <span className="font-body mb-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#FF5A00] shadow-sm">
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

            {/* BOTONES */}
            <div className="mt-2 flex justify-center gap-4 md:justify-center">
              <Link
                to="/"
                className="font-body rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#4B1FA3] no-underline shadow-lg transition hover:-translate-y-0.5 hover:bg-[#FFF3EC]"
              >
                {BACK_TEXT}
              </Link>

              <Link
                to="/game"
                className="font-body rounded-full bg-[#4B1FA3] px-7 py-3 text-sm font-semibold text-white no-underline shadow-lg transition hover:-translate-y-0.5 hover:bg-[#3C1882]"
              >
                {START_BUTTON_TEXT}
              </Link>
            </div>
          </div>

          {/* DERECHA */}
          <div className="w-full max-w-xl md:justify-self-end">
            <div className="rounded-2xl bg-white p-6 text-gray-800 shadow-xl sm:p-7">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE7D9] font-title text-[#FF5A00]">
                  1
                </div>
                <p className="font-body mt-2 text-base font-semibold text-[#2B0B57]">
                  {STEP_ONE}
                </p>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8D9FF] font-title text-[#4B1FA3]">
                  2
                </div>
                <p className="font-body mt-2 text-base font-semibold text-[#2B0B57]">
                  {STEP_TWO}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8F5EE] font-title text-[#008B7A]">
                  3
                </div>
                <p className="font-body mt-2 text-base font-semibold text-[#2B0B57]">
                  {STEP_THREE}
                </p>
              </div>

              <div className="mt-4 rounded-xl bg-[#FFF6F1] p-3">
                <p className="font-body text-sm text-gray-700">{NOTE_TEXT}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Intro;
