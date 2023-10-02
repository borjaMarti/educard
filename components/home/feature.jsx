import Image from "next/image";

const Feature = () => {
  return (
    <section className="feature">
      <h2 className="feature__title">Por qué EduCard funciona</h2>
      <div className="feature__block">
        <div className="feature__element">
          <Image
            src="/exam.svg"
            alt="Icono de un test al lado de un lápiz."
            height={0}
            width={0}
            className="feature__image"
          />
          <h3 className="feature__header">Recuerdo Activo</h3>
          <span className="feature__text">
            Promueve un estudio activo, fortaleciendo la memoria e indicando qué
            áreas necesitan más atención.
          </span>
        </div>
        <div className="feature__element">
          <Image
            src="/calendar-time.svg"
            alt="Icono de un calendario con un reloj delante."
            height={0}
            width={0}
            className="feature__image"
          />
          <h3 className="feature__header">Repaso Espaciado</h3>
          <span className="feature__text">
            Optimiza el estudio. Refuerza la memoria de manera gradual para un
            aprendizaje duradero.
          </span>
        </div>
      </div>
      <small className="feature__small">
        ¿Quieres saber más acerca del recuerdo activo y la repeteción espaciada
        y por qué son eficaces?
        <br /> ¡Visita{" "}
        <a href="https://ncase.me/remember/es.html" className="link">
          este cómic interactivo
        </a>
        !
      </small>
    </section>
  );
};

export default Feature;
