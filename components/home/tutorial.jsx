import Image from "next/image";

const Tutorial = () => {
  return (
    <section className="tutorial">
      <h2 className="tutorial__title">¿Cómo funciona EduCard?</h2>
      <p className="tutorial__text tutorial__text--intro">
        Descubre cómo transformar el proceso de estudio de tus estudiantes con
        EduCard en tres sencillos pasos.
      </p>
      <div className="tutorial__block">
        <section className="tutorial__element">
          <Image
            src="/create.svg"
            alt="Imágen de los botones de creación de mazo, curso, y carta."
            height={0}
            width={0}
            className="tutorial__image"
          />
          <div className="tutorial__info">
            <h3 className="tutorial__header">Crea Cursos, Mazos, y Cartas</h3>
            <p className="tutorial__text">
              Estructura tus flashcards en cursos y mazos, permitiendo la
              organización por asignaturas y unidades didácticas.
            </p>
            <p className="tutorial__text">
              Facilita el seguimiento y guía efectivamente el estudio a lo largo
              del curso.
            </p>
          </div>
        </section>
        <section className="tutorial__element tutorial__element--reverse">
          <Image
            src="/invite.svg"
            alt="Imágen del menú para invitar estudiantes."
            height={0}
            width={0}
            className="tutorial__image"
          />
          <div className="tutorial__info">
            <h3 className="tutorial__header">Invita a tus Estudiantes</h3>
            <p className="tutorial__text">
              Una vez hayas diseñado tu curso, invita a tus estudiantes &#40;¡o
              a ti mismo!&#41; para que accedan fácilmente a las flashcards que
              has creado.
            </p>
            <p className="tutorial__text">
              Simplifica el proceso de aprendizaje colaborativo.
            </p>
          </div>
        </section>
        <section className="tutorial__element">
          <Image
            src="/card.svg"
            alt='Imágen de la parte de atrás de una carta de EduCard que lee "EduCard: Aplicación web de Flashcards para profesores/as y sus alumnos/as", acompañada de dos botones, Repetir y Bien.'
            height={0}
            width={0}
            className="tutorial__image tutorial__image--extra"
          />
          <div className="tutorial__info">
            <h3 className="tutorial__header">¡A Estudiar!</h3>
            <p className="tutorial__text">
              EduCard se encarga de planificar el momento adecuado para repasar
              cada carta, basándose en el rendimiento previo del estudiante.
            </p>
            <p className="tutorial__text">
              Asegura un aprendizaje eficiente y personalizado.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Tutorial;
