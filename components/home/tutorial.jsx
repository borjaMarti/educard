import Image from "next/image";

const Tutorial = () => {
  return (
    <section className="tutorial">
      <h2 className="tutorial__title">¿Cómo utilizar EduCard?</h2>
      <div className="tutorial__block">
        <div className="tutorial__element">
          <Image
            src="/create.svg"
            alt="Imágen de los botones de creación de mazo, curso, y carta."
            height={0}
            width={0}
            className="tutorial__image"
          />
          <div className="tutorial__info">
            <h3 className="tutorial__header">Crea Cursos, Mazos, y Cartas</h3>
            <span className="tutorial__text"></span>
          </div>
        </div>
        <div className="tutorial__element tutorial__element--reverse">
          <Image
            src="/invite.svg"
            alt="Imágen del menú para invitar estudiantes."
            height={0}
            width={0}
            className="tutorial__image"
          />
          <div className="tutorial__info">
            <h3 className="tutorial__header">Invita Estudiantes</h3>
            <span className="tutorial__text"></span>
          </div>
        </div>
        <div className="tutorial__element">
          <Image
            src="/card.svg"
            alt='Imágen de la parte de atrás de una carta de EduCard que lee "EduCard: Aplicación web de Flashcards para profesores/as y sus alumnos/as", acompañada de dos botones, Repetir y Bien.'
            height={0}
            width={0}
            className="tutorial__image"
          />
          <div className="tutorial__info">
            <h3 className="tutorial__header">¡A Estudiar!</h3>
            <span className="tutorial__text"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tutorial;
