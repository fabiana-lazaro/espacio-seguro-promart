import React, { useState } from "react";
import { Link } from "react-router-dom";
// Si usas lucide-react (muy común en proyectos modernos), si no, usa emojis como tenías
import { ShieldAlert, Info, MessageSquare, FileText, HeartHandshake, Eye } from "lucide-react";

function QueHago() {
  const [tipo, setTipo] = useState("victima"); // Por defecto victima para que no se vea vacío al inicio

  const pasosVictima = [
    { icon: <Info className="text-blue-500" />, text: "Mantén la calma", desc: "Tómate un momento para respirar y analizar la situación." },
    { icon: <FileText className="text-orange-500" />, text: "Guarda evidencias", desc: "Capturas, correos o grabaciones son vitales." },
    { icon: <MessageSquare className="text-purple-500" />, text: "Comunica a tu jefe o RRHH", desc: "No te quedes en silencio, busca apoyo interno." },
    { icon: <ShieldAlert className="text-red-500" />, text: "Utiliza el canal de denuncia", desc: "Tu reporte es confidencial y seguro." },
  ];

  const pasosTestigo = [
    { icon: <HeartHandshake className="text-green-500" />, text: "Apoya a la persona afectada", desc: "Hazle saber que no está sola en esto." },
    { icon: <Eye className="text-blue-500" />, text: "No ignores la situación", desc: "Tu intervención puede detener el acoso." },
    { icon: <MessageSquare className="text-purple-500" />, text: "Reporta el caso", desc: "Ayuda a mantener un ambiente seguro para todos." },
    { icon: <ShieldAlert className="text-red-500" />, text: "Utiliza el canal de denuncia", desc: "Actúa con responsabilidad y empatía." },
  ];

  const pasos = tipo === "victima" ? pasosVictima : pasosTestigo;

  return (
    <section className="min-h-screen bg-[#FF5A00] text-white flex items-center font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 w-full">
        
        {/* Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            ¿Qué hago si me pasa?
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            En <strong>Promart</strong>, tu seguridad es nuestra prioridad. Sigue esta guía para saber cómo actuar frente al hostigamiento laboral.
          </p>
        </div>

        {/* Selector de Rol con estilo de Tab */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#3C1882]/30 p-1 rounded-2xl flex gap-2 backdrop-blur-sm">
            <button
              onClick={() => setTipo("victima")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                tipo === "victima" ? "bg-white text-[#4B1FA3] shadow-lg scale-105" : "text-white hover:bg-white/10"
              }`}
            >
              Soy víctima
            </button>
            <button
              onClick={() => setTipo("testigo")}
              className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 ${
                tipo === "testigo" ? "bg-white text-[#4B1FA3] shadow-lg scale-105" : "text-white hover:bg-white/10"
              }`}
            >
              Soy testigo
            </button>
          </div>
        </div>

        {/* Contenedor Principal */}
        <div className="bg-slate-50 text-gray-800 rounded-[2.5rem] shadow-2xl overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
          
          {/* Lado Izquierdo: Ilustración/Badge */}
          <div className="bg-[#4B1FA3] md:w-1/3 p-10 flex flex-col justify-center items-center text-center">
             <div className="bg-white/10 p-6 rounded-full mb-6">
                <ShieldAlert size={80} className="text-white" />
             </div>
             <h3 className="text-white text-2xl font-bold leading-tight">
                Espacio Seguro <br/> Promart
             </h3>
             <p className="text-white/70 mt-4 text-sm">
                Estamos aquí para escucharte y proteger tu integridad laboral.
             </p>
          </div>

          {/* Lado Derecho: Pasos */}
          <div className="md:w-2/3 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-8 text-[#4B1FA3]">
              {tipo === "victima" ? "Pasos a seguir si eres víctima" : "Cómo actuar si eres testigo"}
            </h2>

            <div className="grid gap-8">
              {pasos.map((paso, index) => (
                <div key={index} className="flex gap-5 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-white border-2 border-gray-100 rounded-xl shadow-sm flex items-center justify-center group-hover:border-[#FF5A00] transition-colors">
                    {paso.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{paso.text}</h4>
                    <p className="text-gray-500 leading-relaxed">{paso.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Final */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-sm text-gray-400 font-medium">
                Tu denuncia es 100% confidencial.
              </p>
              <Link
                to="/denuncia"
                className="w-full sm:w-auto bg-[#FF5A00] text-white px-10 py-4 rounded-xl font-bold hover:bg-[#e65100] hover:shadow-xl transform hover:-translate-y-1 transition-all text-center"
              >
                Ir al Canal de Denuncia
              </Link>
            </div>
          </div>
        </div>ss

      </div>
    </section>
  );
}

export default QueHago;