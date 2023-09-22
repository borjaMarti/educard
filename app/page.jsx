import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import Footer from "@/components/ui/footer-comp";

const HomePage = async () => {
  return (
    <>
      <main className="home-main">
        <section className="hero">
          <div className="hero__picture">
            <Image
              src="/hero.svg"
              alt="Image of a student sitting cross-legged in their room reading a book."
              height={0}
              width={0}
              className="hero__image"
            />
          </div>
          <div className="hero__words">
            <h1 className="hero__title">
              Potencia el aprendizaje
              <br />
              en el aula
              <br />
              <span className="hero__title--em">y más allá</span>
            </h1>
            <p className="hero__text">
              Proporciona a tus alumnas una manera efectiva y personalizada de
              estudiar, impulsando su retención y comprensión.
            </p>
            <div className="hero__button-container">
              <SignUpButton>
                <button className="hero__button">Regístrate</button>
              </SignUpButton>
            </div>
          </div>
        </section>
        <section className="feature">
          <h2 className="feature__title">Por qué EduCard funciona</h2>
          <div className="feature__block">
            <div className="feature__element">
              <Image
                src="/exam.svg"
                alt="Icon of a test next to a pencil."
                height={0}
                width={0}
                className="feature__image"
              />
              <h3 className="feature__header">Recuerdo Activo</h3>
              <span className="feature__text">
                Promueve un estudio activo, fortaleciendo la memoria e indicando
                qué áreas necesitan más atención.
              </span>
            </div>
            <div className="feature__element">
              <Image
                src="/calendar-time.svg"
                alt="Icon of a calendar with a clock in front of it."
                height={0}
                width={0}
                className="feature__image"
              />
              <h3 className="feature__header">Repaso Espaciado</h3>
              <span className="feature__text">
                Optimiza el estudio. Refuerza la memoria de manera gradual para
                un aprendizaje duradero.
              </span>
            </div>
          </div>
          <small className="feature__small">
            ¿Quieres saber más acerca del recuerdo activo y la repeteción
            espaciada y por qué son eficaces?
            <br /> ¡Visita{" "}
            <a href="https://ncase.me/remember/es.html" className="link">
              este cómic interactivo
            </a>
            !
          </small>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
