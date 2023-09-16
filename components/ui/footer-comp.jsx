"use-client";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer__separator"></div>
      <nav className="site-footer__nav">
        <ul className="site-footer__list">
          <div>
            <li>
              <a href="#head" className="site-footer__link">
                Volver arriba
              </a>
            </li>
            <li>
              <Link href="/privacy" className="site-footer__link">
                Privacidad
              </Link>
            </li>
            <li>
              <Link href="/tos" className="site-footer__link">
                Condiciones
              </Link>
            </li>
          </div>
          <div>
            <li>
              made with ❤️ by{" "}
              <a
                href="https://borjamarti.netlify.app/"
                className="link link--footer"
              >
                borjaMartí
              </a>
            </li>
          </div>
          <div>
            <li>
              <a
                href="https://github.com/borjaMarti/educard"
                className="site-footer__link site-footer__icon"
              >
                <FaGithub />
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
