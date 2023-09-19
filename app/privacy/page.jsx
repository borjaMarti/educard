import Footer from "@/components/ui/footer-comp";

export default function PrivacyPage() {
  return (
    <>
      <main className="terms">
        <section className="terms__element">
          <h1 className="terms__title">Privacidad</h1>
          <p>
            El acceso a tu cuenta está mediado por{" "}
            <a href="https://clerk.com/" className="link">
              Clerk
            </a>
            , mediante el sistema de autenticación de Google.
          </p>
          <p>
            Nosotros solo disponemos y utilizamos de los siguientes datos
            básicos de tu perfil proporcionados por Google:
          </p>
          <ul>
            <li>- Tu correo electrónico</li>
            <li>- Tu nombre</li>
          </ul>
          <p>
            Estos datos son usados para facilitar la gestión de los cursos y
            poder añadir estudiantes a estos.
          </p>
          <p>
            Solo utilizamos las cookies necesarias para mantenerte identificada
            a tu cuenta y que puedas tener acceso a tu contenido personalizado.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
