import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";

const HomePage = async () => {
  return (
    <main className="home-main">
      <section className="hero">
        <Image
          src="/hero.svg"
          alt="Chica estudiando."
          height={0}
          width={0}
          style={{ width: "100%", height: "auto", maxWidth: "40rem" }}
        />
        <div className="hero__words">
          <h1 className="hero__title">
            Potencia el aprendizaje en el aula
            <br />
            <span className="hero__title--em">y más allá</span>
          </h1>
          <p className="hero__text">
            Proporciona a tus alumnas una manera efectiva y personalizada de
            estudiar, impulsando su retención y comprensión.
          </p>
          <SignUpButton>
            <button className="hero__button">Regístrate</button>
          </SignUpButton>
        </div>
      </section>
      <section className="feature">
        <h2 className="feature__title">
          Vence al olvido gracias a dos principios:
        </h2>
        <div className="feature__block">
          <div className="feature__element">
            <Image
              src="/exam.svg"
              alt="Dibujo de un test."
              height={0}
              width={0}
              style={{ width: "100%", height: "auto", maxWidth: "6rem" }}
            />
            <h3>Recuerdo Activo</h3>
            <span>
              Promueve un estudio activo, fortaleciendo la memoria e indicando
              qué áreas necesitan más atención.
            </span>
          </div>
          <div className="feature__element">
            <Image
              src="/calendar-time.svg"
              alt="Dibujo de un calendario."
              height={0}
              width={0}
              style={{ width: "100%", height: "auto", maxWidth: "6rem" }}
            />
            <h3>Repetición Espaciada</h3>
            <span>
              Optimiza el estudio. Refuerza la memoria de manera gradual para un
              aprendizaje duradero.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
