import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__separator"></div>
      <nav className="site-footer__nav">
        <ul className="site-footer__list">
          <li>
            <ul>
              <li>
                <Link href="/tos" className="site-footer__link">
                  Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="site-footer__link">
                  Privacidad
                </Link>
              </li>
            </ul>
          </li>
          <li className="site-footer__madeby">
            hecho con ❤️ por{" "}
            <a
              href="https://borjamarti.dev/"
              className="link link--footer"
              title="Borja Martí Personal Website"
            >
              borjaMartí
            </a>
          </li>
          <li>
            <a
              href="https://github.com/borjaMarti/educard"
              className="site-footer__link site-footer__icon"
              title="EduCard's GitHub Repository"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
