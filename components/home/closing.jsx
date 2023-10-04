import { SignUpButton } from "@clerk/nextjs";

const Closing = () => {
  return (
    <section className="closing">
      <h2 className="closing__title">
        Únete y fortalece los hábitos de estudio de tu alumnado
      </h2>
      <SignUpButton>
        <button className="hero__button">Regístrate</button>
      </SignUpButton>
      <small className="closing__small">
        ¿Quieres saber más acerca del recuerdo activo y el repaso espaciado y
        por qué son efectivos?
      </small>
      <small className="closing__small closing__small--link">
        ¡Visita{" "}
        <a href="https://ncase.me/remember/es.html" className="link">
          este cómic interactivo
        </a>
        !
      </small>
    </section>
  );
};

export default Closing;
