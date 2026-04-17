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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.reporterRole.trim()) {
      newErrors.reporterRole = "Selecciona una opción.";
    }

    if (!formData.place.trim()) {
      newErrors.place = "Este campo es obligatorio.";
    }

    if (!formData.involvedPerson.trim()) {
      newErrors.involvedPerson = "Selecciona una opción.";
    }

    if (formData.involvedPerson === "Otro" && !formData.involvedOther.trim()) {
      newErrors.involvedOther = "Especifica quién estuvo involucrado.";
    }

    if (!formData.incidentType.trim()) {
      newErrors.incidentType = "Selecciona una opción.";
    }

    if (formData.incidentType === "Otro" && !formData.incidentOther.trim()) {
      newErrors.incidentOther = "Especifica el tipo de situación.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Describe lo ocurrido.";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Escribe al menos 20 caracteres.";
    }

    if (formData.reportMode === "identified") {
      if (!formData.name.trim()) {
        newErrors.name = "Ingresa tu nombre.";
      }

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
    setStatusMessage("");

    if (Object.keys(validationErrors).length > 0) {
      setIsSuccess(false);
      setStatusMessage("Por favor, corrige los campos marcados.");
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "reports"), {
        reportMode: formData.reportMode,
        reporterRole: formData.reporterRole,
        place: formData.place,
        involvedPerson:
          formData.involvedPerson === "Otro"
            ? formData.involvedOther
            : formData.involvedPerson,
        incidentType:
          formData.incidentType === "Otro"
            ? formData.incidentOther
            : formData.incidentType,
        description: formData.description,
        name: formData.reportMode === "identified" ? formData.name : "",
        email: formData.reportMode === "identified" ? formData.email : "",
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
    <section
      className="py-5 px-3 px-md-4 font-body"
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
      <div className="container-fluid container-md">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="overflow-hidden rounded-4 bg-white shadow-lg">
              <div className="row g-0">
                <div className="col-12 col-md-5 bg-[#6F2DBD] p-3 p-md-5 text-white">
                  <p className="mb-2 text-sm uppercase tracking-wide text-[#9FE3DB]">
                    Canal seguro
                  </p>

                  <h2 className="font-heading text-4xl uppercase leading-none text-white">
                    Denuncia
                  </h2>

                  <p className="mt-3 mb-0 text-sm leading-6 text-white/90">
                    Puedes reportar una situación de forma anónima o
                    identificada. Tu información será tratada con
                    confidencialidad.
                  </p>

                  <div className="mt-4 rounded-4 bg-[#C9B7F5] p-3 text-[#221F35]">
                    <p className="mb-0 text-sm font-medium">
                      También puedes denunciar si eres testigo de una situación.
                    </p>
                  </div>
                </div>

                <div className="col-12 col-md-7 p-3 p-md-5">
                  <h3 className="font-heading text-3xl uppercase leading-none text-[#6F2DBD]">
                    Cuéntanos lo ocurrido
                  </h3>

                  <p className="mt-3 text-sm text-[#4B4B5A]">
                    Completa el formulario con la mayor claridad posible.
                  </p>

                  {statusMessage && (
                    <div
                      className={`mt-3 rounded-4 px-3 py-2 text-sm ${
                        isSuccess
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {statusMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-3">
                      <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                        ¿Cómo deseas reportar?
                      </label>

                      <div className="d-flex flex-column flex-sm-row gap-3">
                        <label
                          className={`flex-fill rounded-4 border p-3 transition-all duration-300 ${
                            formData.reportMode === "anonymous"
                              ? "border-[#FF6A13] bg-[#FFF1E8] shadow-sm"
                              : "border-[#D9D9E3] bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="reportMode"
                            value="anonymous"
                            checked={formData.reportMode === "anonymous"}
                            onChange={handleChange}
                            className="me-2"
                          />
                          <span className="fw-semibold text-[#221F35]">
                            Anónimo
                          </span>
                          <p className="mb-0 mt-2 text-sm text-[#5B566E]">
                            No se mostrarán tus datos personales.
                          </p>
                        </label>

                        <label
                          className={`flex-fill rounded-4 border p-3 transition-all duration-300 ${
                            formData.reportMode === "identified"
                              ? "border-[#6F2DBD] bg-[#F3ECFF] shadow-sm"
                              : "border-[#D9D9E3] bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="reportMode"
                            value="identified"
                            checked={formData.reportMode === "identified"}
                            onChange={handleChange}
                            className="me-2"
                          />
                          <span className="fw-semibold text-[#221F35]">
                            Identificado
                          </span>
                          <p className="mb-0 mt-2 text-sm text-[#5B566E]">
                            Podrán contactarte para seguimiento del caso.
                          </p>
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                        Reporto como
                      </label>
                      <select
                        name="reporterRole"
                        value={formData.reporterRole}
                        onChange={handleChange}
                        className="form-select rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#6F2DBD]"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Víctima">Víctima</option>
                        <option value="Testigo">Testigo</option>
                        <option value="No estoy segura/o">
                          No estoy segura/o
                        </option>
                      </select>
                      {errors.reporterRole && (
                        <p className="mt-1 mb-0 text-sm text-danger">
                          {errors.reporterRole}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                        Tienda, área o lugar
                      </label>
                      <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        placeholder="Ej. Cajas, almacén, tienda Ate"
                        className="form-control rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#FF6A13]"
                      />
                      {errors.place && (
                        <p className="mt-1 mb-0 text-sm text-danger">
                          {errors.place}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                        ¿Quién estuvo involucrado?
                      </label>
                      <select
                        name="involvedPerson"
                        value={formData.involvedPerson}
                        onChange={handleChange}
                        className="form-select rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#6F2DBD]"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Compañero/a">Compañero/a</option>
                        <option value="Jefe o líder">Jefe o líder</option>
                        <option value="Cliente">Cliente</option>
                        <option value="Proveedor">Proveedor</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {errors.involvedPerson && (
                        <p className="mt-1 mb-0 text-sm text-danger">
                          {errors.involvedPerson}
                        </p>
                      )}

                      {formData.involvedPerson === "Otro" && (
                        <>
                          <input
                            type="text"
                            name="involvedOther"
                            value={formData.involvedOther}
                            onChange={handleChange}
                            placeholder="Especifica quién estuvo involucrado"
                            className="form-control mt-2 rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#6F2DBD]"
                          />
                          {errors.involvedOther && (
                            <p className="mt-1 mb-0 text-sm text-danger">
                              {errors.involvedOther}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                        Tipo de situación
                      </label>
                      <select
                        name="incidentType"
                        value={formData.incidentType}
                        onChange={handleChange}
                        className="form-select rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#FF6A13]"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Comentario sexual o sexista">
                          Comentario sexual o sexista
                        </option>
                        <option value="Bromas incómodas o humillantes">
                          Bromas incómodas o humillantes
                        </option>
                        <option value="Mensajes insistentes">
                          Mensajes insistentes
                        </option>
                        <option value="Comentarios sobre apariencia">
                          Comentarios sobre apariencia
                        </option>
                        <option value="Trato discriminatorio">
                          Trato discriminatorio
                        </option>
                        <option value="Otro">Otro</option>
                      </select>
                      {errors.incidentType && (
                        <p className="mt-1 mb-0 text-sm text-danger">
                          {errors.incidentType}
                        </p>
                      )}

                      {formData.incidentType === "Otro" && (
                        <>
                          <input
                            type="text"
                            name="incidentOther"
                            value={formData.incidentOther}
                            onChange={handleChange}
                            placeholder="Especifica el tipo de situación"
                            className="form-control mt-2 rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#FF6A13]"
                          />
                          {errors.incidentOther && (
                            <p className="mt-1 mb-0 text-sm text-danger">
                              {errors.incidentOther}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                        Describe lo ocurrido
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Explica lo que pasó con claridad"
                        className="form-control rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#6F2DBD]"
                      />
                      {errors.description && (
                        <p className="mt-1 mb-0 text-sm text-danger">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {formData.reportMode === "identified" && (
                      <div className="mb-3 rounded-4 bg-[#F3ECFF] p-3">
                        <p className="mb-3 text-sm fw-semibold text-[#6F2DBD]">
                          Datos de contacto
                        </p>

                        <div className="mb-3">
                          <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                            Nombre
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ingresa tu nombre"
                            className="form-control rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#6F2DBD]"
                          />
                          {errors.name && (
                            <p className="mt-1 mb-0 text-sm text-danger">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="mb-0">
                          <label className="mb-2 block text-sm fw-semibold text-[#221F35]">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="correo@ejemplo.com"
                            className="form-control rounded-4 border-[#D9D9E3] py-3 shadow-none focus:border-[#FF6A13]"
                          />
                          {errors.email && (
                            <p className="mt-1 mb-0 text-sm text-danger">
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 w-100 rounded-4 border-0 bg-[#FF6A13] px-4 py-3 text-sm fw-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#E85A0C]"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar denuncia"}
                    </button>
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
