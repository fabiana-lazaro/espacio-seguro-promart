import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ⚡ Login de prueba
    if (email === "admin@promart.pe" && password === "123456") {
      navigate("/");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ff5f00] via-[#ff7a00] to-[#ff8c1a]">
      {/* CARD BLANCO */}
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl text-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />

          {/* BOTÓN */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-white hover:bg-gray-900 transition py-3 rounded-lg font-semibold"
          >
            Ingresar
          </button>
        </form>

        {/* LINK */}
        <p className="text-sm text-center mt-4 text-gray-500">
          ¿No tienes cuenta?{" "}
          <Link to="/" className="text-orange-600 font-semibold">
            Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
