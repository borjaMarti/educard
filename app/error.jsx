"use client";
import { FaArrowRotateRight } from "react-icons/fa6";
import Image from "next/image";

export default function Error({ error, reset }) {
  return (
    <main className="dashboard-main">
      <section className="section section--error">
        <h2 className="section__title">
          Ooops,
          <br />
          parece que algo está fallando.
        </h2>
        <Image
          src="/error.svg"
          alt="Gente analizando una alerta de error en una página web."
          height={0}
          width={0}
          style={{ width: "100%", height: "auto", maxWidth: "35rem" }}
        />
        <span>¿Volvemos a intentarlo?</span>
        <small>
          Si el error persiste, espera un par de minutos.
          <br />
          De continuar,{" "}
          <a href="mailto:borjamarti@outlook.com" className="link">
            contacta conmigo por favor.
          </a>
        </small>
        <button onClick={() => reset()} className="dialog__button">
          <FaArrowRotateRight /> Recargar Página
        </button>
      </section>
    </main>
  );
}
