import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";

const Hero = () => {
  return (
    <main className="hero">
      <div className="hero__picture">
        <Image
          src="/hero.svg"
          alt="Imagen de una estudiante sentada en su habitación leyendo un libro."
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
    </main>
  );
};

export default Hero;
