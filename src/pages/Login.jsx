import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const imagen = `${import.meta.env.BASE_URL}images/hosti.png`;
  const googleProvider = new GoogleAuthProvider();

  const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Ese correo ya está registrado.";
      case "auth/invalid-email":
        return "El correo no es válido.";
      case "auth/weak-password":
        return "La contraseña debe tener al menos 6 caracteres.";
      case "auth/user-not-found":
        return "No existe una cuenta con ese correo.";
      case "auth/wrong-password":
        return "La contraseña es incorrecta.";
      case "auth/invalid-credential":
        return "Correo o contraseña incorrectos.";
      case "auth/missing-password":
        return "Debes ingresar una contraseña.";
      case "auth/popup-closed-by-user":
        return "Cerraste la ventana de Google antes de terminar.";
      case "auth/popup-blocked":
        return "El navegador bloqueó la ventana emergente de Google.";
      case "auth/cancelled-popup-request":
        return "Se canceló la solicitud de inicio con Google.";
      default:
        return "Ocurrió un error. Inténtalo nuevamente.";
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const name = registerData.name.trim();
    const email = registerData.email.trim();
    const password = registerData.password;

    if (!name || !email || !password) {
      setError("Completa todos los campos para registrarte.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setLoading(true);

      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }

      setMessage("Cuenta creada correctamente. Ya iniciaste sesión.");
      setRegisterData({
        name: "",
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const email = loginData.email.trim();
    const password = loginData.password;

    if (!email || !password) {
      setError("Completa correo y contraseña para iniciar sesión.");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      setMessage("Inicio de sesión correcto.");
      setLoginData({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setMessage("");

    try {
      setLoading(true);

      await signInWithPopup(auth, googleProvider);

      setMessage("Has iniciado sesión con Google correctamente.");
      navigate("/dashboard");
    } catch (err) {
      setError(getFirebaseErrorMessage(err.code));
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 py-8"
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
      <div className="relative w-full max-w-[900px] h-[520px] bg-white rounded-[12px] overflow-hidden flex shadow-[0_0_30px_rgba(0,0,0,0.15)]">
        {/* LOGIN */}
        <div className="w-1/2 h-full overflow-hidden">
          <form
            onSubmit={handleLogin}
            className={`h-full flex flex-col justify-center items-center transition-transform duration-700 ${
              isToggled ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="mb-5 text-[28px] font-semibold text-gray-800">
              INICIAR SESIÓN
            </h2>

            <div className="w-[260px] h-[40px] my-[10px]">
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="EMAIL"
                className="w-full h-full bg-gray-200 px-3 rounded outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="w-[260px] h-[40px] my-[10px]">
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="PASSWORD"
                className="w-full h-full bg-gray-200 px-3 rounded outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 px-6 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-60"
            >
              {loading && !isToggled ? "CARGANDO..." : "ENTRAR"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-3 px-6 py-2 rounded bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition disabled:opacity-60"
            >
              CONTINUAR CON GOOGLE
            </button>
          </form>
        </div>

        {/* REGISTRO */}
        <div className="w-1/2 h-full overflow-hidden">
          <form
            onSubmit={handleRegister}
            className={`h-full flex flex-col justify-center items-center transition-transform duration-700 ${
              isToggled ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h2 className="mb-5 text-[28px] font-semibold text-gray-800">
              REGISTRARSE
            </h2>

            <div className="w-[260px] h-[40px] my-[10px]">
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="NOMBRE"
                className="w-full h-full bg-gray-200 px-3 rounded outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="w-[260px] h-[40px] my-[10px]">
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="EMAIL"
                className="w-full h-full bg-gray-200 px-3 rounded outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="w-[260px] h-[40px] my-[10px]">
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                placeholder="PASSWORD"
                className="w-full h-full bg-gray-200 px-3 rounded outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-3 px-6 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition disabled:opacity-60"
            >
              {loading && isToggled ? "CARGANDO..." : "REGISTRAR"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="mt-3 px-6 py-2 rounded bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 transition disabled:opacity-60"
            >
              REGISTRARSE CON GOOGLE
            </button>
          </form>
        </div>

        {/* PANEL DERECHO */}
        <div
          className={`absolute w-[55%] h-[120%] top-[-10%] left-[45%] flex flex-col justify-center items-center text-white transition-all duration-700 overflow-hidden ${
            isToggled ? "-translate-x-full rounded-r-[50%]" : "rounded-l-[50%]"
          }`}
          style={{
            backgroundImage: `url(${imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 text-center px-6">
            <h3 className="text-[24px] font-semibold mb-2">
              ¿ESTO ES HOSTIGAMIENTO?
            </h3>

            <p className="mb-4 text-white/90">Descúbrelo aquí</p>

            <div className="flex flex-col gap-5 mt-2">
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMessage("");
                  setIsToggled(true);
                }}
                className="px-6 py-2 rounded bg-orange-600 hover:bg-orange-700 transition shadow-md"
              >
                REGISTRAR
              </button>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMessage("");
                  setIsToggled(false);
                }}
                className="px-6 py-2 rounded bg-white/20 hover:bg-white/30 border border-white/40 backdrop-blur-sm transition"
              >
                INICIAR
              </button>
            </div>
          </div>
        </div>
      </div>

      {(error || message) && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`px-5 py-3 rounded-lg shadow-lg text-white ${
              error ? "bg-red-500" : "bg-green-600"
            }`}
          >
            {error || message}
          </div>
        </div>
      )}
    </section>
  );
}

export default Login;
