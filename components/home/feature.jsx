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
          <div className="feature__info">
            <h3 className="feature__header">Recuerdo Activo</h3>
            <span className="feature__text">
              Practica un estudio activo mediante el uso de flashcards,
              fortaleciendo tu memoria y entendimiento.
            </span>
          </div>
        </div>
        <div className="feature__element">
          <Image
            src="/calendar-time.svg"
            alt="Icono de un calendario con un reloj delante."
            height={0}
            width={0}
            className="feature__image"
          />
          <div className="feature__info">
            <h3 className="feature__header">Repaso Espaciado</h3>
            <span className="feature__text">
              Optimiza tu estudio gracias a un algoritmo basado en tu
              rendimiento, permitiéndote priorizar lo más importante.
            </span>
          </div>
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
