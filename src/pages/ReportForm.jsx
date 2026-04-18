import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const initialForm = {
  reportMode: "anonymous",
  reporterRole: "",
  place: "",
  involvedPerson: "",
  involvedOther: "",
  incidentType: "",
  incidentOther: "",
  description: "",
  name: "",
  email: "",
};

export default function ReportForm() {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.reporterRole.trim()) newErrors.reporterRole = "Selecciona una opción.";
    if (!formData.place.trim()) newErrors.place = "Este campo es obligatorio.";
    if (!formData.involvedPerson.trim()) newErrors.involvedPerson = "Selecciona una opción.";
    if (formData.involvedPerson === "Otro" && !formData.involvedOther.trim()) {
      newErrors.involvedOther = "Especifica quién estuvo involucrado.";
    }
    if (!formData.incidentType.trim()) newErrors.incidentType = "Selecciona una opción.";
    if (formData.incidentType === "Otro" && !formData.incidentOther.trim()) {
      newErrors.incidentOther = "Especifica el tipo de situación.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Describe lo ocurrido.";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Escribe al menos 20 caracteres.";
    }

    if (formData.reportMode === "identified") {
      if (!formData.name.trim()) newErrors.name = "Ingresa tu nombre.";
      if (!formData.email.trim()) {
        newErrors.email = "Ingresa tu correo.";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Ingresa un correo válido.";
      }
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setIsSuccess(false);
      setStatusMessage("Por favor, corrige los campos marcados.");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "reports"), {
        ...formData,
        involvedPerson: formData.involvedPerson === "Otro" ? formData.involvedOther : formData.involvedPerson,
        incidentType: formData.incidentType === "Otro" ? formData.incidentOther : formData.incidentType,
        createdAt: serverTimestamp(),
        status: "pending",
      });
      setFormData(initialForm);
      setErrors({});
      setIsSuccess(true);
      setStatusMessage("Tu denuncia fue enviada correctamente.");
    } catch (error) {
      setIsSuccess(false);
      setStatusMessage("Ocurrió un error al enviar la denuncia.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-5 px-3" style={{ background: "linear-gradient(180deg, #ff5f00 0%, #ff6a00 100%)", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11">
            <div className="overflow-hidden rounded-5 bg-white shadow-lg border-0">
              <div className="row g-0">
                
                {/* --- LADO IZQUIERDO: DISEÑO PREMIUM --- */}
                <div className="col-12 col-md-5 p-4 p-md-5 text-white" style={{ background: "linear-gradient(135deg, #2c3e50 0%, #1a2533 100%)" }}>
                  <p className="mb-2 text-uppercase fw-bold opacity-50" style={{ fontSize: "0.75rem", letterSpacing: "2px" }}>
                    CANAL SEGURO
                  </p>

                  <h2 className="display-4 fw-bold mb-4" style={{ fontFamily: "Arial Black, sans-serif", letterSpacing: "-2px" }}>
                    DENUNCIA
                  </h2>

                  <p className="mb-4 opacity-75" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
                    Puedes reportar una situación de forma anónima o identificada. Tu información será tratada con total confidencialidad.
                  </p>

                  {/* Lista con Iconos Verdes */}
                  <div className="mb-5 d-flex flex-column gap-3">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "26px", height: "26px", backgroundColor: "#8bc34a" }}>
                        <span className="fw-bold" style={{ fontSize: "14px", color: "white" }}>✓</span>
                      </div>
                      <span className="fw-bold h5 mb-0">Confidencialidad total</span>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "26px", height: "26px", backgroundColor: "#8bc34a" }}>
                        <span className="fw-bold" style={{ fontSize: "14px", color: "white" }}>✓</span>
                      </div>
                      <span className="fw-bold h5 mb-0">Seguimiento del caso</span>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "26px", height: "26px", backgroundColor: "#8bc34a" }}>
                        <span className="fw-bold" style={{ fontSize: "14px", color: "white" }}>✓</span>
                      </div>
                      <span className="fw-bold h5 mb-0">Apoyo institucional</span>
                    </div>
                  </div>

                  <div className="rounded-4 p-4 mt-4" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <p className="mb-0 small fw-bold italic text-center">
                      💡 También puedes denunciar si eres testigo de una situación.
                    </p>
                  </div>
                </div>

                {/* --- LADO DERECHO: FORMULARIO --- */}
                <div className="col-12 col-md-7 p-4 p-md-5">
                  <h3 className="fw-bold text-uppercase mb-2" style={{ color: "#4A4A4A" }}>
                    CUÉNTANOS LO OCURRIDO
                  </h3>
                  <p className="text-muted mb-4 small">Completa el formulario con la mayor claridad posible.</p>

                  {statusMessage && (
                    <div className={`alert ${isSuccess ? "alert-success" : "alert-danger"} rounded-4 mb-4`} role="alert">
                      {statusMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="mb-2 d-block fw-bold text-dark small italic">¿CÓMO DESEAS REPORTAR?</label>
                      <div className="row g-3">
                        {/* BOTÓN ANÓNIMO */}
                        <div className="col-sm-6">
                          <label className={`w-100 p-3 rounded-4 border transition-all text-center ${formData.reportMode === "anonymous" ? "border-dark bg-dark text-white shadow-sm" : "border-secondary"}`} style={{ cursor: "pointer" }}>
                            <input type="radio" name="reportMode" value="anonymous" checked={formData.reportMode === "anonymous"} onChange={handleChange} className="d-none" />
                            <span className="fw-bold d-block mb-1">🕶️ Anónimo</span>
                            <p className={`mb-0 x-small ${formData.reportMode === "anonymous" ? "text-white-50" : "text-muted"}`} style={{ fontSize: "0.72rem" }}>No se mostrarán tus datos.</p>
                          </label>
                        </div>
                        {/* BOTÓN IDENTIFICADO - NARANJA FUERTE */}
                        <div className="col-sm-6">
                          <label className={`w-100 p-3 rounded-4 border transition-all text-center ${formData.reportMode === "identified" ? "border-[#FF5A00] text-white shadow-sm" : "border-secondary"}`} 
                                 style={{ 
                                   cursor: "pointer", 
                                   backgroundColor: formData.reportMode === "identified" ? "#FF5A00" : "transparent" 
                                 }}>
                            <input type="radio" name="reportMode" value="identified" checked={formData.reportMode === "identified"} onChange={handleChange} className="d-none" />
                            <span className="fw-bold d-block mb-1">👤 Identificado</span>
                            <p className={`mb-0 x-small ${formData.reportMode === "identified" ? "text-white-90" : "text-muted"}`} style={{ fontSize: "0.72rem" }}>Para seguimiento directo.</p>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* RESTO DEL CONTENIDO DEL FORMULARIO INTACTO */}
                    <div className="mb-3">
                      <label className="form-label fw-bold small">REPORTO COMO</label>
                      <select name="reporterRole" value={formData.reporterRole} onChange={handleChange} className={`form-select rounded-3 py-2 ${errors.reporterRole ? "is-invalid" : ""}`}>
                        <option value="">Selecciona una opción</option>
                        <option value="Víctima">Víctima</option>
                        <option value="Testigo">Testigo</option>
                        <option value="No estoy segura/o">No estoy segura/o</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold small">TIENDA, ÁREA O LUGAR</label>
                      <input name="place" value={formData.place} onChange={handleChange} className={`form-control rounded-3 py-2 ${errors.place ? "is-invalid" : ""}`} placeholder="Ej. Cajas, almacén..." />
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold small">¿QUIÉN ESTUVO INVOLUCRADO?</label>
                      <select name="involvedPerson" value={formData.involvedPerson} onChange={handleChange} className={`form-select rounded-3 py-2 ${errors.involvedPerson ? "is-invalid" : ""}`}>
                        <option value="">Selecciona una opción</option>
                        <option value="Compañero/a">Compañero/a</option>
                        <option value="Jefe o líder">Jefe o líder</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Proveedor">Proveedor</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {formData.involvedPerson === "Otro" && (
                        <input name="involvedOther" value={formData.involvedOther} onChange={handleChange} className="form-control mt-2 rounded-3 py-2" placeholder="Especifica quién..." />
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label fw-bold small">TIPO DE SITUACIÓN</label>
                      <select name="incidentType" value={formData.incidentType} onChange={handleChange} className={`form-select rounded-3 py-2 ${errors.incidentType ? "is-invalid" : ""}`}>
                        <option value="">Selecciona una opción</option>
                        <option value="Comentario sexual o sexista">Comentario sexual o sexista</option>
                        <option value="Bromas incómodas o humillantes">Bromas incómodas o humillantes</option>
                        <option value="Mensajes insistentes">Mensajes insistentes</option>
                        <option value="Trato discriminatorio">Trato discriminatorio</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {formData.incidentType === "Otro" && (
                        <input name="incidentOther" value={formData.incidentOther} onChange={handleChange} className="form-control mt-2 rounded-3 py-2" placeholder="Especifica la situación..." />
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-bold small">DESCRIBE LO OCURRIDO</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className={`form-control rounded-3 ${errors.description ? "is-invalid" : ""}`} placeholder="Explica lo que pasó..."></textarea>
                    </div>

                    {formData.reportMode === "identified" && (
                      <div className="p-3 bg-light rounded-4 mb-4 border border-primary-subtle">
                        <p className="small fw-bold text-primary mb-3">DATOS DE CONTACTO</p>
                        <div className="row">
                          <div className="col-md-6 mb-2">
                            <label className="form-label small">Nombre</label>
                            <input name="name" value={formData.name} onChange={handleChange} className="form-control" />
                          </div>
                          <div className="col-md-6 mb-0">
                            <label className="form-label small">Email</label>
                            <input name="email" value={formData.email} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* BOTÓN ENVIAR - AZUL PROFESIONAL */}
                    <div className="text-center">
                      <button type="submit" disabled={isSubmitting} className="btn px-5 py-2 rounded-3 fw-bold text-white shadow-sm transition-all" 
                              style={{ backgroundColor: "#4a76c0", border: "none" }}>
                        {isSubmitting ? "Enviando..." : "Enviar denuncia"}
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}