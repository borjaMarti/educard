"use client";
import Image from "next/image";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <main className="dashboard-main">
      <section className="section section--error">
        <h2 className="section__title">
          Ooops,
          <br />
          parece que esta página no existe.
        </h2>
        <Image
          src="/error.svg"
          alt="Gente analizando una alerta de error en una página web."
          height={0}
          width={0}
          style={{ width: "100%", height: "auto", maxWidth: "35rem" }}
        />
        <span>¿Volvemos a EduCard?</span>
        <Link href={"/"}>
          <button className="dialog__button">Volver a Educard</button>
        </Link>
      </section>
    </main>
  );
}
