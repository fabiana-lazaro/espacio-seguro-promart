import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Intro from "./pages/Intro";
import QueHago from "./pages/QueHago";
import ResultadoFinal from "./pages/ResultadoFinal";
import ReportForm from "./pages/ReportForm";
import Login from "./pages/Login";

import Footer from "./components/Footer";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter basename="/espacio-seguro-promart">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/que-hago" element={<QueHago />} />
        <Route path="/resultado" element={<ResultadoFinal />} />
        <Route path="/denuncia" element={<ReportForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
