import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldAlert,
  Info,
  MessageSquare,
  FileText,
  HeartHandshake,
  Eye,
  Check
} from "lucide-react";

function QueHago() {
  const [tipo, setTipo] = useState("victima");

  const pasosVictima = [
    {
      icon: <Info className="text-blue-500" />,
      text: "Mantén la calma",
      desc: "Tómate un momento para respirar y analizar la situación.",
    },
    {
      icon: <FileText className="text-orange-500" />,
      text: "Guarda evidencias",
      desc: "Capturas, correos o grabaciones son vitales.",
    },
    {
      icon: <MessageSquare className="text-purple-500" />,
      text: "Comunica a tu jefe o RRHH",
      desc: "No te quedes en silencio, busca apoyo interno.",
    },
    {
      icon: <ShieldAlert className="text-red-500" />,
      text: "Utiliza el canal de denuncia",
      desc: "Tu reporte es confidencial y seguro.",
    },
  ];

  const pasosTestigo = [
    {
      icon: <HeartHandshake className="text-green-500" />,
      text: "Apoya a la persona afectada",
      desc: "Hazle saber que no está sola en esto.",
    },
    {
      icon: <Eye className="text-blue-500" />,
      text: "No ignores la situación",
      desc: "Tu intervención puede detener el acoso.",
    },
    {
      icon: <MessageSquare className="text-purple-500" />,
      text: "Reporta el caso",
      desc: "Ayuda a mantener un ambiente seguro para todos.",
    },
    {
      icon: <ShieldAlert className="text-red-500" />,
      text: "Utiliza el canal de denuncia",
      desc: "Actúa con responsabilidad y empatía.",
    },
  ];

  const pasos = tipo === "victima" ? pasosVictima : pasosTestigo;

  return (
    <section
      className="min-h-screen text-white flex items-center font-sans"
      style={{
        background: `linear-gradient(180deg, #ff5f00 0%, #ff6a00 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 w-full">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            ¿Qué hago si me pasa?
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            En <strong>Promart</strong>, tu seguridad es nuestra prioridad.
          </p>
        </div>

        {/* Selector */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800/30 p-1 rounded-2xl flex gap-2 backdrop-blur-sm">
            <button
              onClick={() => setTipo("victima")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                tipo === "victima"
                  ? "bg-white text-gray-700 shadow-lg scale-105"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Soy víctima
            </button>
            <button
              onClick={() => setTipo("testigo")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                tipo === "testigo"
                  ? "bg-white text-gray-700 shadow-lg scale-105"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Soy testigo
            </button>
          </div>
        </div>

        {/* Contenedor Principal */}
        <div className="bg-white text-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
          
          {/* LADO IZQUIERDO MEJORADO CON VERDE */}
          <div className="bg-[#1D2533] md:w-1/3 p-10 flex flex-col justify-center">
            <div className="bg-white/10 p-6 rounded-full mb-6 mx-auto">
              <ShieldAlert size={60} className="text-[#9FE3DB]" />
            </div>

            <h3 className="text-white text-2xl font-bold text-center leading-tight mb-6">
              Espacio Seguro <br /> Promart
            </h3>

            {/* Lista con Iconos Verdes Estilo Denuncia */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="d-flex align-items-center flex items-center">
                <div className="rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ width: "24px", height: "24px", backgroundColor: "#28a745" }}>
                  <Check size={14} className="text-white font-bold" />
                </div>
                <span className="text-white/90 text-sm font-semibold">Confidencial</span>
              </div>

              <div className="d-flex align-items-center flex items-center">
                <div className="rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ width: "24px", height: "24px", backgroundColor: "#28a745" }}>
                  <Check size={14} className="text-white font-bold" />
                </div>
                <span className="text-white/90 text-sm font-semibold">Apoyo profesional</span>
              </div>

              <div className="d-flex align-items-center flex items-center">
                <div className="rounded-full flex items-center justify-center mr-3 flex-shrink-0" style={{ width: "24px", height: "24px", backgroundColor: "#28a745" }}>
                  <Check size={14} className="text-white font-bold" />
                </div>
                <span className="text-white/90 text-sm font-semibold">Respuesta rápida</span>
              </div>
            </div>

            <p className="text-white/60 text-center text-xs leading-relaxed">
              Nuestro equipo está comprometido en garantizar un entorno laboral seguro.
            </p>
          </div>

          {/* LADO DERECHO */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-gray-700">
              {tipo === "victima" ? "Pasos a seguir si eres víctima" : "Cómo actuar si eres testigo"}
            </h2>

            <div className="grid gap-8">
              {pasos.map((paso, index) => (
                <div key={index} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-100 rounded-xl shadow-sm flex items-center justify-center group-hover:border-[#28a745] transition-colors">
                    {paso.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#28a745] transition-colors">
                      {paso.text}
                    </h4>
                    <p className="text-gray-500 leading-relaxed text-sm">
                      {paso.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs text-gray-400 font-medium italic">
                Tu reporte es 100% privado y protegido.
              </p>
              <Link
                to="/denuncia"
                className="w-full sm:w-auto bg-[#FF5A00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#e65100] hover:shadow-xl transform hover:-translate-y-1 transition-all text-center"
              >
                Ir al Canal de Denuncia
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QueHago;