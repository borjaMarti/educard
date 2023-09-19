import Footer from "@/components/ui/footer-comp";

export default function PrivacyPage() {
  return (
    <>
      <main className="terms">
        <section className="terms__element">
          <h1 className="terms__title">Condiciones de Uso</h1>
          <p>Copyright 2023 Borja Martí Calvo</p>
          <p>
            Por la presente se concede permiso, libre de cargos, a cualquier
            persona que obtenga una copia de este software y de los archivos de
            documentación asociados &#40;el "Software"&#41;, a utilizar el
            Software sin restricción, incluyendo sin limitación los derechos a
            usar, copiar, modificar, fusionar, publicar, distribuir,
            sublicenciar, y/o vender copias del Software, y a permitir a las
            personas a las que se les proporcione el Software a hacer lo mismo,
            sujeto a las siguientes condiciones:
          </p>
          <p>
            El aviso de copyright anterior y este aviso de permiso se incluirán
            en todas las copias o partes sustanciales del Software.
          </p>
          <p>
            EL SOFTWARE SE PROPORCIONA "COMO ESTÁ", SIN GARANTÍA DE NINGÚN TIPO,
            EXPRESA O IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A GARANTÍAS DE
            COMERCIALIZACIÓN, IDONEIDAD PARA UN PROPÓSITO PARTICULAR E
            INCUMPLIMIENTO. EN NINGÚN CASO LOS AUTORES O PROPIETARIOS DE LOS
            DERECHOS DE AUTOR SERÁN RESPONSABLES DE NINGUNA RECLAMACIÓN, DAÑOS U
            OTRAS RESPONSABILIDADES, YA SEA EN UNA ACCIÓN DE CONTRATO, AGRAVIO O
            CUALQUIER OTRO MOTIVO, DERIVADAS DE, FUERA DE O EN CONEXIÓN CON EL
            SOFTWARE O SU USO U OTRO TIPO DE ACCIONES EN EL SOFTWARE.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
